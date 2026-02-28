'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CarrinhoItem extends Model {
    static associate(models) {
      CarrinhoItem.belongsTo(models.Carrinho, {
        foreignKey: 'carrinho_id',
      });

      CarrinhoItem.belongsTo(models.Produto, {
        foreignKey: 'produto_id',
      });
    }
  }

  CarrinhoItem.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      carrinho_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },

      produto_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },

      quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },

      preco_unitario: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'CarrinhoItem',
    }
  );

  return CarrinhoItem;
};