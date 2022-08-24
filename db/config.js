const mongoose = require('mongoose')

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECT)
    console.log('DB Conectado')
  } catch (err) {
    console.log(err)
    throw new Error('Error al inicial la BD')
  }
}

module.exports = {
  dbConnection,
}
