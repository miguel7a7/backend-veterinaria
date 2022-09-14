const jwt = require('jsonwebtoken')

const generarJWT = (uid, nombres) => {
  return new Promise((resolve, reject) => {
    const payload = { uid, nombres }

    jwt.sign(
      payload,
      process.env.SECRET_JWT_TEST,
      {
        expiresIn: '2h',
      },
      (err, token) => {
        if (err) {
          console.log(err)
          reject('No se pudo generar el token')
        }

        resolve(token)
      }
    )
  })
}

module.exports = {
  generarJWT,
}
