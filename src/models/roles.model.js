const {DataTypes} = require("sequelize");

const {sequelize} = require('./db_connect');

const rolesModel = sequelize.define('roles', {
  role_name: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '',
  },
  role_id: {
    type: DataTypes.INTEGER,
    unique: true,
    allowNull: false,
  }
}, {tableName: 'roles'});

// create `roles` table if it doesn't exist
rolesModel.sync({force: true}).then(() => {
  console.log("Roles model synced");
  Promise.all([
    rolesModel.create({role_name: 'ADMIN', role_id: 777}),
    rolesModel.create({role_name: 'USER', role_id: 111}),
    rolesModel.create({role_name: 'COACH', role_id: 222})
  ])
    .then((result) => {
      console.log('roles init data saved');
    });
});


exports.RolesModel = rolesModel;
