'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Produtos', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false
      },
      descricao: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      preco: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false
      },
      estoque: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      categoria_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Categorias',
          key: 'id'
        },
        onDelete: 'RESTRICT', //Impede de deletar uma categoria que ainda tenha produtos
        onUpdate: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Produtos');
  }
};