/** ********************************************** **
	@Author			Dorin Grigoras
	@Website		www.stepofweb.com
	@Last Update	10:05 AM Sunday, January 12, 2014

	TABLE CONTENTS
	-------------------------------
		01. SCROLL TO
		02. SLIDER
		03. FITVIDS
		04. OWL CAROUSEL
		05. ELEMENTS ANIMATION
		06. COUNT TO (number animate)
		07. CONTACT FORM
		08. NEWSLETTER SUBSCRIBE
		09. BACKSTRETCH BACKGROUND [STATIC LOGO - NOSLIDER]
		10. VIDEO BACKGROUND
		11. GOOGLE MAP
		12. MAGNIFIC POPUP
		13. PORTFOLIO
		14. STICKY TOP NAV
		15. FULLSCREEN
		16. VIDEO BACKGROUND
*************************************************** **/

	var _scrollSpeed			= 1000,
		_slider_delay			= 0, //4000,

		// GOOGLE MAP
		$googlemap_latitude 	= -37.812344,
		$googlemap_longitude	= 144.968900,
		$googlemap_zoom			= 13,

		// @CONTACT FORM - TRANSLATE OR EDIT
		errMsg 					= 'Please complete all fields!',
		errEmail				= 'Invalid Email!',
		okSent					= '<strong>Thank You!</strong> Your message successfully sent!',
		buttonDisabled			= 'MESSAGE SENT';

		// set header height!
		window.navHeight 		= jQuery("#header").height();





/**	01. SCROLL TO
*************************************************** **/
	jQuery("a.scrollTo").bind("click", function(e) {
		e.preventDefault();

		var href = jQuery(this).attr('href');
		if(href != '#') {
			jQuery('html,body').animate({scrollTop: jQuery(href).offset().top - window.navHeight}, _scrollSpeed, 'easeInOutExpo');
		}
	});

	jQuery("a.toTop").bind("click", function(e) {
		e.preventDefault();
		jQuery('html,body').animate({scrollTop: 0}, 1000, 'easeInOutExpo');
	});





/**	02. SLIDER
*************************************************** **/
// jQuery(window).load(function() {

	// Home Slider (top)
	if(jQuery("#slider").length > 0) {
		jQuery("#slider").superslides({
			animation: "fade", 		// slide|fade
			pagination: true, 		// true|false
			play: false,	 		// false to disable autoplay -OR- miliseconds (eg.: 1000 = 1s)
			animation_speed: 600,	// animation transition

			elements: {
			  preserve: '.preserve',
			  nav: '.slides-navigation',
			  container: '.slides-container',
			  pagination: '.slides-pagination'
			}

		});
	}

	/* 
	// Stop on mouse over ! 
	jQuery('#slides').on('mouseenter', function() {
		jQuery(this).superslides('stop');
		// console.log('Stopped')
	});
	jQuery('#slides').on('mouseleave', function() {
		jQuery(this).superslides('start');
		// console.log('Started')
	});
	*/

// });

	

/**	03. FITVIDS
*************************************************** **/
	if(jQuery().fitVids) {
		jQuery("body").fitVids();
	}


	

/**	04. CAROUSEL
	@OWL USAGE
	<div class="owl-carousel text-left" data-navigation="false" data-singleitem="true" data-autoplay="true" data-transition="fade" data-items="">
		<div class="item dragCursor">#item 1</div>
		<div class="item dragCursor">#item 2</div>
		<div class="item dragCursor">#item 3</div>
		<div class="item dragCursor">#item N</div>
	</div>
*************************************************** **/
	if(jQuery().owlCarousel) {
		owlCarouselInit(".owl-carousel");
	}

	function owlCarouselInit(divClass) {
		jQuery(divClass).each(function() {
			var t 			= jQuery(this),
				navigation 	= t.attr('data-navigation'),
				singleItem 	= t.attr('data-singleitem'),
				autoPlay 	= t.attr('data-autoplay'),
				transition 	= t.attr('data-transition'), // fade or false
				items 		= t.attr('data-items'), 	 // no of items

				navigation 	= (navigation == 'true') 	? true 		: false,
				singleItem 	= (singleItem == 'true') 	? true 		: false,
				autoPlay 	= (autoPlay == 'true') 		? true 		: false;
				transition 	= (transition == 'fade') 	? 'fade' 	: false;
				items 		= (items > 0) 				? items 	: 5;

			jQuery(t).owlCarousel({
				items: 				items,
				slideSpeed: 		300,
				paginationSpeed: 	600,
				navigation: 		navigation,
				singleItem: 		singleItem,
				autoPlay:			autoPlay,
				stopOnHover: 		true,
				autoHeight: 		false,
				transitionStyle: 	transition
			});
		});
	}

	// Services slider
	if(jQuery().carouFredSel) {
		jQuery('ul.services').carouFredSel({
			auto: false,
			swipe: {
				onTouch: true,
				onMouse: false
			},
			prev: '#service-prev',
			next: '#service-next',
			responsive: true,
			width: '100%',
			height: 'variable', 
			scroll: 1,
			items: {
				width: 292,
				height: 'variable',
				visible: {
					min: 1,
					max: 4
				}
			}
		});
	}






