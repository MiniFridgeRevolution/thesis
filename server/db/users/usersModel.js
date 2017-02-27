const Sequelize = require('sequelize');
// const bcrypt = require('bcrypt');
const db = require('../database.js');
//create schema
const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
    unique: true
  },
  description: {
    type: Sequelize.STRING,
  }
});

// User.generateHash = (password) => {
//   return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
// };

// User.validatePW = (enteredPW, storedPW) => {
//   return bcrypt.compareSync(enteredPW, storedPW);
// };

module.exports = User;
