var prevPage = $('li.active').prev().find('a').attr('href');
var nextPage = $('li.active').next().find('a').attr('href');
$('body').on('swipeleft', function(event, ui){
  $.mobile.changePage( nextPage, { transition: "slide", reverse: true });
});
$('body').on('swiperight', function(event, ui){
  $.mobile.changePage( prevPage, { transition: "slide" } );
});
