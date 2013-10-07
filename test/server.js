'use strict';

var express         = require('express'),
	path            = require('path'),
	app             = express(),
	server          = require('http').createServer(app),
	WebSocketServer = require('ws').Server,
	wss             = new WebSocketServer({server: server});

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, '..')));
app.use(express.static(path.join(__dirname, '..', 'src')));

server.listen(9999);

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

exports = module.exports = server;

exports.use = function() {
	app.use.apply(app, arguments);
};
