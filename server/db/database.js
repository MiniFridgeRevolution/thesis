const Sequelize = require('sequelize');

//For testing only...

// const cfg = require('./dbconfig.js');
// const sequelize = new Sequelize(cfg.myLocalDB, cfg.myLocalDBRole, cfg.myLocalDBPW, {
//   host: 'localhost',

// for production

const db = 'd7oj410eip9o96';
const user = 'wvdptjfsnehola';
const pw = 'cdbdbe12e3f23f31f718f75283f2db41eecbb9c2f3dcbb61ac60c247a1451f46';

const sequelize = new Sequelize(db, user, pw, {
  host: 'ec2-54-243-55-1.compute-1.amazonaws.com',

  port: 5432,
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });

module.exports = sequelize;