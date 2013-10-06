--- 
layout: post
title: "Hancock-Client : Sinatra Middleware"
---

With the release of <a href="http://sinatrarb.com">sinatra</a> version 0.9.1, programmers have the option to write micro-apps that double as middleware in any other <a href="http://github.com/chneukirchen/rack/tree/master">rack</a> enabled application.  The beauty in this is that you can write rack middleware without getting bogged down in the details of writing rack directly.  Perhaps it's your first time leveraging rack and you want to test the waters or perhaps you're just wanting to slap a little bit of functionality onto someone else's code; sinatra is emerging as a great way for folks to start really sinking their teeth into how rack functions.

I recently found myself waist-deep in rack.  A lot of my co-workers at <a href="http://engineyard.com">EY</a> have been telling me for some time where rack made sense and where it didn't.  I didn't really grasp it all.  I understood it as a concept but there was nothing in my day to day work that made me say "Hey!  I'm gonna use rack here!"  At least until the other day.  <a href="http://mwrc2009.confreaks.com/13-mar-2009-11-05-in-a-world-of-middleware-who-needs-monolithic-applications-jon-crosby.html">Jon Crosby rocked out with a great talk at MWRC</a> and one of <a href="http://github.com/abcde">my friends at work</a> had written a little sinatra app that we needed to merge into our Single Sign On(SSO) infrastructure.  <a href="http://github.com/halorgium">Tim</a> took advantage of an existing rack <a href="http://openid.net">openid</a> library and made the necessary modifications to hook it in cleanly, he then went on vacation and left the gem abstraction to me.  I'm really grateful for this because it really made me sit down and acquaint myself with sinatra.  What I found was something pleasurable, elegant, and useful.

The <a href="http://github.com/atmos/hancock-client">hancock-client</a> gem is an abstraction of our rack based SSO middleware in use at Engine Yard but modified to communicate with the <a href="http://github.com/atmos/hancock/">hancock sso server</a>.  The gem provides a sinatra application that can be run as a standalone application or used as middleware in <a href="http://rubyonrails.org">rails</a> or <a href="http://merbivore.org">merb</a>.  The application itself encompasses all of the logic required to negotiate the SSO protocol with a provider and populate session variables.  You can pretty much expect that the sinatra app provided by the hancock-client gem will integrate well with a hancock provider of the same version.

So when I started trying to get the middleware going I decided on three things that were necessary for it:
<ul>
	<li>you need to be able to login</li>
	<li>you need to be able to logout</li>
	<li>after you login you should be greeted</li>
</ul>

This makes sense for the simplest possible consumer that does something useful.  The <strong>login</strong> and <strong>logout</strong> actions are mapped to <strong>/sso/login</strong> and <strong>/sso/logout</strong> respectively.  Does the "after you login you should be greeted" step really make sense for middleware though?  I feel like the answer is no in this situation and it's where the beauty of rack really comes to light.  Since my code shares the same rack session that my framework code will share, maybe I should leave that greeting page up to the app that's using the middleware.

<img src="http://img.skitch.com/20090323-b69yget8ijmcs35ys8eqmsd1y4.jpg" alt="Middleware" />

The SSO middleware handles the authentication earlier in the stack than your framework and all you need to do is rely on a set of conventions that the middleware provides to the framework layer.  In the case of hancock-client it sets the <strong>:user_id</strong> session variable.  Depending on your middleware ordering this happens way before your framework is hit.  The basic approach for the initial release of hancock-client went something like this, "only implement login and logout but provide examples of how you might use it in your framework of choice." 

What we created was a class that inherited from <strong>Sinatra::Default</strong> called <strong>Hancock::Client::Default</strong>.  This class was created with the idea that an application developer would inherit from it and implement the greeting page at "<strong>/</strong>".  So in its simplest form you can implement a hancock-client app in the following fashion:

<script src="http://gist.github.com/83061.js"></script>

Notice how the middleware can be extended to support requests to <strong>/</strong> in sinatra with ease and you can simply let those requests pass through in frameworks that implement them at a higher level.

Notice the usage of the configuration option <strong>sso_url</strong>.  You need to set this to the url of your SSO server.  If you ever need to reference this in the markup it's available as <strong>options.sso_url</strong>.  

If you're using this as middleware in other frameworks you'll have to make sure that you set <strong>disable :raise_errors</strong> on your <strong>Hancock::Client::Default</strong> subclass.  Otherwise you'll get 404s and that's kind of annoying.  Checkout <a href="http://blog.ra66i.org/">raggi</a>'s <a href="http://gist.github.com/81199">gist</a> too.

Believe it or not, the standalone sinatra apps are hella useful.  I love when we want to try out some new 3rd party application that offers remote authentication and we can hook the two apps up with a simple sinatra app in no time.  Seriously, <strong>do not disregard sinatra</strong> as a possible solution because you think you might need big feature X in framework Y.  Maybe you shouldn't extend that monolith app that's getting more complex by the day.  Maybe some micro-apps will be just what the doctor ordered. I might be crazy or living some sheltered developer lifestyle, but it is a pleasure to write sinatra code. 

If you investigate the tests in hancock-client you'll find that there aren't many unit tests.  I think there's 2 and one is currently pending.  If you checkout the cucumber tests though you'll find <a href="http://safariwatir.rubyforge.org/">safariwatir</a> tests that drive your browser and test against the <a href="http://hancock.atmos.org">hancock sso sandbox</a>.  All you need to do is investigate the <strong><a href="http://github.com/atmos/hancock-client/blob/master/examples/dragon/config.ru">examples/dragon</a></strong> directory in hancock-client and run the following command.

<code>% rackup -p 4567 config.ru</code>

In another terminal you should be able to run the following:

<code>% rake features</code>

A browser should appear, you should see that you successfully signed up for an SSO account, and that your consumer application has access to a few session variables.  I chose safariwatir in this case because it allowed me to blackbox test the appserver and I chose cucumber because I was pretty sure I could copy this functionality over to merb and rails as I created examples for those frameworks.  If you're on a mac, please try to run these specs and let me know if they work for you.

One thing that I'm really hoping to handle in the next release is the ability to make the SSO before filters in rails/merb a thing of the past.  I actually need to get the merb example working...  If any of this interests you, you're welcome to fork my projects on github or hook me up with patches.

