---
layout: post
title: "Using Jekyll with GitHub Pages Or: How I Built This Blog"
location: Southampton, England
image: headers/pamplona_people.jpg
color: f11224
---

{{ page.title }}
================

*Updated 08/06/2013 to reflect changes in Jekyll 1.0.0*

**tldr:** This site was built using Jekyll. [Fork/Clone it on GitHub.](https://github.com/MozMorris/mozmorris.github.com)

I'd been looking to ditch WordPress as the back-end for this site for a while. It seemed overkill and I'm no longer interested in hosting comments - who wants to moderate (and host) spam anyway? Switching to [Jekyll](http://jekyllrb.com/) offered the chance to learn and hack something new over the holiday period. As an added extra, it meant I could host the site on [GitHub Pages](http://pages.github.com/) and it would be automatically updated when I pushed my commits.

BTW, if you really need to ask me something, just email.

## What is Jekyll?

Jekyll is a static site generator similar to [Middleman](https://github.com/middleman/middleman) (Ruby) or [Hyde](https://github.com/hyde/hyde) (Python). It was created by GitHub founder Tom Preston-Werner and is now [maintained & enhanced](https://github.com/mojombo/jekyll/pulls) by many of its users.

## Building It

**First** things first, I installed the Jekyll RubyGem. I also grabbed the `rdiscount` gem so I could use the [RDiscount](http://github.com/rtomayko/rdiscount/tree/master) flavour of Markdown.

{% highlight bash %}
$ gem install jekyll
$ gem install rdiscount
{% endhighlight %}

FWIW, if you're intending to use Textile you'll need the [RedCloth](http://redcloth.org/) gem installed: `gem install RedCloth`

**Next up** I cloned [Tom's site](http://tom.preston-werner.com/) as a starting point and ripped out his posts. I swapped out the markup and styling for my own. I changed some references to tom.preston-werner.com to www.mozmorris.com, removed the .git folder & initialized it, then started the server.

{% highlight bash %}
$ git clone git://github.com/mojombo/mojombo.github.com.git  mozmorris.github.com
$ cd mozmorris.github.com
$ rm -rf .git
$ git init
$ jekyll serve
{% endhighlight %}

**Visited** `http://localhost:4000` in my browser and there it was was. In ~10 minutes I had the bare bones of a new site.

For **syntax highlighting** Jekyll supports [Pygments](http://pygments.org/) and you'll need to install the Pygments Python library. I've got the awesome [Pip](http://pypi.python.org/pypi/pip) package manager installed that means getting Pygments is a 2 second job.

{% highlight bash %}
$ pip install pygments
{% endhighlight %}

The built in style classes are decent enough but I really like the [Tomorrow](https://github.com/chriskempson/tomorrow-theme) colour themes. A Google for "tomorrow theme pygments" didn't yield anything useful so I decided to hack together my own style classes. I've created a [repository on GitHub](https://github.com/MozMorris/tomorrow-pygments) containing the resulting Python code.

And that was pretty much the build done.

## Import Old Posts

Jekyll has some handy [migration tools](https://github.com/mojombo/jekyll/wiki/blog-migrations) that meant that I could swiftly import my old posts from WordPress.

The command goes something like this:

{% highlight bash %}
$ ruby -rubygems -e 'require "jekyll/migrators/wordpress"; Jekyll::WordPress.process("database", "user", "password")'
{% endhighlight %}

I ditched a few posts that were now redundant and cleaned up the markdown of the ones I'd decided to keep.

## Deployment

I created a new GitHub repos using the `username/username.github.com` naming scheme, committed & pushed my files and then within 10 minutes the site was running at [mozmorris.github.com](http://mozmorris.github.com). On subsequent pushes the site is updated immediately.

I added a `CNAME` file to the repository root that means I can use a custom URL - awesome! GitHub handles the hosting, I get to use my own domain.








