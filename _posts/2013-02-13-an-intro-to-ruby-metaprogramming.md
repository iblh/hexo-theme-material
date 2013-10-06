---
layout: post
title: "An Intro to Ruby Metaprogramming"
location: Southampton, England
image: headers/indy_scooter.jpg
color: b57a3b
---

{{ page.title }}
================

I've been reading [the poignant guide](http://mislav.uniqpath.com/poignant-guide/) of late. I remember giving it a go some time back but it didn't really click with me then. I'm not the biggest fan of reading technical books on hand-held electronic devices. Actually, it just seems to be a problem with the way codeblocks render on them. But the eBook on the iPad is alright as it's fairly concise. That's enough Apple endorsements already, on with the good stuff. I reach [chapter six](http://mislav.uniqpath.com/poignant-guide/book/chapter-6.html) with its metaprogramming goodness and after reading it through a couple of times, I got the concept. But there were some lines of code that hadn't quite sunk in. So I decided to dig a little deeper and hopefully this post will provide an introduction to my learnings.

## What is Metaprogramming and Why Use it?

There's a long winded (but no doubt accurate) [metaprogramming definition](http://en.wikipedia.org/wiki/Metaprogramming) on Wikipedia. Here's a much shorter, albeit Ruby specific one: 

Ruby Metaprogramming is the writing of code that alters language constructs at runtime.

That's pretty short but it's not exactly plain English. What it's saying is, metaprogramming is *writing code that writes code*. That almost sounds like something from a science fiction movie. If that's not a good enough reason to start metaprogramming then perhaps this next one will be. 

Metaprogramming results in writing less code.

## You're already using it...

Even if you're relatively new to Ruby, you've probably been using the `attr_accessor` method. Take at look at this *Beer* class.

{% highlight ruby %}
class Beer
  attr_accessor :name, :origin, :strength

  def initialize(name, origin, strength)
    @name = name
    @origin = origin
    @strength = strength
  end
end
{% endhighlight %}

Look familiar? Under the hood, there's some meta going on here. The `attr_acessor` method creates instance variables `@name`, `@origin`, and `@strength`. It also generates corresponding methods to read and write the attributes. As a result, our code base is kept [DRY](http://en.wikipedia.org/wiki/Don't_repeat_yourself).

At runtime, our *Beer* class ends up looking something like this:

{% highlight ruby %}
class Beer
  def initialize(name, origin, strength)
    @name = name
    @origin = origin
    @strength = strength
  end

  def name= val
    @name = val
  end

  def name
    @name
  end

  def origin= val
    @origin = val
  end

  def origin
    @origin
  end

  def strength= val
    @origin = val
  end

  def strength
    @origin
  end
end
{% endhighlight %}

So we've ended up with 30 lines of code, but only written 9 of them. Awesome. Let's do some of our own meta then.

## Beer Brewing

This example is probably somewhat contrived but the purpose here is to give you an idea of what's possible in Ruby. Kind of planting the seed as it were.

{% highlight ruby %}
class Brewery
  # start the meta machine
  def self.ingredients(*arr)
    return nil if arr.empty?

    arr.each do |i|
      # friendly ingredient string
      s = i.to_s.gsub(/[^a-z\s]/, '')

      define_method("#{i}?") do
        @stock ||= {}
        # check & print stock level
        if @stock[i]
          "We've got #{@stock[i]} units of #{s} in stock."
        else
          "We're out of #{s}!"
        end
      end

      define_method("add_#{i}") do |val|
        @stock ||= {}
        # add ingredient to stock
        @stock[i] = val
      end
    end
  end
end

class BrewDog < Brewery
  ingredients :water, :malt, :hops, :yeast
end
{% endhighlight %}

Hopefully our brewery explains itself but just in case, here's a breakdown of the meta part. 

The `BrewDog` class inherits from the `Brewery` class and calls Brewery's `ingredients` class method. This iterates over the ingredients, and for each one creates two instance methods using `define_method`. The first returns the current stock level for that ingredient. The second adds stock for it.

{% highlight ruby %}
b = BrewDog.new   #=> #<BrewDog:0x007fafdcb83308>
b.hops?           #=> "We're out of hops!"
b.add_hops 50     #=> 50
b.hops?           #=> "We've got 50 units of hops in stock."
{% endhighlight %}

As well as writing less code, this method also provides some flexibility. For example, what if our next brewery wanted to stock an ingredient other than water, malt, hops or yeast? No problem:

{% highlight ruby %}
class FostersGroup < Brewery
  ingredients :tap_water, :cheap_malt, :mouldy_hops, :industrial_yeast
end

f = FostersGroup.new   #=> #<FostersGroup:0x007f83b31e1d90>
f.add_mouldy_hops 80   #=> 80
f.mouldy_hops?         #=> "We've got 80 units of mouldy hops in stock."
{% endhighlight %}

Luckily for the brewers of that well known Australian brand larger, we can accommodate their inferior product and brewing practices. Perhaps in this case meta's not so great ;-]

## Beer Drinking

I've barely scratched the surface with what's possible but hopefully this has been a good starting point. The rabbit hole goes a whole lot deeper once we start looking at metaclasses and Ruby's object model, but perhaps I'll leave that for another post.

The following resources are very much worth checking out.

* [define_method()](http://www.ruby-doc.org/core-1.9.3/Module.html#method-i-define_method)
* [Metaprogramming in Ruby](http://ruby-metaprogramming.rubylearning.com/)
* [Chapter 6, The Poignant Guide](http://mislav.uniqpath.com/poignant-guide/book/chapter-6.html)

And for the beer connoisseurs.

* [BrewDog Brewery](http://www.brewdog.com/)
