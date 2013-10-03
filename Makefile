install:
	npm install
	bower install
	gem install compass

doc:
	rm -rf ./doc
	./node_modules/jsdoc/jsdoc -c jsdoc.json
	open ./doc/index.html

.PHONY: install doc
