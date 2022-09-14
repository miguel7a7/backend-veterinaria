const { response } = require('express')
const EventoCalendario = require('../models/EventoCalendario')
/*========================================================================
                 Funcion para obtener eventos 
========================================================================*/
const getEventos = async (req, res = response) => {
  /*=== populate('user', 'name') indica solo mostrar el name del user ===*/
  const eventos = await EventoCalendario.find().populate('user', 'name')

  res.json({
    ok: true,
    msg: 'Peticios exitosa',
    eventos,
  })
}

/*========================================================================
                 Funcion para crear eventos 
========================================================================*/
const crearEventos = async (req, res = response) => {
  const evento = new EventoCalendario(req.body)

  try {
    /*=== Asignacion del usuario con el id que se envia en el token ===*/
    evento.user = req.uid

    /*=== Inicio de: Guardado del evento ===*/
    const eventoGuardado = await evento.save()

    res.status(200).json({
      ok: true,
      msg: 'Evento guardado correctamente',
      evento: eventoGuardado,
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      ok: false,
      msg: 'Hable con el Administrador',
    })
  }
}

/*========================================================================
                 Funcion para actualizar eventos 
========================================================================*/
const actualizarEvento = async (req, res = response) => {
  const eventoId = req.params.id
  const uid = req.uid

  try {
    const evento = await EventoCalendario.findById(eventoId)

    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: 'Evento no existe por el ID',
      })
    }

    /*=== Inicio de: Verificacion si el evento fue creado por la misma persona ===*/
    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: 'Usuario no autorizado para Editar',
      })
    }

    const nuevoEvento = {
      ...req.body,
      user: uid,
    }

    const eventoActualizado = await EventoCalendario.findByIdAndUpdate(
      eventoId,
      nuevoEvento,
      { new: true } // retorna los datos actualizados
    )

    res.status(200).json({
      ok: true,
      msg: 'Evento actualizado',
      evento: eventoActualizado,
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      ok: false,
      msg: 'Contactese con el Administrador',
    })
  }
}

/*========================================================================
                 Funcion para obtener eventos 
========================================================================*/
const eliminarEventos = async (req, res = response) => {
  const eventoId = req.params.id
  const uid = req.uid

  try {
    const evento = await EventoCalendario.findById(eventoId)

    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: 'Evento no existe por el ID',
      })
    }

    /*=== Inicio de: Verificacion si el evento fue creado por la misma persona ===*/
    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: 'Usuario no autorizado para Eliminar',
      })
    }

    await EventoCalendario.findByIdAndDelete(eventoId)

    res.status(200).json({
      ok: true,
      msg: 'Evento Eliminado',
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      ok: false,
      msg: 'Contactese con el Administrador',
    })
  }
}

module.exports = {
  getEventos,
  crearEventos,
  actualizarEvento,
  eliminarEventos,
}
