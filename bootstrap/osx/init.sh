#!/usr/bin/env bash

which brew > /dev/null || ruby -e "$(curl -fsSL https://raw.github.com/mxcl/homebrew/go)"

brew install git
brew install node
brew install jsdoc3

sudo npm install -g grunt-cli
sudo npm install -g bower
