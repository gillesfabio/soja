.PHONY: install install_docker clean docs server test jshint lint
NODE_LOCAL_BIN=./node_modules/.bin
NODE_ENV?=development

install:
	npm install
	bower install

install_docker:
	npm install
	bower install --allow-root

clean:
	rm -rf node_modules bower_components docs

docs:
	@$(NODE_LOCAL_BIN)/jsdoc -c jsdoc.json

server:
	@env NODE_ENV=${NODE_ENV} PORT=8888 node app.js

test:
	@env NODE_ENV=test PORT=8888 node app.js

jshint:
	@$(NODE_LOCAL_BIN)/jshint --verbose *.js app tests

lint: jshint
