---
layout: post
title: CakePHP 2 Yahoo Placefinder Datasource
location: Southampton, England
image: headers/sf_china_town.jpg
color: b68e57
---

{{ page.title }}
================

**tldr:** [Fork it](https://github.com/MozMorris/YahooPlaceFinder-CakePhp-DataSource "YahooPlaceFinder - CakePhp Yahoo PlaceFinder Datasource") on GitHub.

Need the coordinates of a location anywhere on Earth? Or how about the place name of any coordinates you provide? The Yahoo PlaceFinder datasource provides a familiar CakePhp interface for interacting with the Yahoo API.

Typical usage looks like this:

{% highlight php %}
<?php
$results = $this->Location->find('all', array(
  'conditions' => array(
    'location' => $this->request->data['Location']['location'],
    'flags'    => 'JE',
    'gflags'   => 'ACR',
  )
));
?>
{% endhighlight %}

It's worth reading [Yahoo's docs](http://developer.yahoo.com/geo/placefinder/guide/requests.html) for the request parameters.
