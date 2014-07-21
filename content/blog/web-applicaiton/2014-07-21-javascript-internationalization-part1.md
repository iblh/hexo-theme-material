Title: Javascript localization part 1
Author: iocast
Date: 2014-07-21
Summary: Since the first edition of ECMAScript (ECMA-402) Javascript supports the output of language sensitive representation of a Date or Number object which is often overseen by many developers.
Category: Web Application
Tags: centos, server, apache, httpd, python
Slug: javascript-internationalization-part1


Take some seconds and thing about how you represent a date or number. Do you convert the object to a string and slices it at the needed position? Or do you extend the Date class and adds some new output representation functionality.

Since the ECMA-402 Standard, published on December 2012, you have some really great new functions which respects the locale settings of your environment.

Okey, lets take a step back. When I was working on my semantic web library calendar web component I searched for a way to represent a Date object inside the DOM tree in different way. One question was is how to represent a Date object in the format  ```mmmm yyyy``` or ```mm/dd/yyyy```. So I began to search for examples in the web and many entries dated back to 2009, 2010 and 2011. Some of them were also from 2013, which we really astound. Nonetheless, all answers had once thing in common. They put each component of the representation manually inside a string.

	:::javasript
	var dateobj= new Date() 
	dateobj.getDate() + "/" + dateobj.getMonth()+1 + "/" + dateobj.getFullYear()
	// 21/7/2014

or

	:::javascript
	Date.locale = {
		en: {
			month_names: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
			month_names_short: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
		}
	};
	
	Date.prototype.getMonthName = function(lang) {
		lang = lang && (lang in Date.locale) ? lang : 'en';
		return Date.locale[lang].month_names[this.getMonth()];
	};
	Date.prototype.getMonthNameShort = function(lang) {
		lang = lang && (lang in Date.locale) ? lang : 'en';
		return Date.locale[lang].month_names_short[this.getMonth()];
	};
	
	// that can be used as follow:
	var now = new Date();
	now.getMonthNameShort + " " + now.getFullYear();
	// July 2014

The problem you have with these solutions is that they not respect the language sensitive representation of a Date or Number object.

The solution for this is quite simple. Javascript now provides different functions which respect the locale settings of the environment.

For the ```Date``` object now have these functions, whereas I personally prefer the ```toLocaleString()```

Function                             | Purpose
:------------------------------------|:----------------------------------------
Date.prototype.toLocaleDateString()  | returns a string with a language sensitive representation of the date portion of this date.
Date.prototype.toLocaleString()      | returns a string with a language sensitive representation of this date.
Date.prototype.toLocaleTimeString()  | returns a string with a language sensitive representation of the time portion of this date.

You can use it as follow

	:::javascript
	var now = new Date()
	date.toLocaleString('en', { month: 'long', year: 'numeric' });
	// July 2014
	date.toLocaleString('en', { month: '2-digit', day: '2-digit', year: 'numberic' });
	// 21/07/2014

where the first parameter is the ```locale``` and the second parameter represents the ```options```. The allowed options can be found on the [Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString). As you can see in the example the main advantage is that you do need to worry about the representation of the date format in the different languages and that you do not need to add manually a leading zero if necessary.

The same applies to the ```Number``` object.

Function                             | Purpose
:------------------------------------|:----------------------------------------
Number.prototype.toLocaleString()    |  returns a string with a language sensitive representation of this number.

You can use it as follow

	:::javascript
	var number = 3600;
	number.toLocaleString('en');
	// 3,600
	number.toLocaleString('de');
	// 3.600
	number.toLocaleString('en', {
		style: 'currency',
		currency: 'USD'
	});
	// $3,600

