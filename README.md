# Soja

**Soja** is a web user interface for [Watai](http://github.com/MattiSG/Watai)
web testing framework.

![Soja in Action](https://raw.github.com/gillesfabio/soja/master/resources/screenshot.png)

## Status

**This project is currently experimental and requires a [dedicated Watai branch](https://github.com/gillesfabio/Watai/tree/ws-view)
that is not yet merged in master. So it is not ready for production use.**

## Installation

Soja requires [Node](http://nodejs.org) and [Bower](http://bower.io)
(optionally [Git](http://git-scm.com/)). Clone the repository (or download
archive from GitHub) and perform the project initialization with `make init`:

	git clone https://github.com/gillesfabio/soja.git
	cd soja
	make init

If you need some help to install these requirements, follow your OS specific
instructions thereafter.

### Mac OS X

You can use [Homebrew](http://brew.sh/) to easily setup your system. Soja
provides a bootstrap script to auto-install requirements. But you need to
install, at least, [Git](http://git-scm.com/) and the [Apple Command Line Tools](https://developer.apple.com/downloads)
or [Xcode](http://itunes.apple.com/us/app/xcode/id497799835) before running
this script. Once they are installed:

	git clone https://github.com/gillesfabio/soja.git
	cd soja
	./scripts/osx/install.sh
	make init

### Vagrant & Docker

If you rather prefer to use [Vagrant](http://vagrantup.com) and [Docker](http://docker.io),
Soja provides configurations to setup a virtual machine and a Docker container
in a few minutes.

OS X users can use the bootstrap script to auto-install [VirtualBox](http://virtualbox.org)
and Vagrant on their systems (this script will install Homebrew and
[Homebrew Cask](https://github.com/phinze/homebrew-cask)):

	git clone https://github.com/gillesfabio/soja.git
	cd soja
	./scripts/osx/install-vagrant.sh

Once done, start the Vagrant VM and connect you:

	vagrant up && vagrant ssh

This Vagrant VM is Docker ready and a Docker image named `soja` will be built
at provisioning. You can access the `soja` folder at `/soja` in the VM.
Don't forget to mount the `/soja` folder as a Docker volume when you execute
any Docker commands. Example:

	docker run -v /soja:/soja <IMAGE> <COMMAND>

Let's run the server:

	SOJA_SERVER=$(docker run -v /soja:/soja -name soja-server -p 8888:8888 -d soja npm start)

Open your browser and go to the URL `http://localhost:8888`.

Let's kill it and remove the container:

	docker kill $SOJA_SERVER
	docker rm $SOJA_SERVER

Well. Feel free to execute it again and launch some Watai tests.

## Usage

Run the server:

	npm start

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

	npm test

In your favorite browser, go to `http://localhost:8888`:

	open http://localhost:8888

### Developer Documentation

The documentation is powered by [JSDoc3](http://usejsdoc.org/).

To generate it, first install JSDoc3, then execute this command:

	make docs

### Any question?

If you have any question, create an issue or contact the author.

If you have any question related to [Watai](https://github.com/MattiSG/Watai), please
don't create an issue here. Go to the Watai's project page.
