// const http = require("http"),// common.js
// nmy scrypt modules ('import http from "http"')
// const { response } = require("express")
/// const { response } = require('express')
const express = require('express')
const cors = require('cors')

const app = express()
const logger = require('./loggerMiddleware')

app.use(cors())
app.use(express.json())

app.use(logger)

let notes = [
  {
    id: 1,
    usuario: 'pepito',
    date: '2001',
    body: true
  },
  {
    id: 2,
    usuario: 'manuel',
    date: '2002 ',
    body: false
  },
  {
    id: 3,
    usuario: 'maicol',
    date: '2003',
    body: false
  }
]
//  const app = http.createServer((request, response) => {
//    response.writeHead(200, { "title-Type": "application/json" })
//    response.end(JSON.stringify(notes))
//  })

app.get('/', (request, response) => {
  response.send('<h1>hola mundo</h1>')
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  console.log({ id })
  const note = notes.find(note => note.id === id)

  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
  response.json(note)
})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)
  response.status(204).end()
})

app.post('/api/notes/', (request, response) => {
  const note = request.body

  if (!note || !note.usuario) {
    return response.status(400).json({
      error: 'note.user falta'
    })
  }

  const ids = notes.map(note => note.id)
  const maxid = Math.max(...ids)

  const newNote = {
    id: maxid + 1,
    usuario: note.usuario,
    body: typeof note.body !== 'undefined' ? note.body : false,
    date: new Date().toISOString()
  }
  notes = notes.concat(newNote)

  response.status(201).json(newNote)
})

app.use((request, response) => {
  response.status(404).json({
    error: 'No encontrado'
  })
})

const PORT = process.env.PORT || 3001 // const PORT = 3001
app.listen(PORT, () => {
  console.log('server corriendo en puerto')
})
//  )
//  console.log('server running on port ${Port}')
