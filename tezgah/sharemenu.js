(function ($) {
    "use strict";

    var allmenus = new Array();

    $(function () {
        $('body').mousedown(function (e) {
            $("._sharemenu_menu_list_").css('display', 'none');
        });
    });

    function init(el, id, param) {
        el.append('<ul class="_sharemenu_menu_list_"></ul>');
        $('._sharemenu_menu_list_')
            .off()
            .on('mousedown', function (e) {
                e = e || window.event;
                e.stopPropagation();
            })
            .on('click', function () {
                $("._sharemenu_menu_list_").css('display', 'none');
            });


        el.mouseup(function (e) {
            var sm = allmenus[$(this).data('sharemenuid')];
            e = e || window.event;
            if (e.button !== 0) return;
            e.preventDefault();
            sm.selisleri(e, this);
        });

        allmenus[id] = {
            id: id,
            param: param,
            selisleri: function (e, el) {
                var hoy = getSelection().toString();
                while (hoy.split('\n').length > 1) hoy = hoy.split('\n').join(' ');
                while (hoy.split('  ').length > 1) hoy = hoy.split('  ').join(' ');
                if (hoy === ' ') hoy = '';
                while (hoy.substr(0, 1) === ' ') hoy = hoy.substr(-1 * (hoy.length - 1));
                while (hoy.substr((hoy.length - 1), 1) === ' ') hoy = hoy.substr(0, hoy.length - 1);

                this.openShareMenu(hoy, e, el);
            },
            openShareMenu: function (hoy, e, el) {
                var $menu = $(el).find("._sharemenu_menu_list_");
                if ($menu.css('display') != 'none') {
                    if (!hoy) {
                        $menu.data('sel', hoy);
                        $menu.css('display', 'none');
                    } else if ($menu.data('sel') == hoy) return;
                }

                if (!hoy) return;

                var x = e.pageX;
                var y = e.pageY;
                $menu.data('sel', hoy);
                $menu.css({ left: x + 'px', top: y + 'px' });

                var twittext = hoy + ' ' + location.href;
                var twit = 'https://twitter.com/intent/tweet?text=' + twittext;
                var goog = 'https://www.google.com/?#q=' + hoy;

                var menu = '';

                var current = allmenus[$(el).data('sharemenuid')];

                if (current.param.twitter) menu += '<li><a href="' + twit + '" target="_blank"><i class="fa fa-twitter"></i>&nbsp;Tweet (' + twittext.length + ' Karakter)</a></li>';
                if (current.param.facesharer) menu += '<li><a href="' + "https://www.facebook.com/sharer/sharer.php?u=" + location.href + '" target="_blank"><i class="fa fa-facebook"></i>&nbsp;Facebook</a></li>';
                if (current.param.facefeed) menu += '<li><a href="https://www.facebook.com/dialog/feed?app_id=' +
                    current.param.facebook.appid + '&caption=' + hoy +
                    '&redirect_uri=' + current.param.facebook.redirect +
                    '&link=' + 'http://beltslib.net/' + '" target="_blank"><i class="fa fa-facebook"></i>&nbsp;Facebook</a></li>';
                if (current.param.google) menu += '<li><a href="' + goog + '" target="_blank"><i class="fa fa-google"></i>&nbsp;Google\'da Ara</a></li>';

                if (current.param.extra) if (current.param.extra.length) {
                    for (var i = 0; i < current.param.extra.length; i++) menu += '<li><a href="' + current.param.extra[i].link.split('[selection]').join(hoy) + '" target="' + (current.param.extra[i].target ? current.param.extra[i].target : '') + '"><i class="fa fa-' + (current.param.extra[i].fa ? current.param.extra[i].fa : 'circle') + '"></i>&nbsp;' + current.param.extra[i].name + '</a></li>';
                }

                $menu.html(menu);
                $menu.css('display', 'block');
            }
        }
    }


    /* Plug-in Start */
    $.fn.sharemenu = function (param) {
        if (param) {
            if (param.twitter != 0) param.twitter = 1;
            if (param.facebook != 0) {
                if (typeof param.facebook == 'object') {
                    param.facefeed = 1;
                    param.facesharer = 0;
                } else {
                    param.facefeed = 0;
                    param.facesharer = 1;
                }
            }
            if (param.google != 0) {
                param.google = 1;
            }
        } else {
            param = {
                twitter: 1,
                facesharer: 1,
                google: 1
            }
        }
        allmenus.push(new Object());
        var id = allmenus.length - 1;
        this.data('sharemenuid', id);

        init(this, id, param);

        return this;
    }
    /* End: Plug-in Start */
})(jQuery);