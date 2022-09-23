const { Schema, model } = require('mongoose')

const VacunaSchema = Schema({
  fecha_vacuna: {
    type: Date,
    required: true,
  },

  temperatura: {
    type: String,
    required: false,
  },

  peso: {
    type: String,
    required: false,
  },

  tipo_vacuna: {
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

module.exports = model('Vacuna', VacunaSchema)
