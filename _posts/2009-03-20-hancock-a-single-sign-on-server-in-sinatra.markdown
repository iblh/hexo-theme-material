--- 
layout: post
title: "Hancock : A Single Sign On Server in Sinatra"
---

A while back I blogged about the <a href="http://github.com/atmos/flatirons">flatirons</a> <a href="http://openid.net">openid</a> provider and how it was inspired by something we were doing at Engine Yard.  We needed a single sign on provider and chose to use OpenID as the sso protocol.  Since this is heavily influenced by openid I will often use the word "<strong>provider</strong>" to describe an SSO server.  I also use the word "<strong>consumer</strong>" to describe an SSO enabled application.

So we pretty much drew up a diagram of how openid works and removed the steps we felt were unnecessary(decision/acceptance steps).  We then extended it by adding auto discovery of the openid url.  Here's a somewhat up to date diagram that shows off how things work.  You'll notice that the user-agent(browser) never specifies its identity url, it's automatically provided from the SSO server. 

<img src="http://img.skitch.com/20090305-be6wwmbc4gfsi9euy3w7np31mm.jpg" alt="hancock sso handshake" height="500px" width="475px" />

I'm pleased to announce a new piece of software that might interest you if you need a single sign on solution for your projects.  It's called <a href="http://github.com/atmos/hancock">hancock</a> and it's available(like all good things) on <a href="http://github.com">github</a>.  Here's a quick run down of what it offers you:
<ul>	<li>a rubygem that provides all the functionality you need for an sso server</li>
	<li>an sso server as an extendable sinatra app, aka rack middleware</li>
	<li>a required whitelist for consumer application access</li>
	<li>configurable sreg response parameters to customize what information is exposed to clients</li>
	<li>can hook into anything that <a href="http://datamapper.org">datamapper</a> supports as a user/consumer store.</li>
	<li>trivial deployment as a rack application under passenger</li>
	<li>simple user signup with email verification</li>
        <li>application sessions don't overlap by using .domain.com style cookies</li>
</ul>

This is all implemented in about 400 lines of ruby code using the <a href="http://sinatrarb.com">sinatra</a> framework.  With the release of Sinatra 0.9.1.1 programmers can write sinatra applications in a more modular fashion.  The killer feature is that these modular applications are actually <a href="http://github.com/chneukirchen/rack/tree/master">rack</a> applications.  This allows for services to be written in sinatra that can be deployed as either a standalone rack application or used as middleware in frameworks like merb or rails.  Hancock is an example standalone rack application.  I'll be blogging about sinatra as middleware in the days to come.

Hancock requires that you provide atleast three things to get it going.  This is normally provided in your rackup file.
<ul>
	<li>database connection info, specifically the <a href="http://datamapper.org/doku.php?id=getting_started_with_datamapper#specify_your_database_connection">datamapper connect string</a></li>
	<li>mailer info</li>
	<li>a custom layout file</li>
</ul>

Hancock assumes that you're going to provide the layout that gives your site its customized look and feel.  The hancock gem itself provides all of the forms for authentication.  If you're going to be serving static assets like images, stylesheets, or javascript files you'll also need to set the public attribute.  Here's what my rackup file looks like on my server.

<script src="http://gist.github.com/82625.js"></script>

That's your whole app.

The Hancock gem provides a sinatra application as a class named <strong>Hancock::App</strong>.  You should inherit from this class and implement a landing page at "<strong>/</strong>".  The mailer configuration functions a lot like the merb-mailer gem, if you're having issues google around for merb-mailer help.

The Hancock gem also provides a class named <strong>Hancock::Consumer</strong> that represents a consumer application that is to be accepted by your hancock application.  The <strong>:url</strong> attribute MUST match up to the return_to parameter in the openid negotiation.  If you're using the <a href="http://github.com/atmos/hancock-client">hancock-client</a> gem then it should take care of this for you.  The main thing to remember about this class is that if you ever receive the <strong>Forbidden</strong> message on your SSO provider you should double check that the host is allowed to access the provider.

Your user model is exposed as <strong>Hancock::User</strong>.  Right now there is simple sign up through web forms.  If you want to test the provider without setting up the full email configuration then you should run your application in development mode.  When run under development mode the registration url that would normally be sent via email is embedded as a comment.  I found that it made it really easy to test.

The Hancock gem doesn't have perfect tests, but I'll be damned if we aren't shooting for it.  You'll find both unit and acceptance tests done in <a href="http://rspec.info">rspec</a>, <a href="http://github.com/brynary/rack-test">rack-test</a>, <a href="http://github.com/brynary/webrat">webrat</a>, and <a href="http://github.com/aslakhellesoy/cucumber">cucumber</a>.  Even if you're not interested in an SSO server the tests might help clarify a few things if you're a testing junkie.

As I mentioned earlier, the killer feature of sinatra 0.9.1.1 is that sinatra apps are modular rack applications.  While hancock is a pretty cool example of the power and simplicity of sinatra; its use as middleware in other frameworks is where I expect to see sinatra shine for the foreseeable future.  Even if you're stuck on a never ending rails project with no chance of innovation in sight, go learn about rack.  I think you'll be surprised where you can start leveraging it.  Besides, writing sinatra is <strong>fun</strong>.

So what good is a simple SSO server if you don't have a super simple client library?  I bet if we did it as a <a href="http://github.com/atmos/hancock-client">simple sinatra app</a> then we could turn it into middleware.  Then we could hook our <a href="http://github.com/atmos/hancock-client-rails">rails</a> and <a href="http://github.com/atmos/hancock-client-merb">merb</a> apps up.  Yeah, that'd be sweet.

I'm gonna follow this up in the next few days with something covering the <a href="http://github.com/atmos/hancock-client">hancock-client</a> gem.  This gem provides a sinatra application that can be run standalone or as middleware in other apps.  I'll prolly follow that up with two short articles on "how you get your middleware running in (rails|merb)."  

