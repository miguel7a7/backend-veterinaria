const { Schema, model } = require('mongoose')

const EventoCalendarioSchema = Schema({
  title: {
    type: String,
    required: true,
  },

  notes: {
    type: String,
  },

  start: {
    type: Date,
    required: true,
  },

  end: {
    type: Date,
    required: true,
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true,
  },

  fecha_reg: { type: Date, default: Date.now },
})

EventoCalendarioSchema.method('toJSON', function () {
  // eslint-disable-next-line no-unused-vars
  const { __v, _id, ...object } = this.toObject()
  object.id = _id
  return object
})

module.exports = model('EventoCalendario', EventoCalendarioSchema)
