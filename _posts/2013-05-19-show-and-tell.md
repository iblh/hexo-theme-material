---
layout: post
title: "Show and Tell"
location: "San Francisco, CA"
image: headers/california_mozy.jpg
color: 1c3982
---

{{ page.title }}
================

Since I've been looking for things to write about, thought I'd share some recent dev. If you pick up on any [code smell][], please [fork me][] and send a pull request. That would probably make my day.

[code smell]: http://en.wikipedia.org/wiki/Code_smell "It might do"
[fork me]: https://github.com/MozMorris "It would make my day"

pageShow
--------

Firstly, [here's pageShow](/pageShow/). It's a cross between an infinite carousel and a slideshow presentation. The slides in this case are web pages that follow a particular markup pattern. It's still a work-in-progress and I'd like to add a few more features such as page history handling. It currently only updates the browser history, but doesn't handle browser back/forward navigation.

It works by utilising jQuery's `load` method; the previous & next slides are requested via ajax and inserted into containers off screen. After pageShow has moved to the next or previous slide, the ajax loading occurs again. This time, a single page will be loaded off screen, replacing either the previous or next slide depending on the direction of navigation.

The basic markup pattern:

{% highlight html %}
<div id="slides-wrapper">

  <div class="slide" id="prev-slide">
    <!-- Previous slide loaded here -->
  </div>

  <div class="slide" id="actv-slide">

    <!-- Content goes here -->
    <p>Hello World.</p>

    <!-- Previous & next slide urls. -->
    <div class="link-meta">
      <a href="index.html" class="prev">Previous</a>
      <a href="usage.html" class="next">Next</a>
    </div>

  </div>

  <div class="slide" id="next-slide">
    <!-- Next slide loaded here -->
  </div>

</div>
{% endhighlight %}

The previous/next slides to be preloaded are defined by the active slide. This avoids having to keep a JavaScript object of all the slides and their order. Of course, that approach is not necessarily a bad one. It just wasn't feasible when I initially built pageShow.

{% highlight html %}
  <!-- Links, these can be hidden -->
  <div class="link-meta">
    <a href="index.html" class="prev">Previous</a>
    <a href="usage.html" class="next">Next</a>
  </div>
{% endhighlight %}

It's worth having a play around with [the demo][] or checking out the code [on GitHub][] to fully grasp what's going on behind the scenes.

[the demo]: /pageShow/ "pageShow demo"
[on GitHub]: https://github.com/MozMorris/pageShow "Fork Me!"

A Simple Carousel
-----------------

[Checkout the demo](/this-is-my-carousel/)

It's not a plugin, it's not really even configurable, but I'm using it [more][more] and [more][and more]. Check out the [source][].

[more]: http://www.clipper-teas.com/ "I made this"
[and more]: http://www.commercialwashroomsltd.co.uk/ "I also made this"
[source]: https://github.com/MozMorris/this-is-my-carousel "I should make a light box script next, that would impress Paul Irish"

Cookie Monster
--------------

I built a WordPress plugin! The WordPress plugin is probably something like a right of passage. Look, [Paul Irish has one][paul]. I've been building web sites half my life and I've finally got my own one. What does it do? It displays a fixed cookie information bar at the bottom of a WP site. Style it as you please.

No demo, but more info on [GitHub][]. 

[paul]: https://github.com/paulirish/infinite-scroll "2133 stars and counting"
[GitHub]: https://github.com/MozMorris/cookie-monster "Moz Morris on GitHub"

Gzip your JavaScript on IIS 7
-----------------------------

Just recently I've been optimising a site that's running on IIS. It's not as bad as it sounds, honest. Well I was using the [server configs][] from [H5BP][] but dev tools was still reporting that the js was uncompressed. Here's the fix for the web.config:

[server configs]: https://github.com/h5bp/server-configs "HTML5 Boilerplate Server Configuration"
[H5BP]: https://github.com/h5bp "HTML5 Boilerplate"

{% highlight xml %}
  <?xml version="1.0" encoding="UTF-8"?>
  <configuration>
    <system.webServer>
      <staticContent>
        <remove fileExtension=".js" />
        <mimeMap fileExtension=".js" mimeType="text/javascript" />
      </staticContent>
    </system.webServer>
  </configuration>
{% endhighlight %}

CakePhp Expires Behaviour
-------------------------

Don't want to display records that are past their sell by date? [No problem][]. I rely on Cake to always execute this behaviour on finds. You probably shouldn't. Good bye.

[No problem]: https://gist.github.com/MozMorris/4755451
