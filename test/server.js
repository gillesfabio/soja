'use strict';

var express = require('express'),
	path	= require('path'),
	app     = express(),
	server  = require('http').createServer(app),
	io      = require('socket.io').listen(server);


app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, '..')));
app.use(express.static(path.join(__dirname, '..', 'src')));

io.set('log level', 1);
io.set('transports', ['websocket']);
server.listen(9999);

io.sockets.on('connection', function(socket) {

	var runDate = new Date();

	socket.emit('watai:web:runner', {
		runDate : runDate,
		name    : 'Runner',
		action  : 'start'
	});

	for (var i = 0; i < 4; i++) {
		socket.emit('watai:web:feature', {
			runDate     : runDate,
			sendDate    : new Date(),
			status      : 'success',
			description : 'This is feature ' + '#' + (i + 1),
			reasons     : []
		});
	}
});

exports = module.exports = server;

exports.use = function() {
  app.use.apply(app, arguments);
};
