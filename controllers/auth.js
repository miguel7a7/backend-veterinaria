const { response } = require('express')
const bcrypt = require('bcryptjs')
const Usuario = require('../models/Usuario')
const { generarJWT } = require('../helpers/jwt')

/*========================================================================
                 Funcion para crear Usuario
========================================================================*/
const crearUsuario = async (req, res = response) => {
  const { email, password } = req.body

  try {
    let usuario = await Usuario.findOne({ email })

    if (usuario) {
      return res.status(400).json({
        ok: false,
        msg: 'Un usuario ya se registro con este email',
      })
    }

    usuario = new Usuario(req.body)

    /*=== Encriptar contraseña ===*/
    const salt = bcrypt.genSaltSync()
    usuario.password = bcrypt.hashSync(password, salt)

    await usuario.save()

    /*=== Generar JWT ===*/
    const token = await generarJWT(usuario.id, usuario.nombres)

    res.status(201).json({
      ok: true,
      msg: 'Registro de usuario exitoso!!!',
      uid: usuario.id,
      nombres: usuario.nombres,
      token,
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      ok: false,
      msg: 'Por favor contactese con el administrador',
    })
  }
}

/*========================================================================
                 Funcion para loguear a Usuario
========================================================================*/
const loginUsuario = async (req, res) => {
  const { email, password } = req.body

  try {
    const usuario = await Usuario.findOne({ email })

    if (!usuario) {
      return res.status(400).json({
        ok: false,
        msg: 'Usuario y contraseña incorrectos',
      })
    }

    /*=== Inicio de: Confirmar Password ===*/
    const validPassword = bcrypt.compareSync(password, usuario.password)

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'Usuario y contraseña incorrectos',
      })
    }

    /*=== Inicio de: Generar nuestro TOKEN ===*/
    const token = await generarJWT(usuario.id, usuario.nombres)

    /*=== Inicio de: Envio correcto del login ===*/
    res.status(200).json({
      ok: true,
      msg: `Bienvenido ${usuario.nombres}`,
      uid: usuario.id,
      nombres: usuario.nombres,
      token,
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      ok: false,
      msg: 'Por favor contactese con el administrador',
    })
  }
}

/*========================================================================
         Funcion para revalidar y/o generar nuevo token de Usuario
========================================================================*/
const reavalidarToken = async (req, res) => {
  const { uid, nombres } = req

  /*=== Generar un nuevo token y retornarlo en esta peticio ===*/
  const token = await generarJWT(uid, nombres)

  res.json({
    ok: true,
    token,
    uid,
    nombres,
  })
}

module.exports = {
  crearUsuario,
  loginUsuario,
  reavalidarToken,
}
