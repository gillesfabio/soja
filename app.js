'use strict';

var app = require('./app/server').app;

app.start(process.env.PORT || 8888);
