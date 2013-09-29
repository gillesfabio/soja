server:
	./node_modules/.bin/nodemon src/server.js

test-server:
	./node_modules/.bin/nodemon test/server.js

.PHONY: server test-server
