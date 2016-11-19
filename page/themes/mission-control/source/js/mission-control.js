var App = function() {
	var	pages = document.querySelector('.pages');
		info = document.querySelector('.pages-info'),
		filters = Array.prototype.slice.call(document.querySelectorAll('.filter-element')),
		hamburger = document.querySelector('.hamburger-icon'),
		hammertime = Hammer(pages, {}),
		index = 0;


	var cache = {
		ui: {
			timer: null,
			lastExecThrottle: 25,
			lastExec: new Date()
		}
	};


	function navigation() {
		function moveTo(idx, options) {
			var options = options || {};

			Array.prototype.slice.call(info.querySelectorAll('.active')).forEach(function(ele, i) {
				ele.classList.remove('active');
			});

			var correction = 100;
			if(pages.classList.contains('small')) {
				correction = 25;
			}

			TweenLite.to([pages, info], 0.75, {
				left: (idx * -correction) +"vw",
				ease: Power4.easeInOut,
				onComplete: function() {
					index = idx;
					if('onComplete' in options) {
						options.onComplete();
					}
					info.children[idx].classList.add('active');
				}
			});


			index = idx;
			window.location.hash = pages.children[index].dataset.id;
		}
		function moveLeft() {
			if(index > 0) {
				Array.prototype.slice.call(info.querySelectorAll('.active')).forEach(function(ele, i) {
					ele.classList.remove('active');
				});

				this.moveTo(index - 1, {
					onComplete: function() {
						info.children[index].classList.add('active');
						window.location.hash = pages.children[index].dataset.id;
					}
				});
			}
		}
		function moveRight() {
			if(index < (pages.children.length-1)) {
				Array.prototype.slice.call(info.querySelectorAll('.active')).forEach(function(ele, i) {
					ele.classList.remove('active');
				});

				this.moveTo(index + 1, {
					onComplete: function() {
						info.children[index].classList.add('active');
						window.location.hash = pages.children[index].dataset.id;
					}
				});
			}
		}
		function hideMenu() {
			if(pages.classList.contains('small')) {

				TweenLite.to(pages, 0.75, {
					scale: 1,
					x: 0,
					y: 0,
					left: (-index*100) + "vw",
					ease: Power4.easeInOut,
					onComplete: function() {
						pages.classList.remove('small');
					}
				});
				TweenLite.to(pages.children, 0.75, {
					css: {
						className: '-=inactive'
					}
				});

				TweenLite.to(document.querySelector('.filter-activity'), 0.5, {
					left: (-320 / 2 + 25) + 'px',
					width: '45px',
					ease: Power4.easeInOut
				});
				filters.forEach(function(ele, i) {
					ele.classList.remove('active');
				});
				filters[0].classList.add('active');

				hamburger.classList.remove('active');

				window.location.hash = pages.children[index].dataset.id;
			} else {
				throw "not implemented yet";
			}
		}
		function enter() {
			if(pages.classList.contains('small')) {
				hideMenu();
			}
		}
		function showMenu() {
			if(!pages.classList.contains('small')) {

				Array.prototype.slice.call(info.querySelectorAll('.active')).forEach(function(ele, i) {
					ele.classList.remove('active');
				});

				var newOffset = 0;
				var page = pages.querySelector(':first-child');
				newOffset = -(pages.children.length-1) * (page.clientWidth / 4 * 1.5);

				TweenLite.to(pages, 0.75, {
					scale: 0.25,
					x: newOffset,
					y: -50,
					left: (index * -25) + "vw",
					ease: Power4.easeInOut,
					onComplete: function() {
						pages.classList.add('small');
					}
				});

				TweenLite.to(info, 0.75, {
					x: page.clientWidth/4*1.5,
					left: (index * -25) + "vw",
					ease: Power4.easeInOut,
					onComplete: function() {
						info.children[index].classList.add('active');

					}
				});

				hamburger.classList.add('active');
			}
		}


		return {
			left: moveLeft,
			right: moveRight,
			down: hideMenu,
			up: showMenu,
			enter: enter,
			moveTo: moveTo
		}
	}

	var swipe = {
		pages: {
			start: 0
		},
		info: {
			start: 0,
		},
		start: function(event, options) {
			swipe.pages.start = parseInt(document.defaultView.getComputedStyle(pages).left) || 0;
			swipe.info.start = parseInt(document.defaultView.getComputedStyle(info).left) || 0;
			index = Math.ceil((parseInt(info.style.left) - info.children[0].offsetWidth / 2) / info.children[0].offsetWidth) * -1;
		},
		move: function(event, options) {
			var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
			var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
			pages.style.left = ((swipe.pages.start + event.deltaX) / w * 100) + "vw";
			info.style.left = ((swipe.pages.start + event.deltaX) / w * 100) + "vw";

			if(pages.classList.contains('small')) {
				var idx = Math.ceil((parseFloat(info.style.left) / 100 * w - info.children[0].offsetWidth / 2) / info.children[0].offsetWidth) * -1;

				if(idx < 0) {
					idx = 0;
				} else if(idx > info.children.length - 1) {
					idx = info.children.length-1;
				}

				if(index != idx) {
					Array.prototype.slice.call(info.querySelectorAll('.active')).forEach(function(ele, i) {
						ele.classList.remove('active');
					});
					info.children[idx].classList.add('active');
				}
				index = idx;

			} else {
				index = Math.ceil((parseInt(pages.style.left) / 100 * w - pages.children[0].offsetWidth / 2) / pages.children[0].offsetWidth) * -1;

				if(index < 0) {
					index = 0;
				} else if(index > pages.children.length - 1) {
					index = pages.children.length-1;
				}

			}
		},
		stop: function(event, options) {
			navigation().moveTo(index, options);
		}
	}

	var handlers = {
		moving: false,
		scroll: function(e) {
			/*
			e.preventDefault();
			e.stopPropagation();
			*/
			if(e.type === 'panstart') {
				handlers.moving = true;
				swipe.start(e);
			} else if(e.type === 'panleft' || e.type === 'panright') {
				//handlers.moving = true;
				if(handlers.moving) {
					swipe.move(e);
				}
			} else if(e.type === 'panend') {
				if(handlers.moving) {
					swipe.stop(e, {
						onComplete: function() {
							handlers.moving = false;
						}
					});
				}
			}
		},
		resize: function(evt) {
			if(!cache) return false;
			var d = new Date();
			if(d-cache.ui.lastExec < cache.ui.lastExecThrottle) {
				if(cache.ui.timer) {
					window.clearTimeout(cache.ui.timer);
				}
				cache.ui.timer = window.setTimeout(handlers.resize, cache.ui.lastExecThrottle);
				return false; // exit
			}
			cache.ui.lastExec = d; // update "last exec" time
			resize();
		}
	}

	function resize() {
		if(pages.classList.contains('small')) {
			var newOffset = 0;
			var page = pages.querySelector(':first-child');
			newOffset = -(pages.children.length-1) * (page.clientWidth / 4 * 1.5);

			TweenLite.set(pages, {
				x: newOffset,
			});

			TweenLite.set(info, {
				x: page.clientWidth/4*1.5
			});

		}
	}

	function filter(filter) {
		var filtered = Array.prototype.slice.call(pages.querySelectorAll('.page.inactive'));

		if(filter) {
			var allPages = Array.prototype.slice.call(pages.querySelectorAll('.page:not(.inactive)'));
			var inactivate = [];
			var activate = []

			allPages.forEach(function(page, i) {
				if(page.getAttribute('data-tags').split(',').indexOf(filter) == -1) {
					inactivate.push(page);
				}
			});
			filtered.forEach(function(page, i) {
				if(page.getAttribute('data-tags').split(',').indexOf(filter) > -1) {
					activate.push(page);
				}
			});

			TweenLite.to(activate, 0.75, {
				css: {
					className: '-=inactive'
				}
			});

			TweenLite.to(inactivate, 0.75, {
				css: {
					className: '+=inactive'
				}
			});

			return;
		}

		TweenLite.to(filtered, 0.75, {
			css: {
				className: '-=inactive'
			}
		});
	}


	var blog = {
		tagcloud : {
			origOffsetY: document.querySelector('.sticky').offsetTop,
			toggle: function(evt) {
				if(document.querySelector('article[data-id="blog"]').scrollTop > blog.tagcloud.origOffsetY) {
					if(!document.querySelector('.sticky').classList.contains('fixed')) {
						document.querySelector('.sticky').classList.add('fixed');
						blog.tagcloud.minimize();
					}
				} else {
					if(document.querySelector('.sticky').classList.contains('fixed')) {
						document.querySelector('.sticky').classList.remove('fixed');
						blog.tagcloud.maximize();
					}
				}
			},
			minimize: function() {
				var filtered = Array.prototype.slice.call(document.querySelectorAll('.tagcloud-item.active'));
				var inactive = Array.prototype.slice.call(document.querySelectorAll('.tagcloud-item:not(.active)'));

				TweenLite.set(inactive, {display: 'none'});

				/*
				var tl = new TimelineLite({delay:0.5, repeatDelay:1});

				for(i = 0; i < filtered.length; i++) {
  				tl.to(filtered[i], 0.5, {rotation:randomInteger(-6, 10), x:randomInteger(-2, 2), y:randomInteger(-4, 4)}, "sentence+=" + i * 0.3);
				}

				TweenLite.to(document.querySelector('.sticky'), 0.5, { height: 'auto' });
				*/
			},
			maximize: function() {
				var filtered = Array.prototype.slice.call(document.querySelectorAll('.tagcloud-item.active'));
				var inactive = Array.prototype.slice.call(document.querySelectorAll('.tagcloud-item:not(.active)'));

				TweenLite.set(inactive, {display: 'inline-block'});
				/*
				TweenLite.to(document.querySelector('.sticky'), 0.5, { height: 'auto' });
				*/
			}
		}
	};

	return {
		menu: navigation,
		pages: pages,
		info: info,
		filters: filters,
		hamburger: hamburger,
		hammertime: hammertime,
		swipe: swipe,
		currentIndex: function() {
			return index;
		},
		handlers: handlers,
		filter: filter,
		blog: blog
	};
};

