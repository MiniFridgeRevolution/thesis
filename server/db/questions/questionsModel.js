const Sequelize = require('sequelize');
const db = require('../database.js');
const User = require('../users/usersModel.js');

const Question = db.define('question', {
  title: {
    type: Sequelize.STRING
  },
  question: {
    type: Sequelize.STRING
  },
  status: {
    type: Sequelize.STRING
  },
  deadline: {
    type: Sequelize.DATE
  },
  
});

User.hasMany(Question);

db.sync();

module.exports = Question;
