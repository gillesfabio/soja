.PHONY: init
init:
	npm install
	bower install

.PHONY: clean
clean:
	rm -rf node_modules vendor doc
