#!/usr/bin/env bash

# Add Docker repository
wget -q -O - https://get.docker.io/gpg | apt-key add -
echo deb http://get.docker.io/ubuntu docker main > /etc/apt/sources.list.d/docker.list

# Update repositories and install kernel headers
apt-get update -q
apt-get install -y linux-headers-$(uname -r) dkms

# Install latest VirtualBox Guest additions
if [ ! -d /opt/VBoxGuestAdditions-4.3.2/ ]; then
	wget -cq http://dlc.sun.com.edgesuite.net/virtualbox/4.3.2/VBoxGuestAdditions_4.3.2.iso
	mount -o loop,ro /home/vagrant/VBoxGuestAdditions_4.3.2.iso /mnt
	yes|sh /mnt/VBoxLinuxAdditions.run
	umount /mnt
fi

# Install Docker
apt-get install -y --force-yes lxc-docker

# Create `docker` group if not exists
if ! getent group docker ; then
	groupadd docker
fi

# Add `vagrant` user into the `docker` group (to avoid sudoing everything)
if [ -z "$(getent group docker | grep vagrant)" ] ; then
	usermod -a -G docker vagrant
fi

# Wait for docker.sock (prevent the /var/run/docker.sock: no such file or directory)
t=0
while [ $t -lt 40 ] ; do
	if [ -e /var/run/docker.sock ] ; then
		t=40
	else
		echo -en '.'
		sleep 0.5
		let t+=1
	fi
done

# Chown docker.sock
chown root:docker /var/run/docker.sock || true

# Install Soja docker image
(cd /soja; docker build -t soja .)

# Initialize project (install dependencies)
(cd /soja; docker run -v /soja:/soja -name soja-install soja make install_docker)
