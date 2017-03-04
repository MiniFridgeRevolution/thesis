const db = require('../database.js'); //for raw sql query
const Question = require('./questionsModel.js');
const QuestionOneUser = require('./questionsUserSpecificModel.js');

const controller = {
  save: function(req, res, next) {
    Question.create({
        userId: req.body.userId,
        title: req.body.title,
        question: req.body.question,
        status: 'open',
    })
    .then(function(task) {
      task.save();
      return res.status(200).send('Question successfully saved.');
    })
    .catch(function(err) {
      console.log(' X X X X Error saving question');
      return res.sendStatus(500);
    });
  },
  
  retrieve: function(req, res, next) {
    
    // console.log('XXX calling questionsController retrieve');
    var currentUserId = req.query.userId;
    console.log('Current User Id to Retrieve just that users question', currentUserId);

    //retrieve all questions
    db.query('SELECT questions."userId", name, questions.id, title, question, status, deadline, questions."createdAt" \
              from users INNER JOIN questions ON questions."userId" = users.id \
              ORDER BY id DESC', { model: Question })
    .then(function(questions) {
      // console.log('XXX RAW results',questions);
      var promises = questions.map(function(question) {
        // console.log('XXX each question', question);
        return {
          'id': question.id,
          'title':question.title,
          'question':question.question,
          'status':question.status,
          'deadline': '',
          'userId':question.userId,
          'name': question.name,
          'createdAt': question.createdAt,
        }
      });
      Promise.all(promises).then(function() {
        res.send(promises);
      })
    })
    .catch(function(err) {
      console.log(' X X X X error retrieving question');
      return res.sendStatus(500);
    });
  },

  searchQuestions: function(req, res, next) {

    //retrieve all questions
    db.query('SELECT question, title FROM questions')
    .then(function(questions) {
      var promises = questions.map(function(question) {
        return {
          'title':question.title,
          'question':question.question
        }
      });
      Promise.all(promises).then(function() {
        res.send(promises);
      })
    })
    .catch(function(err) {
      console.log(' X X X X error retrieving question');
      return res.sendStatus(500);
    });
  },

  retrieveForOneUser: function(req, res, next) {
    
    var currentUserId = req.query.userId;
    console.log('Current User Id to Retrieve just that users question', currentUserId);
    
    QuestionOneUser.findAll({
      where: { userId: 2 },
      order: [['id', 'DESC']],
    })
    .then(function(questions) {
      var promises = questions.map(function(question){
        // console.log('===========', question.dataValues, ' >>>> in promise all');
        return {
          'id': question.dataValues.id,
          'title':question.dataValues.title,
          'question':question.dataValues.question,
          'status':question.dataValues.status,
          'deadline': '',
          'createdAt': question.createdAt,
          'userId': question.userId,
        }
      });
      Promise.all(promises).then(function() {
        res.send(promises);
      })
    })
    .catch(function(err) {
      console.log(' X X X X error retrieving one user questions');
      return res.sendStatus(500);
    });
  },

};

module.exports = controller;

