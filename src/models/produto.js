'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Produto extends Model {
    static associate(models) {
      // Produto pertence a uma categoria
      Produto.belongsTo(models.Categoria, {
        foreignKey: 'categoria_id',
      });

      // Produto pode estar em vários carrinhoItems
      Produto.hasMany(models.CarrinhoItem, {
        foreignKey: 'produto_id',
      });

      // Produto pode estar em vários pedidoItems
      Produto.hasMany(models.PedidoItem, {
        foreignKey: 'produto_id',
      });
    }
  }

  Produto.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      descricao: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      preco: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },

      estoque: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },

      categoria_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Produto',
    }
  );

  return Produto;
};