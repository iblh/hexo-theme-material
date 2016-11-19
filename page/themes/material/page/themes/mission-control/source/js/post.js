document.addEventListener('DOMContentLoaded', function() {
	var sidebar = document.getElementById('sidebar');
	Stickyfill.add(sidebar);



	$('.article-entry').each(function(i){
		$(this).find('img').each(function(){
			if ($(this).parent().hasClass('fancybox')) return;

			var alt = this.alt;

			if (alt) $(this).after('<span class="caption">' + alt + '</span>');

			$(this).wrap('<a href="' + this.src + '" title="' + alt + '" class="fancybox"></a>');
		});

		$(this).find('.fancybox').each(function(){
			$(this).attr('rel', 'article' + i);
		});
	});

	if ($.fancybox){
		$('.fancybox').fancybox();
	}
});
