$(function(){				
				var simpletab = function(){		
        var names = $('.names');		
        names.find('.thead').click(function(){			
            var tmpTheads = $(this).parent().find('.thead'),
			    tmpIndex = tmpTheads.index($(this));				
            tmpTheads.removeClass('select');
            $(this).addClass('select');
            $(this).parent().parent().find('.letters').hide(0).eq(tmpIndex).show(0);
        });
    }();		
