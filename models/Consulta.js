const { Schema, model } = require('mongoose')

const ConsultaSchema = Schema({
  fecha_consulta: {
    type: Date,
    required: true,
  },

  temperatura: {
    type: String,
    required: false,
  },

  frecuencia_cardiaca: {
    type: String,
    required: false,
  },

  frecuencia_respiratoria: {
    type: String,
    required: false,
  },

  mucosa: {
    type: String,
    required: false,
  },

  peso: {
    type: String,
    required: false,
  },

  motivo: {
    type: String,
    required: false,
  },

  mascota: {
    type: Schema.Types.ObjectId,
    ref: 'Mascota',
    required: true,
  },

  veterinario: {
    type: Schema.Types.ObjectId,
    ref: 'Veterinario',
    required: true,
  },

  fecha_reg: { type: Date, default: Date.now },
})

module.exports = model('Consulta', ConsultaSchema)
