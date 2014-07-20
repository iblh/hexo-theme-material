/**
 * jQuery MGlass, Displays a magnifying glass on image hover
 * http://github.com/younes0/jQuery-MGlass
 * 
 * Version 1.1
 *  
 * 
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * 
 */
(function($) {

	// Start
    $.mglass = function(element, options) {

		// Defaults
       var defaults = {
			opacity: 0.4,
			speed: 150,
			wrapper: true
       };
	
        var plugin = this, $element = $(element);
		
		plugin.settings = {};
		
		
        // Constructor
        plugin.init = function() {

			plugin.settings = $.extend({}, defaults, options);
						
			if (plugin.settings.wrapper) {
				$element.wrap('<div class="mglassWrapper" />');
			}

			var 
				h = $element.height(), 
				w = $element.width()
			;

			var overlayStyle = 'width: '+w+'px; height: '+h+'px;'; 

			// CSS3 transition Support ?
			if (typeof $.css3Transitions === 'undefined') {
				$.css3Transitions = plugin.supportsTransitions();
			}
			if ($.css3Transitions) {
				overlayStyle+= $.fn.mglass.transitionProperty+': opacity '+(plugin.settings.speed/1000)+'s ease;';
			}

			// Mglass Div
			$overlay = $('<div class="mglass" style="'+overlayStyle+'"></div>');
			$overlay.insertBefore($(element));

			// No CSS3 transition support : javascript fallback
			if (!$.css3Transitions) {
				$overlay.hover(
					function () {
						$(this).stop().animate({"opacity": plugin.settings.opacity}, plugin.settings.speed);
					},
					function () {
						$(this).stop().animate({"opacity": 0}, 100);
					}
				);
			}

		
		},

		plugin.supportsTransitions = function() {

			var el      = document.createElement('div');
			var vendors = ['', 'Ms', 'Moz', 'Webkit', 'O'];

		    for (var i = 0, len = vendors.length; i < len; i++) {
		        var prop = vendors[i] + 'Transition';
		        if (prop in el.style) {
					$.fn.mglass.transitionProperty = '-'+vendors[i].toLowerCase()+'-transition';
					return true;
				}
		    }

		    return false;

		};


		// Init
        plugin.init();

    };

    // Add the plugin to the jQuery.fn object
    $.fn.mglass = function(options) {
        return this.each(function() {
            if ($(this).data('mglass') === undefined) {
                var plugin = new $.mglass(this, options);
                $(this).data('mglass', plugin);
            }
        });
    };

// End
})(jQuery);