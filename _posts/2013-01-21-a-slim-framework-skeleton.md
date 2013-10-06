---
layout: post
title: "A Slim Skeleton"
location: Southampton, England
image: headers/bath_street_snow.jpg
color: 712235
---

{{ page.title }}
================

**tldr:** Built a Slim skeleton app. [Fork it on GitHub.](https://github.com/MozMorris/slim-skeleton)


Thought I'd give the [Slim](http://www.slimframework.com/) framework a whirl for a recent app. It's heavily inspired by [Sinatra](http://www.sinatrarb.com/), which is a good thing. Like Sinatra, it doesn't impose any kind of structure on your code. Also a good thing, though it's still good practice to establish some order early in our app's lifecycle. With that in mind, I created a somewhat opinionated Slim skeleton app. It uses [my own fork](https://github.com/MozMorris/Slim/tree/webroot) of the Slim framework, [Twig](http://twig.sensiolabs.org/) for templating and [Sass](http://sass-lang.com/) for stylesheets.

The structure looks like this:

{% highlight bash %}
|-app
|---views
|-----layout
|-public
|---css
|---img
|---js
|---sass
{% endhighlight %}

Key points:

* The `public` folder is where all publicly accessible files live
* Routing is handled by `public/index.php` just as you would expect for a Slim application
* The `bootstrap.php` takes care of includes and starting the session
* View & layout templates live under `app/views`

## Slim & Rewrites

The fork of Slim allows you to use rewrites to route requests to a sub-folder whilst maintaining URLs that don't include the sub-folder's name. This method is supported by all of the other frameworks I've used. A little surprising then that Slim doesn't support this particular approach.

The app is set up so that we can point Apache at the root folder and with some .htaccess rewrites, all requests will be sent to the /public/ folder. I like this. It's useful when I'm deploying to an environment where the document root can't be changed or perhaps I'm looking to keep the web root as tidy as possible.

## Twig

I like the [Django](https://www.djangoproject.com/) template language and Twig is really similar. An easy choice really.

## Sass

Sass is awesome. It's even better with [Compass](http://compass-style.org/). The skeleton is ready to go with both.


