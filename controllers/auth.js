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
        msg: 'Un usuario existe con ese email',
      })
    }

    usuario = new Usuario(req.body)

    /*=== Encriptar contraseña ===*/
    const salt = bcrypt.genSaltSync()
    usuario.password = bcrypt.hashSync(password, salt)

    await usuario.save()

    /*=== Generar JWT ===*/
    const token = await generarJWT(usuario.id, usuario.name)

    res.status(201).json({
      ok: true,
      msg: 'Registro de usuario exitoso!!!',
      uid: usuario.id,
      name: usuario.name,
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
    const token = await generarJWT(usuario.id, usuario.name)

    /*=== Inicio de: Envio correcto del login ===*/
    res.status(200).json({
      ok: true,
      msg: `Bienvenido ${usuario.name}`,
      uid: usuario.id,
      name: usuario.name,
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
  const { uid, name } = req

  /*=== Generar un nuevo token y retornarlo en esta peticio ===*/
  const token = await generarJWT(uid, name)

  res.json({
    ok: true,
    token,
  })
}

module.exports = {
  crearUsuario,
  loginUsuario,
  reavalidarToken,
}
