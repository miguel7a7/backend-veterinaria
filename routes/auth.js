/* eslint-disable comma-dangle */
/**
 * Rutas de usuario /Auth
 * host + /api/auth
 */
const { Router } = require('express')
const router = Router()
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt')
const {
  crearUsuario,
  loginUsuario,
  reavalidarToken,
} = require('../controllers/auth')

/*========================================================================
                 Ruta para crear Usuario
========================================================================*/
// Rutas especificas [] para cuando hay mas middlewares
router.post(
  '/new',
  [
    check('nombres', 'El nombre es obligatorio').not().isEmpty(),
    check('apellidos', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check(
      'password',
      'El password es oblitario y debe de ser de 6 caracteres'
    ).isLength({ min: 6 }),
    validarCampos,
  ],
  crearUsuario
)

/*========================================================================
                 Ruta para loguear a Usuario
========================================================================*/
router.post(
  '/',
  [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password  debe de ser de 6 caracteres').isLength({
      min: 6,
    }),
    validarCampos,
  ],
  loginUsuario
)

/*========================================================================
                 Funcion para revalidar token de Usuario
========================================================================*/
router.get('/renew', [validarJWT], reavalidarToken)

/*========================================================================
                 Esportacion de ruta
========================================================================*/
module.exports = router
