const {Sequelize} = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite',
  logging: console.log,
  define: {
    freezeTableName: true,
  },
});

async function Auth() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

Auth().then();

exports.sequelize = sequelize;
