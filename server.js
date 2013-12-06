/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var socketio = require("socket.io");
var fs = require("fs");
var app = express();


// expressの設定
app.set('port', process.env.PORT || 80);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// expressの何か
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);


// node webサーバ
var server = http.createServer(app).listen(app.get('port'), function()
{
	console.log(http.request);
	//console.log("クリエイトサーバーしてみた");
});


// socket.ioの設定
var io = socketio.listen(server, {'log level': 3});
io.sockets.on("connection", function(socket)
{
	socket.on("action1", function(data)
	{
		io.sockets.emit("back1", { value:data.value });
	})

	socket.on("disconnect", function()
	{
		log(socket.id + " の通信が途絶えました。大丈夫でしょうか");
	})
})

var log = function(){ console.log(arguments); }

