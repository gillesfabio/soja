'use strict';

var http            = require('http');
var path            = require('path');
var express         = require('express');
var WebSocketServer = require('ws').Server;

var app    = express();
var server = http.createServer(app);
var wss    = new WebSocketServer({server: server});

app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(function staticsPlaceholder(req, res, next) {
	return next();
});

wss.broadcast = function(data) {
	for (var i in this.clients) {
		this.clients[i].send(data);
	}
};

wss.on('connection', function(client) {
	client.on('message', function(message) {
		wss.broadcast(message);
	});
});

module.exports = server;
module.exports.use = function() {
	app.use.apply(app, arguments);
};
