const { Schema, model } = require('mongoose')

const DesparacitacionSchema = Schema({
  fecha_desparacitacion: {
    type: Date,
    required: true,
  },

  peso: {
    type: String,
    required: false,
  },

  producto: {
    type: String,
    required: false,
  },

  dosis: {
    type: String,
    required: false,
  },

  proxima_fecha_dosis: {
    type: Date,
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

module.exports = model('Desparacitacion', DesparacitacionSchema)
