.PHONY: init
init:
	npm install
	bower install

.PHONY: init-docker
init-docker:
	npm install
	bower install --allow-root

.PHONY: clean
clean:
	rm -rf node_modules vendor doc
