if($(window).width() <= 767){
  var prevPage = $('li.active').prev().find('a').attr('href');
  var nextPage = $('li.active').next().find('a').attr('href');
  $('body').on('swipeleft', function(event, ui){
    if (nextPage != null) {
      window.location = nextPage;
    }
  });
  $('body').on('swiperight', function(event, ui){
    if (prevPage != null) {
      window.location = prevPage;
    }
  });

  $('.dropdown a').click(function(){
    $('.dropdown').find('ul').slideToggle();
  });
}
