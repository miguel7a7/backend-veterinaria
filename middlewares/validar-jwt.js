const { response } = require('express')
const jwt = require('jsonwebtoken')

const validarJWT = (req, res = response, next) => {
  const token = req.header('x-token')

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'No hay token en la peticion',
    })
  }

  try {
    const { uid, nombres } = jwt.verify(token, process.env.SECRET_JWT_TEST)

    req.uid = uid
    req.nombres = nombres
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      ok: false,
      msg: 'Token no valido',
    })
  }

  next()
}

module.exports = {
  validarJWT,
}