/**	05. ELEMENTS ANIMATION
*************************************************** **/
	jQuery('.animate_from_top').each(function () {
		jQuery(this).appear(function() {
			jQuery(this).delay(150).animate({opacity:1,top:"0px"},1000);
		});	
	});

	jQuery('.animate_from_bottom').each(function () {
		jQuery(this).appear(function() {
			jQuery(this).delay(150).animate({opacity:1,bottom:"0px"},1000);
		});	
	});


	jQuery('.animate_from_left').each(function () {
		jQuery(this).appear(function() {
			jQuery(this).delay(150).animate({opacity:1,left:"0px"},1000);
		});	
	});


	jQuery('.animate_from_right').each(function () {
		jQuery(this).appear(function() {
			jQuery(this).delay(150).animate({opacity:1,right:"0px"},1000);
		});	
	});

	jQuery('.animate_fade_in').each(function () {
		jQuery(this).appear(function() {
			jQuery(this).delay(150).animate({opacity:1,right:"0px"},1000);
		});	
	});

	/**	@ANIMATE ELEMENTS **/
	if(jQuery().appear) {
		jQuery('*').each(function() {
			if(jQuery(this).attr('data-animation')) {
				var $animationName = jQuery(this).attr('data-animation');
				jQuery(this).appear(function() {
					jQuery(this).addClass('animated').addClass($animationName);
				});
			}
		});
	}

/**	06. COUNT TO (number animate)
*************************************************** **/
	if(jQuery().appear) {
		if(jQuery().countTo) {
			jQuery('.countTo').appear(function() {
				jQuery(this).each(function() {
					var $to = parseInt(jQuery(this).html());
					jQuery(this).countTo({
						from: 				0,
						to: 				$to,
						speed: 				4000,
						refreshInterval: 	120
					});
				});
			});
		}
	};




/**	07 CONTACT FORM
*************************************************** **/
	jQuery("#contact_submit").bind("click", function(e) {
		e.preventDefault();

		var contact_name 	= jQuery("#contact_name").val(),			// required
			contact_email 	= jQuery("#contact_email").val(),			// required
			contact_subject = jQuery("#contact_subject").val(),			// optional
			contact_comment = jQuery("#contact_comment").val(),			// required
			captcha 		= jQuery("#captcha").val(),					// required TO BE EMPTY if humans
			_action			= jQuery("#contactForm").attr('action'),	// form action URL
			_method			= jQuery("#contactForm").attr('method'),	// form method
			_err			= false;									// status

		// Remove error class
		jQuery("input, textarea").removeClass('err');

		// Spam bots will see captcha field - that's how we decet spams.
		// It's very simple and not very efficient antispam method but works for bots.
		if(captcha != '') {
			return false;
		}


		// Name Check
		if(contact_name == '') {
			jQuery("#contact_name").addClass('err');
			var _err = true;
		}

		// Email Check
		if(contact_email == '') {
			jQuery("#contact_email").addClass('err');
			var _err = true;
		}

		// Comment Check
		if(contact_comment == '') {
			jQuery("#contact_comment").addClass('err');
			var _err = true;
		}

		// Stop here, we have empty fields!
		if(_err === true) {
			return false;
		}


		// SEND MAIL VIA AJAX
		$.ajax({
			url: 	_action,
			data: 	{ajax:"true", action:'email_send', contact_name:contact_name, contact_email:contact_email, contact_comment:contact_comment, contact_subject:contact_subject},
			type: 	_method,
			error: 	function(XMLHttpRequest, textStatus, errorThrown) {

				alert('Server Internal Error'); // usualy on headers 404

			},

			success: function(data) {
				data = data.trim(); // remove output spaces


				// PHP RETURN: Mandatory Fields
				if(data == '_required_') {
					alert(errMsg);
				} else

				// PHP RETURN: INVALID EMAIL
				if(data == '_invalid_email_') {
					alert(errEmail);
				} else

				// VALID EMAIL
				if(data == '_sent_ok_') {

					// append message and show ok alert
					jQuery("#_msg_txt_").empty().append(okSent);
					jQuery("#_sent_ok_").removeClass('hide');

					// reset form
					jQuery("#contact_name, #contact_email, #contact_subject, #contact_comment").val('');

					// disable button - message already sent!
					jQuery("#contact_submit").empty().append(buttonDisabled);
					jQuery("#contact_submit").addClass('disabled');

				} else {

					// PHPMAILER ERROR
					alert(data); 

				}
			}
		});

	});