function randomInteger(min, max){
	return Math.floor(Math.random() * (1 + max - min) + min);
}
document.addEventListener('DOMContentLoaded', function() {

	// Create the measurement node
var scrollDiv = document.createElement("div");
scrollDiv.className = "scrollbar-measure";
document.body.appendChild(scrollDiv);

// Get the scrollbar width
var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;

// Delete the DIV
document.body.removeChild(scrollDiv);

	var app = new App();
	app.scrollbarWidth = scrollbarWidth;


	var tags = Array.prototype.slice.call(document.querySelectorAll('.tagcloud-item'));

	var tl = new TimelineLite({delay:0.5, repeatDelay:1});

	for(i = 0; i < tags.length; i++) {
		tl.to(tags[i], 0.25, {rotation:randomInteger(-6, 10), x:randomInteger(-2, 2), y:randomInteger(-4, 4)}, "sentence+=" + i * 0.3);
	}

	app.hamburger.addEventListener('click', function(e) {
		if(app.hamburger.classList.contains('active')) {
			app.menu().down();
		} else {
			app.menu().up();
		}
	});

	window.addEventListener('resize', app.handlers.resize);


	window.addEventListener('keydown', function(e) {
		/*
		e.preventDefault();
		e.stopPropagation();
		*/
		if(e.keyCode == 37) { // left
			app.menu().left();
		} else if(e.keyCode == 39) { // right
			app.menu().right();
		} else if(e.keyCode == 38) { // up
			app.menu().up();
		} else if(e.keyCode == 40 || e.keyCode == 13) { // down || enter
			app.menu().down();
		}
	});


	document.querySelector('.sticky').style.width = "calc(100% - " + app.scrollbarWidth + "px)"
	document.querySelector('article[data-id="blog"]').addEventListener('scroll', app.blog.tagcloud.toggle);
	window.addEventListener("mousewheel", app.blog.tagcloud.toggle);

	//hammertime.get('swipe').set({ direction: Hammer.DIRECTION_HORIZONTAL });
	app.hammertime.on("panstart panright panleft panend", app.handlers.scroll);

	Array.prototype.slice.call(app.pages.children).forEach(function(page, i) {
		page.addEventListener('click', function(evt) {
			if(app.pages.classList.contains('small') && !app.handlers.moving) {
				if(i == app.currentIndex()) {
					app.menu().down();
				} else {
					app.menu().moveTo(i);
				}
			}
		});
	});


	app.filters.forEach(function(filter, i) {
		filter.addEventListener('click', function(evt) {
			app.filters.forEach(function(filter, i) {
				filter.classList.remove('active');
			}.bind(this));

			filter.classList.add('active');

			var type = filter.getAttribute('data-filter');
			var filterActivity = document.querySelector('.filter-activity');

			var left = 0;
			var width = 0;

			switch(type) {
				case 'all':
					left = (-320 / 2 + 25) + 'px';
					width = '45px';
					app.filter();
					break;
				case 'custom-elements':
					left = (-320 / 2 + 127) + 'px';
					width = '155px';
					app.filter('custom-elements');
					break;
				case 'web-tools':
					left = (-320 / 2 + 263) + 'px';
					width = '102px';
					app.filter('web-tools');
					break;
			}
			TweenLite.to(filterActivity, 0.5, {
				left: left,
				width: width,
				ease: Power4.easeInOut
			});

		}.bind(this));
	}.bind(this));

	if(window.location.hash) {
		// goto article
		var ids = [];
		for(var i in app.pages.children) {
			if(app.pages.children[i].dataset && app.pages.children[i].dataset.hasOwnProperty("id")) {
				ids.push(app.pages.children[i].dataset.id);
			}
		}

		app.menu().moveTo(ids.indexOf(window.location.hash.slice(1)));
	} else if(window.location.pathname.endsWith("blog.html")) {
		var ids = [];
		for(var i in app.pages.children) {
			if(app.pages.children[i].dataset && app.pages.children[i].dataset.hasOwnProperty("id")) {
				ids.push(app.pages.children[i].dataset.id);
			}
		}

		app.menu().moveTo(ids.indexOf("blog"));
	}


}, false);
