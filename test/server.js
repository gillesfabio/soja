'use strict';

var express = require('express'),
	app     = express(),
	server  = require('http').createServer(app),
	io      = require('socket.io').listen(server);


app.use(express.static(__dirname));

io.set('log level', 1);
io.set('transports', ['websocket']);
server.listen(9999);
