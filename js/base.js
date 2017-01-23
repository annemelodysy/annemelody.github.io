$(".thumb img").css("display","none");
$(".parallax img").css("display","none");
var bgHeight = $(window).height();
var bgWidth = $(window).width();

$(document).ready(function() {
  var $container = $('#thumbnails');

  //Calculate Min and Max for blasting
  function rand(min, max) {
    return parseInt(Math.round(min + Math.random() * (max - min)));
  }
  //Check if journal-cover exists on page and switch cover
  if ($("#journal-cover").length) {
    function getBgUrl(el) {
      var bg = "";
      if (el.currentStyle) { // IE
          bg = el.currentStyle.backgroundImage;
      } else if (document.defaultView && document.defaultView.getComputedStyle) { // Firefox
          bg = document.defaultView.getComputedStyle(el, "").backgroundImage;
      } else { // try and get inline style
          bg = el.style.backgroundImage;
      }
      return bg.replace(/url\(['"]?(.*?)['"]?\)/i, "$1");
    }

    var image = document.createElement('img');
    image.src = getBgUrl(document.getElementById('journal-cover'));

    // Blast.js separate the characters
    $('.blastable').blast({
      delimiter: 'character',
      tag: 'span',
    });

    $('.blastable').css('opacity','1');

    //Blast characters randomly
    $('.blast').each(function() {
      $(this).delay(rand(100,1500)).fadeTo(1500,1);
    });
    //Hide text when scrolling
    $(window).scroll(function(){
      $(".blastable").css("opacity", 1 - $(window).scrollTop() / 300);
    });
  }

  /////Section snap
  !function(o){o.fn.sectionsnap=function(n){var t,i=o.extend({delay:100,selector:".section",reference:.9,animationTime:400,offsetTop:0,offsetBottom:0},n),e=this,r="down",c=o(window).scrollTop(),s=!1,w=function(){r=o(window).scrollTop()>=c?"down":"up",c=o(window).scrollTop()},f=function(){var n,t=e.find(i.selector),c=o(window).scrollTop(),s=o(window).height(),w=s*i.reference,f=c+w-1;return"down"==r?t.each(function(){var t=o(this).position().top;return t>c&&f>=t?(n=o(this),!1):void 0}):(f=c-w+1,t.each(function(){var t=o(this).position().top;return c>t&&t>=f?(n=o(this),!1):void 0})),n},l=function(){var n=f();n&&(s=!0,o("html, body").animate({scrollTop:n.offset().top},i.animationTime,function(){window.clearTimeout(t),s=!1}))},d=function(){if(!s){var n=o(window).scrollTop();n<i.offsetTop||n>o("html").height()-o(window).height()-i.offsetBottom||(w(),window.clearTimeout(t),t=window.setTimeout(l,i.delay))}};return o(window).scroll(d),this}}(jQuery);

  $("body").sectionsnap({delay:100,selector:".snap",reference:.2,animationTime:500});

  /////Parallax effect
  var thumb=$(".thumb img").attr("src");$("#journal-cover").css("background-image","url("+thumb+")"),$(".parallax").each(function(){var a=$(this).find("img").attr("src");$(this).css("background-image","url("+a+")")});

  ////Fog Effect
  function Particle(t){this.x=0,this.y=0,this.xVelocity=0,this.yVelocity=0,this.radius=5,this.context=t,this.draw=function(){return this.image?void this.context.drawImage(this.image,this.x-128,this.y-128):(this.context.beginPath(),this.context.arc(this.x,this.y,this.radius,0,2*Math.PI,!1),this.context.fillStyle="rgba(0, 255, 255, 1)",this.context.fill(),void this.context.closePath())},this.update=function(){this.x+=this.xVelocity,this.y+=this.yVelocity,this.x>=canvasWidth?(this.xVelocity=-this.xVelocity,this.x=canvasWidth):this.x<=0&&(this.xVelocity=-this.xVelocity,this.x=0),this.y>=canvasHeight?(this.yVelocity=-this.yVelocity,this.y=canvasHeight):this.y<=0&&(this.yVelocity=-this.yVelocity,this.y=0)},this.setPosition=function(t,i){this.x=t,this.y=i},this.setVelocity=function(t,i){this.xVelocity=t,this.yVelocity=i},this.setImage=function(t){this.image=t}}function generateRandom(t,i){return Math.random()*(i-t)+t}function init(){var t=document.getElementById("fog");if(t.getContext){context=t.getContext("2d");for(var i=0;particleCount>i;++i){var e=new Particle(context);e.setPosition(generateRandom(0,canvasWidth),generateRandom(0,canvasHeight)),e.setVelocity(generateRandom(-maxVelocity,maxVelocity),generateRandom(-maxVelocity,maxVelocity)),particles.push(e)}}else alert("Please use a modern browser")}function draw(){context.fillStyle="rgba(0, 0, 0, 0.2)",context.fillRect(0,0,400,400),particles.forEach(function(t){t.draw()})}function update(){particles.forEach(function(t){t.update()})}var particles=[],particleCount=400,maxVelocity=2,targetFPS=15,canvasWidth=window.innerWidth,canvasHeight=window.innerHeight,imageObj=new Image;imageObj.onload=function(){particles.forEach(function(t){t.setImage(imageObj)})},imageObj.src="http://annemelody.com/assets/2015/lighthouse/smoke.png";var context;$("#fog").length&&init(),context&&setInterval(function(){update(),draw()},1e3/targetFPS);

  /////Contact Page Overlay
  $('#trigger-overlay').click(function(){
    $('.menu').fadeOut(200);
    $('body').css('overflow','hidden');
    $('.contact-page').fadeIn(300).css('display', 'flex');
  });
  $('.overlay-close').click(function(){
    $('.contact-page').fadeOut(300);
    $('body').css('overflow','');
    $('.menu').fadeIn(200);
  });

  /////Fade
  $.fn.onscreen=function(){var t=$(window),o={top:t.scrollTop(),left:t.scrollLeft()};o.right=o.left+t.width(),o.bottom=o.top+t.height();var e=this.offset();return e.right=e.left+this.outerWidth(),e.bottom=e.top+this.outerHeight(),!(o.right<e.left||o.left>e.right||o.bottom<e.top||o.top>e.bottom)},$(".module").length>0&&$(".module").each(function(){$(this).onscreen()&&$(this).addClass("already-visible")}),$(".block").length>0&&$(".block").each(function(){$(this).onscreen()&&$(this).addClass("fade-visible")}),$(window).scroll(function(){$.fn.onscreen=function(){var t=$(window),o={top:t.scrollTop(),left:t.scrollLeft()};o.right=o.left+t.width(),o.bottom=o.top+t.height();var e=this.offset();return e.right=e.left+this.outerWidth(),e.bottom=e.top+this.outerHeight(),!(o.right<e.left||o.left>e.right||o.bottom<e.top||o.top>e.bottom)},$(".module").length>0&&$(".module").each(function(){$(this).onscreen()&&$(this).addClass("come-in")}),$(".block").length>0&&$(".block").each(function(){$(this).onscreen()&&$(this).addClass("fade-in")}),$(".opacity").each(function(){if($(this).onscreen()){var t=$(this).height(),o=$(this).parent().offset().top-t,e=$(window).scrollTop(),i=(e-o)/t;$(this).css("opacity",i)}}),$(".volume").each(function(t){var o=$(this).find(".audio").get(0);$(this).onscreen(!0)&&$(".fa-volume-up").length>0?o.play():o.pause()})});

  //Audio stop
  $(".control").click(function(){var o=document.getElementsByTagName("audio")[0];o.paused?(o.play(),$(".control").toggleClass("fa-volume-up fa-volume-off")):(o.pause(),$(".control").toggleClass("fa-volume-up fa-volume-off"))});

  //Light to dark transition
  $(window).scroll(function(){if($("#journal-content").hasClass("transNight")){var o=$(".sunset").offset().top,t=$(".night").offset().top,n=[250,250,250],a=[0,0,0],s=[a[0]-n[0],a[1]-n[1],a[1]-n[0]],r=($(this).scrollTop()-o)/(t-o);r=Math.min(1,Math.max(0,r));var h=[Math.round(n[0]+s[0]*r),Math.round(n[1]+s[1]*r),Math.round(n[2]+s[2]*r)];$("body").css("background-color","rgb("+h.join(",")+")")}});
});

//Horizontal Scroll
$(window).on("load",function(){var i=$(window).width();$(".horizontal-inner img").css("display","block"),i>700&&$(".horizontal-inner").each(function(){var i=$(window).height()/2.5,n=23;$(this).find("img").each(function(){$(this).css("height",i),n+=$(this).outerWidth(!0)}),$(this).css("width",n)})});
