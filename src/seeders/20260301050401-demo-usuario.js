'use strict'

const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require('uuid')

module.exports = {
  async up(queryInterface, Sequelize) {

    const senhaHash = await bcrypt.hash('1234', 8)

    await queryInterface.bulkInsert('Usuarios', [
      {
        id: uuidv4(),
        nome: 'Admin',
        email: 'admin@teste.com',
        senha: senhaHash,
        perfil: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        nome: 'Cliente Teste',
        email: 'cliente@teste.com',
        senha: senhaHash,
        perfil: 'cliente',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Usuarios', null, {})
  }
}