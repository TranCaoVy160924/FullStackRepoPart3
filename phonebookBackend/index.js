const { request } = require('express')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(express.static('build'))
app.use(cors())

morgan.token('bodyData', (req, res) => (
    JSON.stringify(req.body)
))

const logger = morgan(function (tokens, req, res) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        tokens.bodyData(req, res)
    ].join(' ')
})
app.use(logger)

let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(per => per.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.get('/info', (request, response) => {
    response.send(`Phonebook has info for ${persons.length} people </br> `
        + `${Date().toLocaleString()}`)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)

    console.log("deleting")
    persons = persons.filter(per => per.id !== id)
    console.log("remain: \n", persons)
    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: "No content"
        })
    }

    if (persons.find(per => per.name === body.name)) {
        return response.status(400).json({
            error: "Name already exist"
        })
    }

    newPer = {
        id: generateId(),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(newPer)
    response.json(newPer)
})

const generateId = () => {
    let newId = 0
    let existed = persons
        .find(per => per.id === newId)

    while (existed) {
        newId = Math.floor(Math.random() * 100000000)
        console.log("generating id: ", newId)
        existed = persons
            .find(per => per.id === newId)
    }
    console.log("result id: ", newId)
    return newId
}

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})