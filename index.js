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

/*=== Inicio de: Rutas Auth ===*/
app.use('/api/auth', require('./routes/auth'))

/*=== Inicio de: Rutas Evento ===*/
app.use('/api/events', require('./routes/eventos-calendario'))

app.listen(port, () =>
  console.log(`El servidor se esta ejecutando en el Puerto: ${port}!`)
)
