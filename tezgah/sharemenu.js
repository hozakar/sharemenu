(function($) {
	"use strict";
	
	var sharemenu = {
		selisleri: function(e) {
			var hoy = getSelection().toString();
			while(hoy.split('\n').length > 1) hoy = hoy.split('\n').join(' ');
			while(hoy.split('  ').length > 1) hoy = hoy.split('  ').join(' ');
			if(hoy === ' ') hoy = '';
			while(hoy.substr(0, 1) === ' ') hoy = hoy.substr(-1 * (hoy.length - 1));
			while(hoy.substr((hoy.length - 1), 1) === ' ') hoy = hoy.substr(0, hoy.length - 1);
			
			this.openShareMenu(hoy, e);
		},
		openShareMenu: function(hoy, e) {
			var $menu = this.find("._sharemenu_menu_list_");
			if($menu.css('display') != 'none') {
				if(!hoy) {
					$menu.data('sel', hoy);
					$menu.css('display', 'none');
				} else if($menu.data('sel') == hoy) return;
			}
			
			if(!hoy) return;
			
			var x = e.pageX;
			var y = e.pageY;
			$menu.data('sel', hoy);
			$menu.css({ left: x + 'px', top: y + 'px' });
			
			var twittext = hoy + ' ' + location.href;
			var twit = 'https://twitter.com/intent/tweet?text=' + twittext;
			var goog = 'https://www.google.com/?#q=' + hoy;
			
			$menu.html(
				'<li><a href="' + twit + '" target="_blank"><i class="fa fa-twitter"></i>&nbsp;Tweet (' + twittext.length + ' Karakter)</a></li>' + 
				'<li><a href="#" target="_self"><i class="fa fa-search"></i>&nbsp;Sitede Ara</a></li>' + 
				'<li><a href="' + goog + '" target="_blank"><i class="fa fa-google"></i>&nbsp;Google\'da Ara</a></li>'
			);
			$menu.css('display', 'block');
		},
		init: function(el, param) {
			el.append('<ul class="_sharemenu_menu_list_"></ul>');

			el.mouseup(function(e){
				e = e || window.event;
				if(e.button !== 0) return;
				e.preventDefault();
				this.selisleri(e);
			});
			
		}
	}
	function selisleri(e) {
		var hoy = getSelection().toString();
		while(hoy.split('\n').length > 1) hoy = hoy.split('\n').join(' ');
		while(hoy.split('  ').length > 1) hoy = hoy.split('  ').join(' ');
		if(hoy === ' ') hoy = '';
		while(hoy.substr(0, 1) === ' ') hoy = hoy.substr(-1 * (hoy.length - 1));
		while(hoy.substr((hoy.length - 1), 1) === ' ') hoy = hoy.substr(0, hoy.length - 1);
		
		openShareMenu(hoy, e);
	}

	$(function(){
		/*
		$('body').append('<ul id="_sharemenu_menu_list_"></ul>');
		*/
		$('body').mousedown(function(e){
			e = e || window.event;
			if(e.button === 0) return;
			$("._sharemenu_menu_list_").css('display', 'none');
		});
		/*
		$('body').mouseup(function(e){
			e = e || window.event;
			if(e.button !== 0) return;
			e.preventDefault();
			selisleri(e);
		});
		*/
	});

	function openShareMenu(hoy, e) {
		var $menu = $("#_sharemenu_menu_list_");
		if($("#_sharemenu_menu_list_").css('display') != 'none') {
			if(!hoy) {
				$menu.data('sel', hoy);
				$("#_sharemenu_menu_list_").css('display', 'none');
			} else if($menu.data('sel') == hoy) return;
		}
		
		if(!hoy) return;
		
		var x = e.pageX;
		var y = e.pageY;
		$menu.data('sel', hoy);
		$menu.css({ left: x + 'px', top: y + 'px' });
		
		var twittext = hoy + ' ' + location.href;
		var twit = 'https://twitter.com/intent/tweet?text=' + twittext;
		var goog = 'https://www.google.com/?#q=' + hoy;
		
		$menu.html(
			'<li><a href="' + twit + '" target="_blank"><i class="fa fa-twitter"></i>&nbsp;Tweet (' + twittext.length + ' Karakter)</a></li>' + 
			'<li><a href="#" target="_self"><i class="fa fa-search"></i>&nbsp;Sitede Ara</a></li>' + 
			'<li><a href="' + goog + '" target="_blank"><i class="fa fa-google"></i>&nbsp;Google\'da Ara</a></li>'
		);
		$menu.css('display', 'block');
	}
	
	/* Plug-in Start */
	$.fn.sharemenu = function(param) {
		sharemenu.init(this, param);
	}
	/* End: Plug-in Start */
	
})(jQuery);