var express = require('express');
var app = module.exports = express();
var path = require("path");
var fs = require('fs')

app.use(express.static(__dirname + '/../public'));

app.use('/bootstrap/js', express.static(__dirname + '/../node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/bootstrap/css', express.static(__dirname + '/../node_modules/bootstrap/dist/css')); // redirect CSS bootstrap
app.use(express.static(__dirname + '/../server/twitter'));

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
app.get('/*', function(req, res) {
  res.sendFile(path.resolve(__dirname + '/../public/index.html'));
});



