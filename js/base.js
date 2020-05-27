var screenHeight = $(window).height();
var screenWidth = $(window).width();

$(document).ready(function() {
  //Subscribe
  $('.subscribe-link').click(function(){
    $('.subscribe-box').slideToggle('fast');
  });

  $('.js-subscribe-close').click(function(){
    $('.subscribe-box').slideUp('fast');
  });

  if (screenWidth > 767) {
    //Fade in cover image
    $('.post-cover').each(function() {
      $(this).delay(500).fadeIn(1000);
    });

    //Calculate Min and Max for blasting
    function rand(min, max) {
      return parseInt(Math.round(min + Math.random() * (max - min)));
    }

    // Blast.js separate the characters
    $('.blastable').blast({
      delimiter: 'character',
      tag: 'span',
      aria: true
    });

    $('.blastable').css('opacity','1');

    //Blast characters randomly
    $('.blast').each(function() {
      $(this).delay(rand(600,1200)).fadeTo(1200,1);
    });

    //Hide title when scrolling
    $(window).scroll(function(){
      $(".blastable").css("opacity", 1 - $(window).scrollTop() / 300);
    });

    //Parallax effect
    $(".parallax").each(function(){var a=$(this).find("img").attr("src");$(this).css("background-image","url("+a+")")});

    //Yearly
    var yearlyItem = $('.js-year-item')

    yearlyItem.click(function(){
      var imgHeight = $(this).find('img').height();
      var imgWidth = $(this).find('img').width();

      $('.curtain').fadeToggle('slow');
      $(this).find('p').fadeToggle(100);
      $(this).toggleClass('open');
    });

    $('body').mouseup(function(e){
      if (!yearlyItem.is(e.target) && yearlyItem.has(e.target).length === 0 && !$(e.target).is('.js-year-item'))
      {
        $('.curtain').fadeOut('slow');
        yearlyItem.removeClass('open');
        yearlyItem.find('p').fadeOut(100);
      }
    });

    $(document).keydown(function(e) {
      if (e.keyCode == 27) {
        $('.curtain').fadeOut('slow');
        yearlyItem.removeClass('open');
        yearlyItem.find('p').fadeOut(100);
      }
    });
  }

  //Fog Effect
  function Particle(t){this.x=0,this.y=0,this.xVelocity=0,this.yVelocity=0,this.radius=5,this.context=t,this.draw=function(){return this.image?void this.context.drawImage(this.image,this.x-128,this.y-128):(this.context.beginPath(),this.context.arc(this.x,this.y,this.radius,0,2*Math.PI,!1),this.context.fillStyle="rgba(0, 255, 255, 1)",this.context.fill(),void this.context.closePath())},this.update=function(){this.x+=this.xVelocity,this.y+=this.yVelocity,this.x>=canvasWidth?(this.xVelocity=-this.xVelocity,this.x=canvasWidth):this.x<=0&&(this.xVelocity=-this.xVelocity,this.x=0),this.y>=canvasHeight?(this.yVelocity=-this.yVelocity,this.y=canvasHeight):this.y<=0&&(this.yVelocity=-this.yVelocity,this.y=0)},this.setPosition=function(t,i){this.x=t,this.y=i},this.setVelocity=function(t,i){this.xVelocity=t,this.yVelocity=i},this.setImage=function(t){this.image=t}}function generateRandom(t,i){return Math.random()*(i-t)+t}function init(){var t=document.getElementById("fog");if(t.getContext){context=t.getContext("2d");for(var i=0;particleCount>i;++i){var e=new Particle(context);e.setPosition(generateRandom(0,canvasWidth),generateRandom(0,canvasHeight)),e.setVelocity(generateRandom(-maxVelocity,maxVelocity),generateRandom(-maxVelocity,maxVelocity)),particles.push(e)}}else alert("Please use a modern browser")}function draw(){context.fillStyle="rgba(0, 0, 0, 0.2)",context.fillRect(0,0,400,400),particles.forEach(function(t){t.draw()})}function update(){particles.forEach(function(t){t.update()})}var particles=[],particleCount=400,maxVelocity=2,targetFPS=15,canvasWidth=window.innerWidth,canvasHeight=window.innerHeight,imageObj=new Image;imageObj.onload=function(){particles.forEach(function(t){t.setImage(imageObj)})},imageObj.src="http://annemelody.com/assets/2015/lighthouse/smoke.png";var context;$("#fog").length&&init(),context&&setInterval(function(){update(),draw()},1e3/targetFPS);

  //On screen functions
  $.fn.onscreen = function() {
    var t = $(window),
        o = { top: t.scrollTop(), left: t.scrollLeft() };
    o.right = o.left + t.width(), o.bottom = o.top + t.height();
    var e = this.offset();
    return e.right = e.left + this.outerWidth(), e.bottom = e.top + this.outerHeight(), !(o.right < e.left || o.left > e.right || o.bottom < e.top || o.top > e.bottom)
  }, $(".module").length > 0 && $(".module img").each(function() {
    $(this).onscreen() && $(this).addClass("already-visible")
  }), $(window).scroll(function() {
    $.fn.onscreen = function() {
      var t = $(window),
          o = { top: t.scrollTop(), left: t.scrollLeft() };
      o.right = o.left + t.width(), o.bottom = o.top + t.height();
      var e = this.offset();
      return e.right = e.left + this.outerWidth(), e.bottom = e.top + this.outerHeight(), !(o.right < e.left || o.left > e.right || o.bottom < e.top || o.top > e.bottom)
    }, $(".module").length > 0 && $(".module img").each(function() {
      $(this).onscreen() && $(this).addClass("come-in")
    }), $(".parallax div").each(function() {
      if (screenWidth > 767) {
        if ($(this).onscreen()) {
          var t = $(this).height(),
              o = $(this).parent().offset().top - t,
              e = $(window).scrollTop(),
              i = (e - o) / t;
          $(this).css("opacity", i)
        }
      }
    }), $(".autoplay-sound").each(function(t) {
      var o = $(this).find(".audio").get(0);
      $(this).onscreen(!0) && $(".icon-sound-off").length > 0 ? o.play() : o.pause()
    })
  });

  //Audio
  $(".control").click(function(){var o=document.getElementsByTagName("audio")[0];o.paused?(o.play(),$(".control").toggleClass("icon-sound-on icon-sound-off")):(o.pause(),$(".control").toggleClass("icon-sound-on icon-sound-off"))});

  //Light to dark transition
  $(window).scroll(function(){if($("div").hasClass("js-transnight")){var o=$(".sunset").offset().top,t=$(".night").offset().top,n=[250,250,250],a=[5,5,5],s=[a[0]-n[0],a[1]-n[1],a[1]-n[0]],r=($(this).scrollTop()-o)/(t-o);r=Math.min(1,Math.max(0,r));var h=[Math.round(n[0]+s[0]*r),Math.round(n[1]+s[1]*r),Math.round(n[2]+s[2]*r)];$(".transnight").css("background-color","rgb("+h.join(",")+")")}});
});
