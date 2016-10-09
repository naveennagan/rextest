(function($){
$.fn.bell = function(objOption){

var options = $.extend({'color':'green' , 'thickness':3 } , objOption);

//render bell needs to move to function or template
$(this).append("<div class='bell-container'><div class='bell-notification'>0</div><div class='bell-body'><div class='bell-edge left'></div><div class='bell-edge right'></div></div><div class='bell-circle'></div></div>");
$(this).find('.bell-container').css('border-color',options.color);
$(this).find('.bell-container .bell-body').css('border-width',options.thickness+'px');
$(this).find('.bell-container .bell-edge').css('border-width',options.thickness+'px');
$(this).find('.bell-container .bell-edge').css('bottom',(-options.thickness)+'px');
$(this).find('.bell-container .bell-circle').css('width',(options.thickness*2)+'px');
$(this).find('.bell-container .bell-circle').css('height',(options.thickness*2)+'px');
$(this).find('.bell-container .bell-circle').css('bottom',-(options.thickness*2-2)+'px');
$(this).find('.bell-container .bell-circle').css('background',options.color);

var notifications=0;
var that=$(this);
$(this).click(function(){  	
  options.onclick();   
});

//poll for notifications
(function poll() {
   setTimeout(function() {
       $.ajax({ url: options.notifyurl, success: function(data) {
		    if(data.nots>notifications){
				$(that).find('.bell-container .bell-circle').addClass('wobble');
				$(that).find('.bell-notification').text(data.nots);
				notifications=data.nots;
			}
			else{
				$(that).find('.bell-container .bell-circle').removeClass('wobble');
			}
            
       }, dataType: "json", complete: poll });
    }, 1000);
})();
}
})(jQuery);

