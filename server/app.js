var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = module.exports = express();



var passport = require('passport');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var githubAuth = require('./auth/githubAuth');


app.use(cookieParser());



//Parse incoming body
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//database controllers
var usersCtrl = require('./db/users/usersController.js');
var questionsCtrl = require('./db/questions/questionsController.js');
var claimsCtrl = require('./db/claims/claimsController.js');

//executing DB controller's methods

app.post('/question', questionsCtrl.save);
app.get('/question', questionsCtrl.retrieve);

app.get('/users', usersCtrl.retrieve);
app.post('/users', usersCtrl.save);

app.get('/user-current', usersCtrl.retrieve);

app.post('/claim', claimsCtrl.save);
app.get('/claim', claimsCtrl.retrieve);


//routes
app.use(express.static(__dirname + '/../public'));
app.use('/bootstrap/js', express.static(__dirname + '/../node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/bootstrap/css', express.static(__dirname + '/../node_modules/bootstrap/dist/css')); // redirect CSS bootstrap
app.use(express.static(__dirname + '/../server/twitter'));


app.use(passport.initialize());
app.use(passport.session());


app.use(session({
  secret: "customSecret",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));


var passport = require('passport');

app.get('/auth/github', passport.authenticate('github', function(err, user, info) {
  console.log('inside auth');
  console.log(user);
}));

// GitHub will call this URL
app.get('/auth/github/callback', githubAuth.failureRedirect, githubAuth.successCallback);

app.get('/logout', function(req, res){
  console.log('logging out');
  req.logout();
  req.session.destroy(function(err) {
    if (err) {
      console.log('error:', err);
    }
    res.redirect('/');
  });

});



//for accessing session to get user data to the client
app.get('/session',  githubAuth.authenticate);
// 	function(req, res) {
//   console.log('inside githubAuth');
//   console.log('req.session:', req.session);
//   console.log('req.headers:', req.headers);
//   // console.log('res:', res);
//   res.send('hi');
// });


/****** coding trends routes ******/
//https://nodejs.org/docs/latest/api/path.html#path_path_resolve_paths
//The path.resolve() method resolves a sequence of paths or path segments into an absolute path.

app.get('/graph1', function(req, res) {
	res.sendFile(img);
});

app.get('/graph2/', function(req, res) {
	//var img = fs.readFileSync(path.resolve(__dirname + '/../server/twitter/plot2.png'));
	// res.type('png');
	// res.set('Content-Type', 'png');
	//res.sendFile(path.resolve(__dirname + '/../server/twitterplot2.png'));
	//console.log('hello');
	//res.sendFile(path.resolve(__dirname + '/../server/twitter/charts.html'));
	res.sendFile(path.resolve(__dirname + '/../server/twitter/charts.html'));
});

app.get('/graph3', function(req, res) {
	res.sendFile(path.resolve(__dirname + '/plot/charts.html'));
});

app.get('/*', githubAuth.checkUser, function(req, res) {
  res.sendFile(path.resolve(__dirname + '/../public/index.html'));
});






