const {DataTypes, Sequelize} = require("sequelize");

const {sequelize} = require('./db_connect');

const users_model = sequelize.define('Users', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '',
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '',
  },
  phone: {
    type: DataTypes.BIGINT,
    allowNull: false,
    unique: true,
    defaultValue: '',
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  role: {
    type: DataTypes.INTEGER,
  }
}, {tableName: 'users'});

// create table `users` if it doesn't exist
users_model.sync({force: false}).then(() => {
  console.log('table name `users` created');
});

exports.UsersModel = users_model;
