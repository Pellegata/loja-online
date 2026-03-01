'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    static associate(models) {
      // Um usuário pode ter vários carrinhos
      Usuario.hasMany(models.Carrinho, {
        foreignKey: 'usuario_id',
      });

      // Um usuário pode ter vários pedidos
      Usuario.hasMany(models.Pedido, {
        foreignKey: 'usuario_id',
      });
    }
  }

  Usuario.init(
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

      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },

      senha: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      perfil: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'cliente',
        validate: {
          isIn: [['admin', 'funcionario', 'cliente']]
        }
      },
    },
    {
      sequelize,
      modelName: 'Usuario',
      defaultScope: {
        attributes: {
          exclude: ['senha']
        }
      },
      scopes: {
        comSenha: {
          attributes: {}
        }
      }
    }
  );

  return Usuario;
};