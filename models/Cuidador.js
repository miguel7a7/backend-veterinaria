const { Schema, model } = require('mongoose')

const CuidadorSchema = Schema({
  nombres: {
    type: String,
    required: true,
  },

  apellidos: {
    type: String,
    required: true,
  },

  cedula: {
    type: String,
    required: true,
  },

  telefono: {
    type: String,
    required: true,
  },

  direccion: {
    type: String,
    required: true,
  },

  tipo_cuidador: {
    type: String,
    required: true,
  },

  fecha_reg: { type: Date, default: Date.now },
})

module.exports = model('Cuidador', CuidadorSchema)
