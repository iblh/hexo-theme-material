---
layout: post
title: "Devops with Vagrant and Chef"
location: Southampton, England
image: headers/new_york_downtown.jpg
color: 5b8caf
---

{{ page.title }}
================

Just over a year ago, my good friend [Mike Rumble](https://www.facebook.com/rumble) received a job offer to join Facebook's User Interface team. After some deliberation (only joking) he accepted the offer. Unluckily he missed out on the year's H-1B visa allocation, being forced to wait until September '12 to move across the pond. This wasn't such a bad thing of course. It meant he got to have a proper send off, including a memorable [trip to New York](http://pics.mozmorris.co.uk/new-york-ny/) and some great nights down the pub. 

We ended up talking for a while about what it was going to be like working at Facebook HQ, and in particular what the technology stack & development work flow might look like. *How the hell do you hack code for the world's most visited site?* We assumed there would be some clever [sandboxing](http://en.wikipedia.org/wiki/Sandbox_\(software_development) going on. This got us thinking about setting up virtual machines on our dev boxes that would mirror or closely resemble our production environment. I think Mike managed to move his code to a VM running Ubuntu. I, on the other hand, never got round to it until just recently.

This is an overview of my set up and how I got it running.


Vagrant & VirtualBox
--------------------
[Vagrant](http://www.vagrantup.com/) is a bad ass tool written in Ruby that uses [VirutualBox](https://www.virtualbox.org/) to create Virtual Machines. Predictably, VirtualBox needs to be installed then.

[Install VirtualBox](https://www.virtualbox.org/wiki/Downloads)

Vagrant is available as a RubyGem. Their site recommends using their own package installer but since I got my Ruby & Gems installed with [rbenv](https://github.com/sstephenson/rbenv), I'll go the gem route. 

{% highlight bash %}
$ gem install vagrant
$ rbenv rehash
{% endhighlight %}

Writing out `rbenv rehash` just reminded me that Sam Stephenson released a [rbenv plugin](https://github.com/sstephenson/rbenv-gem-rehash) that removes the need to to use rehash after every gem install.

Creating a VM the Quick Way
---------------------------

This uses a <strike>base CentOs 6.3 box listed on [http://www.vagrantbox.es/](http://www.vagrantbox.es/)</strike> CentOS 6.3 box I created myself. It's the standard CentOS 6.3 minimal install with the addition of Git & rbenv, [ruby-build](https://github.com/sstephenson/ruby-build) & rbenv-gem-rehash.

{% highlight bash %}
$ vagrant box add centos63 http://mozmorris.co.uk/static/CentOS_63_x64.box
$ mkdir centos63 && cd centos63
$ vagrant init centos63
$ vagrant up
{% endhighlight %}

What's happening here? The box image is downloaded, a Vagrantfile is created and the VM is started. The Vagrantfile is the VM's configuration file. It's written in Ruby making it possible to programmatically configure the VM.

Using <strike>some random box from the internet</strike> my built box seems a little risky I know, but just go with it for now. I'll write up another post showing how to create a box from scratch.

SSH
---

Now SSH into the box:

{% highlight bash %}
$ vagrant ssh
$ cat /etc/issue
CentOS release 6.3 (Final)
{% endhighlight %}

Seriously, how easy was that? Vagrant generates a shared folder to the the host OS at `/vagrant`

{% highlight bash %}
$ cd /vagrant
$ ls -a
.vagrant  Vagrantfile
$ exit
{% endhighlight %}

Notice it's the same directory where the Vagrantfile lives on the host.

Setting up Apache & Passenger with Chef
---------------------------------------

Vagrant supports a bunch of different provisioners. Wait, what's a provisioner? A provisioner installs all the software on the VM using a set of instructions known as a recipe. Multiple recipes often come in the form of a cookbook which for example, might configure the VM as a web server. Sounds good huh? This example uses [Chef](http://www.opscode.com/chef/) to install Apache and the [Passenger](https://www.phusionpassenger.com/) Apache module.

{% highlight bash %}
$ vagrant destroy
$ mkdir cookbooks
$ git clone https://github.com/opscode-cookbooks/apache2 cookbooks/apache2
$ git clone https://github.com/opscode-cookbooks/passenger_apache2 cookbooks/passenger_apache2
{% endhighlight %}

Edit the Vagrantfile to include:

{% highlight ruby %}
Vagrant::Config.run do |config|
  config.vm.box = "CentOS63"

  config.vm.provision :chef_solo do |chef|
    chef.cookbooks_path = "cookbooks"
    chef.add_recipe "passenger_apache2"

    # all gem_package calls should use the rbenv installed gem binary
    chef.json = { :dependencies => { :gem_binary => "/usr/local/rbenv/shims/gem" }}
  end
end
{% endhighlight %}

{% highlight bash %}
$ vagrant up
$ vagrant ssh
{% endhighlight %}

Running a Sinatra App
---------------------

Just for a quick demo, I'm creating a hello world [Sinatra](http://www.sinatrarb.com/) app. In this instance, I've put the app in the `/vagrant` directory so that it's possible to access the code from the host machine.

{% highlight bash %}
$ cd /vagrant
$ mkdir app && cd app
$ touch app.rb config.ru
$ mkdir public
{% endhighlight %}

{% highlight ruby %}
# app.rb
require 'sinatra'

get '/' do
  'Hello world!'
end
{% endhighlight %}

{% highlight ruby %}
# config.ru
require './app'
run Sinatra::Application
{% endhighlight %}

Create a virtual host entry in Apache:

{% highlight apache %}
# /etc/httpd/sites-enabled/hello-world.conf
<VirtualHost *:80>
    ServerName hello-world.localhost
    DocumentRoot /vagrant/app/public
    <Directory /vagrant/app/public>
        Allow from all
        Options -MultiViews
    </Directory>
</VirtualHost>
{% endhighlight %}

Add the **hello-world.localhost** hostname to the hosts file, restart apache and check to see if the app's running.

{% highlight bash %}
$ echo 'echo "127.0.0.1   hello-world.localhost" >> /etc/hosts' | sudo sh
$ sudo apachectl restart
$ curl hello-world.localhost
Hello world!
{% endhighlight %}

Phew, Made It
-------------

I've been using the VM to serve the apps that I frequently work on. This only involves a couple of steps as I'm keeping the code base on the host. Firstly, symlinking the code so that it's accessible by the VM. Secondly, setting up the corresponding Apache config. I'm still running databases on the host machine but I should look to offload these to a VM at some point.

In summary, Vagrant is awesome. And so is Chef. I'm recommending them, to myself.






                                                                                             

