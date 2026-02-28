'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CarrinhoItems', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },

      carrinho_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Carrinhos',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      produto_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Produtos',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },

      quantidade: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },

      preco_unitario: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    // Evita produto duplicado no mesmo carrinho
    await queryInterface.addConstraint('CarrinhoItems', {
      fields: ['carrinho_id', 'produto_id'],
      type: 'unique',
      name: 'unique_produto_por_carrinho',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('CarrinhoItems');
  },
};