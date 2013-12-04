#!/usr/bin/env bash

which brew > /dev/null || ruby -e "$(curl -fsSL https://raw.github.com/mxcl/homebrew/go)"

brew tap phinze/homebrew-cask
brew install brew-cask || brew upgrade brew-cask

brew cask install virtualbox
brew cask install vagrant
