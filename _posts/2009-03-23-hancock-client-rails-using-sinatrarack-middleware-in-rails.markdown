--- 
layout: post
title: "Hancock-Client-Rails: Works with Rails > 2.3.x"
---

Recently I've been writing a bunch about <a href="http://sinatrarb.com">sinatra</a> as middleware and one of the things you always hear people glorifying is how rack middleware can be dropped into any framework that's built on rack.  Since I'm trying to get people to try <a href="http://github.com/atmos/hancock">hancock</a> out, or atleast learn something from it, I figured I should investigate how you actually use the <a href="http://github.com/atmos/hancock-client">hancock-client</a> sinatra app inside off rails 2.3.2.

One of the examples I've seen in quite a few presentations on using middleware in rack has something along the lines of:

<img src="http://img.skitch.com/20090323-m4hba3yiqxdsupf389t8fxt4i3.jpg" alt="middleware" />

Unfortunately, I've yet to get a sample like this working with sinatra middleware.  For some reason sinatra always throws 404 errors instead of allowing those requests to pass through to rails.  Even if I set "disable :raise_errors" in my sinatra app, it'd still throw 404s.  So after a little googling I discovered a wonderful write up over at the <a href="http://guides.rubyonrails.org/rails_on_rack.html">rails on rack</a> page.  I definitely learned a lot about how rails middleware works but I still couldn't get my sinatra app functioning properly inside of rails.

I was kind of surprised to find out that there was very little documentation on using sinatra as middleware.  Sinatra is awesome for this, how could I be the first person trying to do this?  It turns out that I wasn't. :)  <a href="http://blog.ra66i.org/">Raggi</a> had explained how to do this to someone in #rack on freenode a few days earlier.  I looked through his <a href="http://gist.github.com/81199">gist on how he did it</a>.  I didn't understand it all but I hadn't tried using the metal generator that rails introduced recently.  So I gave that a try and ended up with a piece of rails metal that looks like this.

<img src="http://img.skitch.com/20090323-bw211t8spchuk6hu6tmxp7qu94.jpg" alt="hancock metal" />

This actually worked perfectly for me.  All I needed to do was make a subclass of Hancock::Client::Default and set the appropriate configuration options.  Next I gave myself a little helper in application.rb to check whether I was logged in or not, you've probably done something like this in every other app you've ever used.

<img src="http://img.skitch.com/20090323-d1qrceyie3xme7ktf54sqccd28.jpg" alt="logged_in helper" />

Then there's a simple controller that should be protected by the SSO middleware.

<img src="http://img.skitch.com/20090323-nhhtb1wb9j6b6xb38b25347b6b.jpg" alt="protected controller action" />

That's pretty much it, hopefully this will save you some time.  One thing that I've noticed in trying to make this work with the larger frameworks is that I really want some sort of implicit before filter.  I'd really like to have the redirect to '/sso/login' happen anytime an unauthenticated request comes in,  I'll try to get that working in the next release.

I've created an <a href="http://github.com/atmos/hancock-client-rails">example application</a> that I'm hoping to keep up to date as hancock grows.  There are git tags that match up to a hancock release number as well.  If you want to see a rails client in action you can run "rake features" inside of the hancock-client-rails application.  You'll need to be on a mac due to the <a href="http://github.com/redsquirrel/safariwatir/tree/master">safariwatir</a> constraint but it should drive your browser and complete a full handshake against the <a href="http://hancock.atmos.org">hancock sso sandbox</a>.



