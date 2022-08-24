const express = require('express')
const { dbConnection } = require('./db/config')
const cors = require('cors')
require('dotenv').config()

// Crear ek servidor de express
const app = express()

// Base de datos
dbConnection()

// CORS
app.use(cors())

// Puerto de backend
const port = process.env.PORT

// Directorio Publico
app.use(express.static('public'))

// Lectura y parse de body
app.use(express.json())

// Rutas
app.use('/api/auth', require('./routes/auth'))
// TODO: aith // crear, login, renew
// TODO: CRUD: eventos

app.listen(port, () =>
  console.log(`El servidor se esta ejecutando en el Puerto: ${port}!`)
)
