#!/usr/bin/env bash

# Install Homebrew
which brew > /dev/null || ruby -e "$(curl -fsSL https://raw.github.com/mxcl/homebrew/go)"

# Install Homebrew Cask
brew tap phinze/homebrew-cask
brew install brew-cask || brew upgrade brew-cask

# Install VirtualBox and Vagrant
brew cask install virtualbox
brew cask install vagrant
