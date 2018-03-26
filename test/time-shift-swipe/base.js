var prevPage = $('li.active').prev().find('a').attr('href');
var nextPage = $('li.active').next().find('a').attr('href');

if($(window).width() <= 767){
  $('body').on('swipeleft', function(event, ui){
    window.location = nextPage;
  });
  $('body').on('swiperight', function(event, ui){
    window.location = prevPage;
  });

  $('.dropdown a').click(function(){
    $('.dropdown').find('ul').slideToggle();
  });
}
