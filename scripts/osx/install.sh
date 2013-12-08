#!/usr/bin/env bash

# Install Homebrew
which brew > /dev/null || ruby -e "$(curl -fsSL https://raw.github.com/mxcl/homebrew/go)"

# Install Git, Node, JSDoc3
brew install git
brew install node
brew install jsdoc3

# Install Bower
sudo npm install -g bower
