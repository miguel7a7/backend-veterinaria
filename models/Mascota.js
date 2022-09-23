const { Schema, model } = require('mongoose')

const MascotaSchema = Schema({
  nombre: {
    type: String,
    required: true,
  },

  raza: {
    type: String,
    required: true,
  },

  color: {
    type: String,
    required: true,
  },

  pelaje: {
    type: String,
    required: false,
  },

  edad: {
    type: String,
    required: false,
  },

  tamaño: {
    type: String,
    required: false,
  },

  especie: {
    type: String,
    required: false,
  },

  sexo: {
    type: String,
    required: true,
  },

  conducta: {
    type: String,
    required: false,
  },

  chip: {
    type: String,
    required: false,
  },

  foto: {
    type: String,
    required: true,
  },

  propietario: {
    type: Schema.Types.ObjectId,
    ref: 'Propietario',
    required: true,
  },
})

module.exports = model('Mascota', MascotaSchema)
