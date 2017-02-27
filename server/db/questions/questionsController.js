const Question = require('./questionsModel.js');

const controller = {
  save: function(req, res, next) {
    Question.create({
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
    // console.log('calling questionsController retrieve');
    Question.findAll()
    .then(function(questions) {
      //after getting data, set the state
      //need to make sure the shape of object from DB match the state's
      //loop through the response.data array
      var promises = questions.map(function(question){
        // console.log('===========', question.dataValues, ' >>>> in promise all');

        /*
        
        { id: 25,
          title: 'helo',
          question: 'heloleoeo',
          status: 'open',
          deadline: null,
          createdAt: 2017-02-25T19:37:17.678Z,
          updatedAt: 2017-02-25T19:37:17.678Z,
          userId: null }

        */

        return {
          'id': question.dataValues.id,
          'title':question.dataValues.title,
          'question':question.dataValues.question,
          'status':question.dataValues.status,
          'deadline': '',
        }
      });
      Promise.all(promises).then(function() {
        console.log('===========', promises, ' >>>> in promise all')
        //convert array into object
        var object = {};

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

