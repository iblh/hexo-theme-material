---
layout: post
title: CakePHP 2 Facebook Authentication Handler
location: Southampton, England
image: headers/cricketers_arms.jpg
color: 426852
---

{{ page.title }}
================

**tldr:** [Fork it](https://github.com/MozMorris/FacebookAuthenticate-CakePhp-Authentication-Handler) on GitHub.

The purpose of the Facebook Authentication Handler is to provide Facebook Authentication for your CakePHP 2.0 or later based application. The handler has been built following Cake's recommended approach for building [custom authentication objects](http://book.cakephp.org/2.0/en/core-libraries/components/authentication.html?#creating-custom-authentication-objects "Authentication - CakePHP Cookbook v2.0.0 documentation) for use with the built in AuthComponent.

The handler itself is part a *FacebookAuth* plugin, though this just makes the handler easy to redistribute. Includes example configuration settings and a controller detailing a typical use case.

**Note** that though the handler stores the access token returned by Facebook, it **does not** provide a means to makes requests to the Graph API. It's function is to provide authentication. Of course, you could use the access token and your preferred method to communicate with Facebook.
