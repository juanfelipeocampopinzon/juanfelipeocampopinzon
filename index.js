// const http = require("http"),// common.js
//nmy scrypt modules ('import http from "http"')
// const { response } = require("express")
const express = require("express")
const app = express()
app.use(express.json())

let notes =  [ 
  {
    "id": 1,
    "date": "2001",
    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    "body":  true
  },
  {
    "id": 2,
    "date": "2002 ",
    "title": "qui est esse",
    "body":  false
  },
  {
    "id": 3,
    "date": "2003",
    "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
    "body":  false
  },
]

//const app = http.createServer((request, response) => {
//  response.writeHead(200, { "Content-Type": "application/json" })
//  response.end(JSON.stringify(notes))
//})

app.get("/",(request, response) => {
    response.send("<h1>hola mundo</h1>")
})

app.get("/api/notes",(request, response) => {
    response.json(notes)
})

app.get("/api/notes/:id",(request, response) => {
    const id = Number(request.params.id)
    console.log({id})
    const note = notes.find(note =>note.id === id)

    if (note) {
        response.json(note)
    }   else  {
        response.status(404).end()
    }
    response.json(note)
})

app.delete("/api/notes/:id",(request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id != id)  //esto esta mal debo mirar como hago el simbolo de diferente
    response.status(204).end()
})

app.post("/api/notes/",(request, response) => {
  const note = request.body

  if (!note || !note.content) {
    return response.status(400).json({
      error: 'note.content falta'
    })
  }

  const ids = notes.map(note => note.id)
  const maxid = Math.max (...ids)

  const newNote = {
    id: maxid + 1,
    content: note.content,
    body: typeof note.body != 'undefined' ? note.body : false,
    date: new Date().toISOString()
  }
  notes = notes.concat(newNote)

  response.status(201).json(newNote)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log("server corriendo ${PORT}" )
})
//)
//console.log('server running on port ${Port}')