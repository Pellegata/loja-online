'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Pedido extends Model {
    static associate(models) {
      // Pedido pertence a um usuário
      Pedido.belongsTo(models.Usuario, {
        foreignKey: 'usuario_id',
      });

      // Pedido tem vários itens
      Pedido.hasMany(models.PedidoItem, {
        foreignKey: 'pedido_id',
      });
    }
  }

  Pedido.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      usuario_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },

      valor_total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },

      status: {
        type: DataTypes.ENUM(
          'pendente',
          'pago',
          'enviado',
          'entregue',
          'cancelado'
        ),
        allowNull: false,
        defaultValue: 'pendente',
      },
    },
    {
      sequelize,
      modelName: 'Pedido',
    }
  );

  return Pedido;
};