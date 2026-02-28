'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Carrinho extends Model {
    static associate(models) {
      // Carrinho pertence a um usuário
      Carrinho.belongsTo(models.Usuario, {
        foreignKey: 'usuario_id',
      });

      // Carrinho tem vários itens
      Carrinho.hasMany(models.CarrinhoItem, {
        foreignKey: 'carrinho_id',
      });
    }
  }

  Carrinho.init(
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

      status: {
        type: DataTypes.ENUM('ativo', 'fechado', 'abandonado'),
        allowNull: false,
        defaultValue: 'ativo',
      },
    },
    {
      sequelize,
      modelName: 'Carrinho',
    }
  );

  return Carrinho;
};