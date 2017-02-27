const User = require('./usersModel.js');

//For testing
const dbconfig = require('../dbconfig.js');

//for prod
// const dbconfig = { secret: 'RnPbb8wyxmFwfuCy1glqyjguZ38JyPoo' };


const controller = {
  create: function(req, res, next) {
    // const password = User.generateHash(req.body.password);
    User.findOrCreate({
      where: {
        email: req.body.email,
      },
      defaults: {
        name: req.body.name,
      }
    }).spread(function(user, created){
      if (created) {
        console.log('User is successfully created');
      } else {
        return res.sendStatus(500);
      }
    }).catch(function(err){
      if (err.original.code === '23505') {
        return res.status(403).send('That email address already exists, please login');
      }
      return res.sendStatus(500);
    })
  },
  retrieve: function() {
    console.log('calling usersController retrieve');
  }
};

module.exports = controller;
