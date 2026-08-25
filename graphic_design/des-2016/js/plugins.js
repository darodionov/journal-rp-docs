// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

$(function(){				
				var simpletab = function(){		
        var names = $('.names');		
        names.find('.thead').click(function(){			
            var tmpTheads = $(this).parent().find('.thead'),
			    tmpIndex = tmpTheads.index($(this));				
            tmpTheads.removeClass('select');
            $(this).addClass('select');
            $(this).parent().parent().find('div.letters').hide(0).eq(tmpIndex).show(0);
        });
    }();				
	})
	

$(function(){

				$(".sidebar-title-names").click(function(){
					$(".section-mos-visible").removeClass('section-mos-visible').addClass('section-mos-hidden');
					$(".section-calendar-visible").removeClass('section-calendar-visible').addClass('section-calendar-hidden');
					$(".section-names-hidden").removeClass('section-names-hidden').addClass('section-names-visible');
					
				});
				$(".sidebar-title-mos").click(function(){
					$(".section-names-visible").removeClass('section-names-visible').addClass('section-names-hidden');
					$(".section-mos-hidden").removeClass('section-mos-hidden').addClass('section-mos-visible');
					$(".section-calendar-hidden").removeClass('section-calendar-hidden').addClass('section-calendar-visible');
				});
				$(".sidebar-title-date").click(function(){
					$(".section-names-visible").removeClass('section-names-visible').addClass('section-names-hidden');
					$(".section-mos-visible").removeClass('section-mos-visible').addClass('section-mos-hidden');
					$(".section-calendar-hidden").removeClass('section-calendar-hidden').addClass('section-calendar-visible');
				});

			});


$(function() {
        if (Modernizr.mq('(min-width : 480px) and (max-width : 950px)')) {
        $(".block_0, .block_12").empty(),
		$(".section .block_2").after($(".section-left .block_3")),
		$(".section .block_5").before($(".section-right .block_4")),
		$(".section .block_5").after($(".section-right .block_6")),
		$(".section .block_8.last").after($(".section-left .block_9")),
		$(".section-right .block_10").after($(".section-right .block_11"));
		
		
        } else {
       $(".block_0, .block_12").show(),
	   $(".section-left .block_0").after($(".section-left .block_3")),
	   $(".section-right .block_11").before($(".section-right .block_4")),
	   $(".section-right .block_11").after($(".section-right .block_6")),
	   $(".section-left .block_12").after($(".section-left .block_9")),
	   $(".section-right .block_6").after($(".section-right .block_10"));
	  
        }
    });
		$(function() {
        if (Modernizr.mq('(min-width : 320px) and (max-width : 480px)')) {
        $(".block_0, .block_11, .block_12").empty(),
		$(".section .block_2").after($(".section-left .block_3")),
		$(".section .block_5").before($(".section-right .block_6")),
		$(".section .block_5").after($(".section-right .block_4")),
		$(".section .block_8.last").after($(".section-left .block_9")),
		$(".section-right .block_10").after($(".section-right .block_11"));
		
		
        } else {
       $(".block_0, .block_11, .block_12").show(),
	   $(".section-left .block_0").after($(".section-left .block_3")),
	   $(".section-right .block_11").after($(".section-right .block_6")),
	   $(".section-rught .block_11").before($(".section-right .block_4")),
	   $(".section-left .block_12").after($(".section-left .block_9")),
	   $(".section-right .block_6").after($(".section-right .block_10"));
	  
        }
    });
	
	