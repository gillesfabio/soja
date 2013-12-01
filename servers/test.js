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

wss.on('connection', function(ws) {

	var runDate = new Date();

	ws.send(JSON.stringify({
		type	: 'watai:websocket:runner:start',
		runDate : runDate,
		name    : 'Runner',
	}));

	for (var i = 0; i < 4; i++) {
		ws.send(JSON.stringify({
			type        : 'watai:websocket:feature',
			runner      : {name: 'Runner', runDate: runDate},
			status      : 'success',
			description : 'This is feature ' + '#' + (i + 1),
			reasons     : []
		}));
	}
});

module.exports = server;
module.exports.use = function() {
	app.use.apply(app, arguments);
};
