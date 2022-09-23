const { Schema, model } = require('mongoose')

const ServicioSchema = Schema({
  fecha_servicio: {
    type: Date,
    required: true,
  },

  atencion: {
    type: String,
    required: false,
  },

  observacion: {
    type: String,
    required: false,
  },

  costo: {
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
    ref: 'Cuidador',
    required: true,
  },

  fecha_reg: { type: Date, default: Date.now },
})

module.exports = model('Servicio', ServicioSchema)
