---
layout: post
title: Configure PostgreSQL to accept TCP/IP connections
location: Southampton, England
image: headers/montmartre_graffiti.jpg
color: 9e1a47
---

{{ page.title }}
================

**Stack:** MacPorts PostgreSQL 9.x on OS X 10.6 (Snow Leopard)

After switching to a new Mac, I didn't have time to reinstall and setup PostgreSQL. I decided to access PostgreSQL on my old machine over the network. When I tried to connect, I hit the following error:

{% highlight bash %}
psql: could not connect to server: Connection refused
Is the server running on host "192.168.0.6" and accepting TCP/IP connections on port 5432?
{% endhighlight %}

Well, it was running but obviously not accepting connections. Let's change that.

Get some superuser privileges and find the location of **pg_hba.conf** (Client Authentication Configuration File)

{% highlight bash %}
$ sudo -s
$ find / -type f -name "pg_hba.conf"
{% endhighlight %}

Change directory to where it's located and edit:

{% highlight bash %}
$ cd /opt/local/var/db/postgresql90/defaultdb/
$ vim pg_hba.conf
{% endhighlight %}

Add the following line where x.x.x.x is the ip address of the client machine:

{% highlight bash %}
host all all x.x.x.x/24 trust
{% endhighlight %}

Now edit postgresql.conf (PostgreSQL configuration) that's located in the same directory.

{% highlight bash %}
$ vim postgresql.conf
{% endhighlight %}

Wildcard the listen address:

{% highlight bash %}
listen_addresses = '*'
{% endhighlight %}

Restart PostgreSQL and try connecting again from the client machine.
