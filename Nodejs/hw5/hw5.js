var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;
var Users = 0;
var name ;


// note: app.listen(3000) will NOT work here...
server.listen (port, function() {
   console.log ('listening on port ' + port);
});

// express ...
/*app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});*/

app.get ('/', function (req, res) {
	res.sendFile (__dirname + "/hw5_log.html");
});

app.get ('/change', function (req, res) {
	let name = req.query.name;
	console.log (name + ' is on ...') 
	res.sendFile (__dirname + '/hw5_chat.html');
});


// socket.io ...
io.on('connection', function(socket){  // connection is same as connect
  //上線通知
  socket.on('login', function(name){
	++Users;
	socket.name=name;
    io.emit('login', name, Users);
  });
  //離線通知
  socket.on('disconnect', function () {
	  console.log(socket.name);
	--Users;
	
	io.emit('diss', socket.name,Users);
  });
  //訊息傳送
  socket.on('chat message', function(msg, name){
    io.emit('chat message', msg, name);
  });
});

