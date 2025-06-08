import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Produto = sequelize.define('Produto', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  categoria: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dataEntrada: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  dataValidade: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  preco: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
}, {
  tableName: 'produtos',
  timestamps: false
});

export default Produto;