/**	08. NEWSLETTER SUBSCRIBE
*************************************************** **/
jQuery("#newsletter-subscribe").bind("click", function(e) {
		e.preventDefault();

		var email 			= jQuery("#newsletter_email").val(),		// required
			captcha 		= jQuery("#newsletter_captcha").val(),		// required TO BE EMPTY if humans
			_action			= jQuery("#newsletterForm").attr('action'),	// form action URL
			_method			= jQuery("#newsletterForm").attr('method');	// form method

		// Remove error class
		jQuery("input, textarea").removeClass('err');


		// SEND VIA AJAX
		$.ajax({
			url: 	_action,
			data: 	{ajax:"true", action:'newsletter_subscribe', email:email},
			type: 	_method,
			error: 	function(XMLHttpRequest, textStatus, errorThrown) {

				alert('Server Internal Error'); // usualy on headers 404

			},

			success: function(data) {
				data = data.trim(); // remove output spaces


				// PHP RETURN: Mandatory Fields
				if(data == '_required_') {
					alert(errMsg);
				} else

				// PHP RETURN: INVALID EMAIL
				if(data == '_invalid_email_') {
					alert(errEmail);
				} else

				// VALID EMAIL
				if(data == '_ok_') {

					jQuery("#newsletter_email").val('');
					$('#newsletterModal').modal();

				} else {

					// PHPMAILER ERROR
					alert(data); 

				}
			}
		});

});





/**	09. BACKSTRETCH BACKGROUND [STATIC LOGO - NOSLIDER]
*************************************************** **/
	if(jQuery().backstretch && jQuery("#static-logo").length > 0) {
		var background_image = jQuery("#static-logo").attr('data-background');

		if(background_image) {
			jQuery("#slider").backstretch(background_image, {speed: 150});
			jQuery("#slider").css({"background":"none"});
		}

	}

/**	10. VIDEO BACKGROUND
*************************************************** **/
/*
	var videoBg = {
		mp4:'video.mp4',
		ogv:'video.ogv',
		webm:'video.webm',
		poster:'video.jpg',
		scale:true,
		zIndex:0,
		position:"absolute",
		opacity:1,
		fullscreen:true
	};
*/
	if(jQuery().videoBG && jQuery('#videoBg').length > 0) {
		jQuery('#videoBg').videoBG(videoBg);
	}



