const db = require('../database.js'); //for raw sql query
const Question = require('./questionsModel.js');

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
    
    db.query('SELECT name, questions.id, title, question, status, deadline, questions."createdAt" \
      from users INNER JOIN questions ON questions."userId" = users.id', { model: Question })
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
          'name': question.name,
          'createdAt': question.createdAt,
        }
      });
    
    /*Question.findAll()
    .then(function(questions) {
      console.log('XXX results',questions);
      //after getting data, set the state
      //need to make sure the shape of object from DB match the state's
      //loop through the response.data array
      var promises = questions.map(function(question){
        // console.log('===========', question.dataValues, ' >>>> in promise all');
        console.log('XXX each question', question);
        return {
          'id': question.dataValues.id,
          'title':question.dataValues.title,
          'question':question.dataValues.question,
          'status':question.dataValues.status,
          'deadline': '',
          
        }
      });*/
      Promise.all(promises).then(function() {
        // console.log('===========', promises, ' >>>> in promise all')
        //convert array into object
        // var object = {};

        res.send(promises);
      })


      // var newShape = {};

      // for (var i = 0; i < questions.length; i++) {
      //   console.log('Question object', JSON.parse(questions[i]));

      // }
      // res.json(newShape);
      // res.json(questions);
    })
    .catch(function(err) {
      console.log(' X X X X error retrieving question');
      return res.sendStatus(500);
    });
  },
};

module.exports = controller;

