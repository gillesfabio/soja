# Soja

**Soja** is a realtime web user interface for [Watai](http://github.com/MattiSG/Watai)
web testing framework.

![Soja in Action](https://raw.github.com/gillesfabio/soja/master/soja-screenshot.png)

## Installation

Prerequisites:

* [Git](http://git-scm.com/)
* [Node](http://nodejs.org)
* [NPM](http://npm.org)
* [Grunt](http://gruntjs.com)
* [Bower](http://bower.io)

Installation:

	git clone https://github.com/gillesfabio/soja.git
	cd soja
	make init

Lost? Follow your OS specific instructions thereafter.

### Mac OS X

The steps are:

* Install [OS X Command Line Tools](https://developer.apple.com/downloads) or [Xcode](http://itunes.apple.com/us/app/xcode/id497799835)
* Install [Homebrew](http://brew.sh/)
* Install [Git](http://git-scm.com/)
* Install [Node](http://nodejs.org) (NPM is already provided by Node)
* Install [Grunt](http://gruntjs.com)
* Install [Bower](http://bower.io)
* Install [Soja](http://github.com/gillesfabio/soja)

Once the OS X Command Line Tools or Xcode are installed, open a terminal
(`Applications/Utilities/Terminal.app`) and execute the following commands
(if needed):

	# Install Homebrew
	ruby -e "$(curl -fsSL https://raw.github.com/mxcl/homebrew/go)"

	# Install Git and Node
	brew install git node

	# Install Grunt and Bower
	sudo npm install -g grunt-cli bower

Now, you can clone the Soja repository and install the stack:

	git clone https://github.com/gillesfabio/soja.git
	cd soja
	make init

Done.

## Usage

Run the server:

	grunt server

Launch your favorite browser and go to `http://localhost:8888`:

	open http://localhost:8888

Now, execute your Watai test suite and see the results in the browser.

## Contribute

Feel free to contribute by creating issues and submitting pull requests.
Please [create an issue](http://github.com/gillesfabio/soja/issues) first
on GitHub before submitting any pull request. Your code must follow
the [Watai's code conventions](https://github.com/MattiSG/Watai/wiki/Code-conventions).

### Tests

Tests are written on top of [Chai](http://chaijs.com/api/bdd/) (BDD) and
[Mocha](http://visionmedia.github.io/mocha/).

To execute the test suite, run the following command:

	grunt test

In your favorite browser, go to `http://localhost:9999`:

	open http://localhost:9999

### Developer Documentation

The documentation is powered by [JSDoc3](http://usejsdoc.org/).

If your OS is OS X, you can use [Homebrew](http://brew.sh/) to install
the latest version of JSDoc in a single one command:

	brew install jsdoc3

Then you can easily generate and browse it:

	grunt doc

### Any question?

If you have any question, create an issue or contact the author.

If you have any question related to [Watai](https://github.com/MattiSG/Watai), please
don't create an issue here. Go to the Watai's project page.
