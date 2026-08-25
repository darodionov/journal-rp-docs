$(document).ready(function(){
    $('.btn-more').click(function(){
    var hBlock = $('.article-hidd');
	hBlock.slideToggle('slow');
	$('.arrow').toggleClass('down');
 });
});


