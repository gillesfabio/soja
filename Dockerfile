FROM ubuntu:precise
MAINTAINER Gilles Fabio <gilles@gillesfabio.com>

# Update the system
RUN echo "deb http://archive.ubuntu.com/ubuntu precise main universe" > /etc/apt/sources.list
RUN apt-get update
RUN apt-get upgrade -y

# Build dependencies
RUN apt-get install -y -q build-essential
RUN apt-get install -y -q python-software-properties
RUN apt-get install -y -q python
RUN apt-get install -y -q git

# Install Node.js
RUN add-apt-repository ppa:chris-lea/node.js
RUN apt-get update
RUN apt-get install -y nodejs

# Expose Soja ports
EXPOSE 8888 9999

# Install NPM global libs
RUN npm install -g bower
RUN npm install -g grunt-cli
RUN npm install -g git://github.com/jsdoc3/jsdoc.git

# Add Soja directory
ADD . /soja
WORKDIR /soja

CMD ["bash"]
