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

    if (req.method === "POST") {
        tiny = tiny.concat(JSON.stringify(req.body))
    }

    return tiny.join(' ')
}))

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
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
    const body = request.body
    //console.log("body received", body)

    if (!body.number || !body.name) {
        return response.status(400).json({
            error: 'number or name missing'
        })
    }

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
  }

  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})