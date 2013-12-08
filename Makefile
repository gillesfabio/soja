.PHONY: init init-docker clean docs server test
NODE_LOCAL_BIN=./node_modules/.bin
NODE_ENV?=development

init:
	npm install
	bower install

init-docker:
	npm install
	bower install --allow-root

clean:
	rm -rf node_modules vendor docs

docs:
	./node_modules/jsdoc/jsdoc -c jsdoc.json

server:
	@env NODE_ENV=${NODE_ENV} PORT=8888 node app.js

test:
	@env NODE_ENV=test PORT=8888 node app.js
