'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Categoria extends Model {
    static associate(models) {
      // Uma categoria pode ter vários produtos
      Categoria.hasMany(models.Produto, {
        foreignKey: 'categoria_id',
      });
    }
  }

  Categoria.init(
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
        unique: true,
      },
    },
    {
      sequelize,
      modelName: 'Categoria',
      tableName: 'Categorias'
    }
  );

  return Categoria;
};