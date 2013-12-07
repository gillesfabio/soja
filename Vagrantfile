require 'vagrant'

ROOT = File.dirname(File.expand_path(__FILE__))

Vagrant.configure('2') do |config|
  config.vm.box = 'raring64'
  config.vm.box_url = 'http://cloud-images.ubuntu.com/vagrant/raring/current/raring-server-cloudimg-amd64-vagrant-disk1.box'
  config.ssh.forward_agent = true
  config.vm.network :forwarded_port, guest: 8888, host: 8888
  config.vm.network :forwarded_port, guest: 9999, host: 9999
  config.vm.synced_folder '.', '/vagrant', disabled: true
  config.vm.synced_folder ROOT, '/soja'
  config.vm.provision :shell, :path => 'scripts/vagrant/virtualbox/provision.sh'
  config.vm.provider :virtualbox do |vb|
    vb.customize ['modifyvm', :id, '--natdnshostresolver1', 'on']
    vb.customize ['modifyvm', :id, '--natdnsproxy1', 'on']
  end
end
