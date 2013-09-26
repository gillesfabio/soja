'use strict';

var express = require('express'),
	path	= require('path'),
	app     = express(),
	server  = require('http').createServer(app),
	io      = require('socket.io').listen(server);


app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, '..', 'src', 'vendor')));

io.set('log level', 1);
io.set('transports', ['websocket']);
server.listen(9999);
