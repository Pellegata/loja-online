'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PedidoItem extends Model {
    static associate(models) {
      PedidoItem.belongsTo(models.Pedido, {
        foreignKey: 'pedido_id',
      });

      PedidoItem.belongsTo(models.Produto, {
        foreignKey: 'produto_id',
      });
    }
  }

  PedidoItem.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      pedido_id: {
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
      modelName: 'PedidoItem',
    }
  );

  return PedidoItem;
};