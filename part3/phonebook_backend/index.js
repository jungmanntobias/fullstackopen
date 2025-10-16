require('dotenv').config()
const express = require('express')
var morgan = require('morgan')
const Person = require('./models/person')
const app = express()

app.use(express.json())
app.use(express.static('dist'))

app.use(morgan(function (tokens, req, res) {
  let tiny =  [
    tokens.method(req,res),
    tokens.url(req,res),
    tokens.status(req,res),
    tokens.res(req,res, 'content-length'),
    '-',
    tokens['response-time'](req,res)
  ]

  if (req.method === 'POST') {
    tiny = tiny.concat(JSON.stringify(req.body))
  }

  return tiny.join(' ')
}))

// Retrieving info
app.get('/info', (request, response, next) => {
  Person.find({})
    .then(persons => {
      const totalPersons = persons.length
      const currentTime = new Date()
      const html = `
            <p>Phonebook has info for ${totalPersons} people</p>
            <p>${currentTime}</p>
        `
      response.send(html)
    })
    .catch(error => next(error))

})

app.get('/api/persons', (request, response, next) => {
  Person.find({})
    .then(persons => {
      response.json(persons)
    })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body
  //console.log("body received", body)

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save()
    .then(savedPerson => {
      response.json(savedPerson)
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body
  const id = request.params.id

  Person.findByIdAndUpdate(
    id,
    { name, number },
    { new:true, runValidators:true, context:'query' }
  ).then(updatedPerson => {
    if (!updatedPerson) {
      return response.status(404).end()
    } else {
      response.json(updatedPerson)
    }})
    .catch(error => next(error))

})

// Unknown endpoint handler
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

// Error handling
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  }

  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})