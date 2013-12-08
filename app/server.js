'use strict';

var http     = require('http');
var path     = require('path');
var express  = require('express');
var WSServer = require('ws').Server;
var app      = express();
var server   = http.createServer(app);
var wss      = new WSServer({server: server});

// Paths
// ----------------------------------------------------------------------------
var APP_STATIC_PATH       = path.resolve('./app/static');
var APP_TESTS_STATIC_PATH = path.resolve('./test');
var BOWER_COMPONENTS_PATH = path.resolve('./bower_components');

// Global configuration
// ----------------------------------------------------------------------------
app.use(express.json());
app.use(express.urlencoded());

// Production
// ----------------------------------------------------------------------------
app.configure('production', function() {
	app.use(express.static(APP_STATIC_PATH));
	app.use('/vendor', express.static(BOWER_COMPONENTS_PATH));
});

// Development
// ----------------------------------------------------------------------------
app.configure('development', function() {
	app.use(express.static(APP_STATIC_PATH));
	app.use('/vendor', express.static(BOWER_COMPONENTS_PATH));
});

// Test
// ----------------------------------------------------------------------------
app.configure('test', function() {
	app.use(express.static(APP_TESTS_STATIC_PATH));
	app.use(express.static(APP_STATIC_PATH));
	app.use('/vendor', express.static(BOWER_COMPONENTS_PATH));
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
});

// WebSocket Server
// ----------------------------------------------------------------------------
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

// Application Lifecycle
// ----------------------------------------------------------------------------
app.start = function start(port, callback) {
	server.listen(port, function() {
		console.log('Server running in ' + process.env.NODE_ENV + ' mode on port ' + port);
		if (callback) callback();
	});
};

app.shutdown = function shutdown(callback) {
	server.close(callback);
};

// Exports
// ----------------------------------------------------------------------------
module.exports.app = app;
module.exports.server = server;
