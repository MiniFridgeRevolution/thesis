var spawn = require('child_process').spawn;

var gatherDataProcess = spawn('python', ['gatherData.py']);
console.log(gatherDataProcess.pid);
// setTimeout(function(){
// 	gatherDataProcess.kill();
// 	py = spawn('python', ['twitter.py']);
// 	console.log(py.pid);
// 	dataString = '';
// 	py.stdout.on('data', function(data){
// 		console.log(parseInt(data.toString()));
// 		dataString += data.toString();
// 	});
// 	py.stdout.on('end', function(){
//   		console.log('Sum of numbers=',dataString);
// 	});
// }, 10000);
setInterval(function(){
	py = spawn('python', ['twitter.py']);
	dataString = '';
	py.stdout.on('data', function(data){
		console.log(parseInt(data.toString()));
		dataString += data.toString();
	});
	py.stdout.on('end', function(){
  		console.log('Sum of numbers=',dataString);
	});
}, 10000);


