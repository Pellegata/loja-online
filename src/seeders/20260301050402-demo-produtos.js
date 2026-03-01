'use strict'

const { v4: uuidv4 } = require('uuid')

module.exports = {
  async up(queryInterface, Sequelize) {

    const categorias = await queryInterface.sequelize.query(
      `SELECT id, nome FROM Categorias;`
    )

    const categoriasData = categorias[0]

    const eletronicos = categoriasData.find(c => c.nome === 'Eletrônicos')
    const perifericos = categoriasData.find(c => c.nome === 'Periféricos')

    await queryInterface.bulkInsert('Produtos', [
      {
        id: uuidv4(),
        nome: 'Notebook',
        descricao: 'Notebook gamer',
        preco: 5000.00,
        estoque: 10,
        categoria_id: eletronicos.id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        nome: 'Mouse',
        descricao: 'Mouse sem fio',
        preco: 150.00,
        estoque: 30,
        categoria_id: perifericos.id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Produtos', null, {})
  }
}