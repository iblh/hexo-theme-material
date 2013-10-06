---
layout: post
title: "Building a Vagrant Box with VeeWee"
location: Southampton, England
image: headers/new_orleans_hot_sauce.jpg
color: f44212
---

{{ page.title }}
================

This is a quick follow up to my [previous post](/2013/01/28/dev-ops-with-vagrant-and-chef.html) where I described how I got started using Vagrant and Chef. This time around I want to detail the process of creating a base box from scratch. *Why build a box from scratch?* Security for one, but mainly just for the hell of it. I'm using another handy RubyGem, this one's called [VeeWee](https://github.com/jedi4ever/veewee/). It handles the tedious steps like downloading ISOs and configuring the box. Give it some shell scripts and it runs them post installation, helpful for getting libraries installed.

## Install VeeWee

First up then, install the VeeWee gem.

{% highlight bash %}
$ gem install veewee
{% endhighlight %}

As well as providing its own binary, VeeWee extends Vagrant by adding the 'basebox' subcommand to it. Run `vagrant basebox` to see a list of options.

## Create a Box Definition

A good starting point is using a template on which to base the box definition. 

{% highlight bash %}
$ vagrant basebox templates
{% endhighlight %}

This prints out the templates available on [GitHub](https://github.com/jedi4ever/veewee/tree/master/templates). I'm using the `CentOS-6.3-x86_64-minimal` template in this example.

{% highlight bash %}
$ vagrant basebox define 'CentOS-6.3-x86_64' 'CentOS-6.3-x86_64-minimal'
{% endhighlight %}

This generates a `definitions` folder with the VeeWee config and some post installation shell scripts. I've created a [repos on GitHub](https://github.com/MozMorris/veewee-definitions/tree/master/definitions/CentOS-6.3-x86_64-rbenv) with my own modifications and additions to the template. I'm installing [rbenv](https://github.com/sstephenson/rbenv/) and some additional plugins. I then use rbenv to build and install the latest version of Ruby.

## Build & Export

Next up, the box is built. This might take a while...

{% highlight bash %}
$ vagrant basebox build 'CentOS-6.3-x86_64'
$ vagrant basebox validate 'CentOS-6.3-x86_64'
{% endhighlight %}

Following the build, the box is exported to the Vagrant .box format.

{% highlight bash %}
$ vagrant basebox export 'CentOS-6.3-x86_64'
{% endhighlight %}

## Add to Vagrant

Now it's possible to add the newly created box to Vagrant (I covered these steps in my [previous post](/2013/01/28/dev-ops-with-vagrant-and-chef.html)).

{% highlight bash %}
$ vagrant box add 'CentOS-6.3-x86_64' 'CentOS-6.3-x86_64.box'
{% endhighlight %}

We're just left to initialise the box, add recipes and boot it. Job done.

{% highlight bash %}
$ vagrant init 'CentOS-6.3-x86_64'
$ vagrant up
$ vagrant ssh
{% endhighlight %}


