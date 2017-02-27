const Sequelize = require('sequelize');
const db = require('../database.js');
const User = require('../users/usersModel.js');

const Question = db.define('question', {
  userId: {
    type: Sequelize.INTEGER
  },
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
  name: {
    type: Sequelize.STRING
  }
  
});

User.hasMany(Question);

db.sync();

module.exports = Question;
