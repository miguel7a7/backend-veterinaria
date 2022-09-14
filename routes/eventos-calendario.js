/* eslint-disable comma-dangle */
/**
 * Rutas de usuario /Eventos-calendario
 * host + /api/events
 */
const { Router } = require('express')
const { validarJWT } = require('../middlewares/validar-jwt')
const {
  getEventos,
  crearEventos,
  actualizarEvento,
  eliminarEventos,
} = require('../controllers/eventos-calendario')
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')
const { isDate } = require('../helpers/isDate')

const router = Router()

/*=== Todas las funciones tienen que pasar por la validacion 
=> se remplaza en vez de  router.get('/',validarJWT ,getEventos)===*/
router.use(validarJWT)

/*========================================================================
                 Ruta para obtener Eventos
========================================================================*/
// Rutas especificas [] para cuando hay mas middlewares
router.get('/', getEventos)

/*========================================================================
                 Ruta para crear Nuevo Eventos
========================================================================*/
router.post(
  '/',
  [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio es obligatorio').custom(isDate),
    check('end', 'Fecha de finalización es obligatorio').custom(isDate),
    validarCampos,
  ],
  crearEventos
)

/*========================================================================
                 Ruta para actualizar Eventos
========================================================================*/
router.put(
  '/:id',
  [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio es obligatorio').custom(isDate),
    check('end', 'Fecha de finalización es obligatorio').custom(isDate),
    validarCampos,
  ],
  actualizarEvento
)

/*========================================================================
                 Ruta para eliminar Eventos
========================================================================*/
router.delete('/:id', eliminarEventos)

module.exports = router