/**	11. GOOGLE MAP
*************************************************** **/
	function contactMap() {
/*
		var styles = [
			{
				featureType: 'landscape.natural',
				elementType: 'all',
				stylers: [
					{ hue: '#22272d' },
					{ saturation: -7 },
					{ lightness: -84 },
					{ visibility: 'on' }
				]
			},{
				featureType: 'water',
				elementType: 'geometry',
				stylers: [
					{ hue: '#e1675a' },
					{ saturation: 44 },
					{ lightness: -19 },
					{ visibility: 'on' }
				]
			},{
				featureType: 'road',
				elementType: 'labels',
				stylers: [
					{ visibility: 'off' }
				]
			},{
				featureType: 'road.local',
				elementType: 'geometry',
				stylers: [
					{ hue: '#F73F69' },
					{ saturation: -46 },
					{ lightness: -44 },
					{ visibility: 'on' }
				]
			},{
				featureType: 'poi',
				elementType: 'geometry',
				stylers: [
					{ hue: '#F73F69' },
					{ saturation: 19 },
					{ lightness: -29 },
					{ visibility: 'on' }
				]
			},{
				featureType: 'road.highway',
				elementType: 'geometry',
				stylers: [
					{ hue: '#666666' },
					{ saturation: -100 },
					{ lightness: -37 },
					{ visibility: 'on' }
				]
			},{
				featureType: 'road.arterial',
				elementType: 'geometry',
				stylers: [
					{ hue: '#666666' },
					{ saturation: -100 },
					{ lightness: -48 },
					{ visibility: 'on' }
				]
			},{
				featureType: 'administrative',
				elementType: 'labels',
				stylers: [
					{ visibility: 'off' }
				]
			}
		];
*/
		var latLang = new google.maps.LatLng($googlemap_latitude,$googlemap_longitude);

		var mapOptions = {
			zoom:$googlemap_zoom,
			center: latLang,
			disableDefaultUI: false,
			navigationControl: false,
			mapTypeControl: false,
			scrollwheel: false,
			// styles: styles,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};

		var map = new google.maps.Map(document.getElementById('gmap'), mapOptions);
		google.maps.event.trigger(map, 'resize');
		map.setZoom( map.getZoom() );

		var marker = new google.maps.Marker({
			icon: 'data:image/png;base64,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',
			position: latLang,
			map: map,
			title: ""
		});

		marker.setMap(map);
		google.maps.event.addListener(marker, "click", function() {
			// Add optionally an action for when the marker is clicked
		});

		// kepp googlemap responsive - center on resize
		google.maps.event.addDomListener(window, 'resize', function() {
			map.setCenter(latLang);
		});

	}

	
	function showMap(initWhat) {
		var script 		= document.createElement('script');
		script.type 	= 'text/javascript';
		script.src 		= 'https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=true&callback='+initWhat;
		document.body.appendChild(script);
	}

	
	// INIT CONTACT, NLY IF #contactMap EXISRS
	if(jQuery("#gmap").length > 0) {
		showMap('contactMap');
	}




/**	12. MAGNIFIC POPUP
*************************************************** **/
	function _popups() {
		if(jQuery().magnificPopup) {

			jQuery('.popup, .popup-image').magnificPopup({ 
				type: 'image',
				fixedContentPos: 	false,
				fixedBgPos: 		false,
				mainClass: 			'mfp-no-margins mfp-with-zoom',
				image: {
					verticalFit: 	true
				},
				zoom: {
					enabled: 		true,
					duration: 		300
				}
			});

			// Magnific Popup for videos and google maps
			jQuery('.popup-video, .popup-gmap').magnificPopup({
				disableOn: 			700,
				type: 				'iframe',
				fixedContentPos: 	false,
				fixedBgPos: 		false,
				mainClass: 			'mfp-fade',
				removalDelay: 		160,
				preloader: 			false
			});

			// Magnific Popup for a normal inline element
			jQuery('.popup-inline').magnificPopup({
				type: 		'inline'
			});

			// Magnific Popup for a project with rich content
			jQuery('.popup-project').magnificPopup({
				type: 		'inline',
				alignTop: 	true
			});

			// Magnific Popup for an ajax popup without rich content
			jQuery('.popup-ajax').magnificPopup({
				type: 		'ajax',
				alignTop:	 true
			});

		}
	}	_popups();



/**	13. PORTFOLIO
*************************************************** **/
	jQuery(window).load(function() {
		jQuery(".masonry-list").each(function() {

			var $container = jQuery(this);

			$container.waitForImages(function() {

				$container.masonry({
					itemSelector: '.masonry-item'
				});

			});

		});
	});


	jQuery("ul.isotope-filter").each(function() {

		var source = jQuery(this);
		var destination = jQuery("ul.sort-destination[data-sort-id=" + jQuery(this).attr("data-sort-id") + "]");

		if(destination.get(0)) {

			jQuery(window).load(function() {

				destination.isotope({
					itemSelector: "li",
					layoutMode: 'sloppyMasonry'
				});

				source.find("a").click(function(e) {

					e.preventDefault();

					var $this = jQuery(this),
						sortId = $this.parents(".sort-source").attr("data-sort-id"),
						filter = $this.parent().attr("data-option-value");

					source.find("li.active").removeClass("active");
					$this.parent().addClass("active");

					destination.isotope({
						filter: filter
					});

					// self.location = "#" + filter.replace(".","");

					jQuery(".sort-source-title[data-sort-id=" + sortId + "] strong").html($this.html());

					return false;

				});


				/*
					jQuery(window).bind("hashchange", function(e) {

						var hashFilter = "." + location.hash.replace("#",""),
							hash = (hashFilter == "." || hashFilter == ".*" ? "*" : hashFilter);

						source.find("li.active").removeClass("active");
						source.find("li[data-option-value='" + hash + "']").addClass("active");

						destination.isotope({
							filter: hash
						});

					});
					var hashFilter = "." + (location.hash.replace("#","") || "*");


					var initFilterEl = source.find("li[data-option-value='" + hashFilter + "'] a");

					if(initFilterEl.get(0)) {
						source.find("li[data-option-value='" + hashFilter + "'] a").click();
					} else {
						source.find("li:first-child a").click();
					}
				*/


			});

		}

	});


/**	14. STICKY TOP NAV
*************************************************** **/
	// -----------------------------------------------------------------------------------
		// Fullscreen Height - keep it here to avoid sticky menu bug!
		if(jQuery(".full-screen").length > 0) {
			_fullscreen();

			jQuery(window).resize(function() {
				_fullscreen();
			});
		}
		function _fullscreen() {

			var _screenHeight = jQuery(window).height();
			jQuery(".full-screen, .full-screen ul, .full-screen li").height(_screenHeight);

		}
	// -----------------------------------------------------------------------------------

if(jQuery("#home").length > 0) {

	window.isOnTop 		= true;
	window.homeHeight 	= jQuery("#home").height() - window.navHeight;
	 /*
		window.isOnTop = avoid bad actions on each scroll
		Benefits: no unseen jquery actions, faster rendering
	 */
	jQuery(window).scroll(function() {
		if(jQuery(document).scrollTop() > window.homeHeight) {
			if(window.isOnTop === true) {
				jQuery('#header').addClass('fixed');
				window.isOnTop = false;
			}
		} else {
			if(window.isOnTop === false) {
				jQuery('#header').removeClass('fixed');
				window.isOnTop = true;
			}
		}
	});

	jQuery(window).resize(function() {
		window.homeHeight = jQuery("#home").height() - window.navHeight;
	});

}





/**	15. FULLSCREEN
 *************************************************** **/
	if(navigator.userAgent.indexOf("MSIE") > 0) {
		/* ie */
	} else { 
		jQuery("a.btn-fullscreen").show(); 
	}

	jQuery("a.btn-fullscreen").bind("click", function(e) {
		e.preventDefault();

		if (!document.fullscreenElement && /* alternative standard method */ !document.mozFullScreenElement && !document.webkitFullscreenElement) {  // current working methods

			if (document.documentElement.requestFullscreen) {
				document.documentElement.requestFullscreen();
			} else if (document.documentElement.mozRequestFullScreen) {
				document.documentElement.mozRequestFullScreen();
			} else if (document.documentElement.webkitRequestFullscreen) {
				document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
			}

		} else {

			if (document.cancelFullScreen) {
				document.cancelFullScreen();
			} else if (document.mozCancelFullScreen) {
				document.mozCancelFullScreen();
			} else if (document.webkitCancelFullScreen) {
				document.webkitCancelFullScreen();
			}

		}
	});





/**	16. VIDEO BACKGROUND
	<script type="text/javascript" src="assets/plugins/jquery.mb.YTPlayer.js"></script>

	<!-- video audio icon -->
	<a href="#" id="video-volume"><i class="fa fa-volume-down"></i></a>

	<!-- Video Background - replace videoURL with your youtube video URL -->
	<a id="YTPlayer" class="player" data-property="{videoURL:'http://www.youtube.com/watch?v=_zkf7aliGKk',containment:'body',autoPlay:true, mute:true, startAt:18, opacity:1}">youtube</a>
	<!--/Video Background -->
*************************************************** **/
	if(jQuery().mb_YTPlayer) {

		// var onMobile = false;
		// if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) { onMobile = true; }

		// if((onMobile === false)) {

			jQuery(".player").mb_YTPlayer();
			jQuery("#home").css({"background":"none"});

			jQuery("#video-volume").bind("click", function(e) {
				e.preventDefault();

				jQuery('#YTPlayer').toggleVolume();
			});

		// } else {

			// jQuery(".player , #video-volume").hide();

		// }

	}




/** MISC
*************************************************** **/
	// hide body scroll if modal is open
	jQuery("#contactModal").mouseenter(function(){
		jQuery("html, body").css("overflow", "hidden"); 
	}).mouseleave(function(){
		jQuery("html, body").css("overflow", "visible");
	});

	// easing - only needed
	jQuery.extend( jQuery.easing,{
		easeInOutExpo: function (x, t, b, c, d) {
			if (t==0) return b;
			if (t==d) return b+c;
			if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
			return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
		},
	});

	// Hover Effect - opacity effect
	jQuery('#portfolio li, #quick-blog .quick-hover').hover(function(){
		jQuery(this).siblings().addClass('faded');
	}, function(){
		jQuery(this).siblings().removeClass('faded');
	});