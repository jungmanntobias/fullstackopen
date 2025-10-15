const express = require('express')
const app = express()

app.use(express.json())

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/info', (request, response) => {
    const totalPersons = persons.length
    const currentTime = new Date()
    const html = `
        <p>Phonebook has info for ${totalPersons} people</p>
        <p>${currentTime}</p>
    `
    response.send(html)
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const person = persons.find(p => p.id === request.params.id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    persons = persons.filter(p => p.id !== request.params.id)
    response.status(204).end()
})

const randomId = () => {
    const ids = persons.map(p => Number(p.id))
    let found = false
    let proposal = 0

    while (!found) {
        proposal = Math.floor(Math.random() * 1000)
        //console.log(proposal)
        if (!ids.includes(proposal)) {
            found = true
        }
        //console.log(found)
    }
    return String(proposal)
}

app.post('/api/persons', (request, response) => {
    const body = request.body
    //console.log("body received", body)

    if (!body.number || !body.name) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    //console.log("inserting new person")
    const person = {
        id: randomId(),
        name: body.name,
        number: body.number
    }
    
    persons = persons.concat(person)

    response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})