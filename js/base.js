$(".parallax img").css("display","none");
var bgHeight = $(window).height();
var bgWidth = $(window).width();

$(document).ready(function() {
  var $container = $('#thumbnails');

  //Calculate Min and Max for blasting
  function rand(min, max) {
    return parseInt(Math.round(min + Math.random() * (max - min)));
  }

  // Blast.js separate the characters
  $('.blastable').blast({
    delimiter: 'character',
    tag: 'span',
  });

  $('.blastable').css('opacity','1');

  //Blast characters randomly
  $('.blast').each(function() {
    $(this).delay(rand(100,1500)).fadeTo(2000,1);
  });
  //Hide text when scrolling
  $(window).scroll(function(){
    $(".blastable").css("opacity", 1 - $(window).scrollTop() / 300);
  });

  /////Parallax effect
  $(".parallax").each(function(){var a=$(this).find("img").attr("src");$(this).css("background-image","url("+a+")")});

  ////Fog Effect
  function Particle(t){this.x=0,this.y=0,this.xVelocity=0,this.yVelocity=0,this.radius=5,this.context=t,this.draw=function(){return this.image?void this.context.drawImage(this.image,this.x-128,this.y-128):(this.context.beginPath(),this.context.arc(this.x,this.y,this.radius,0,2*Math.PI,!1),this.context.fillStyle="rgba(0, 255, 255, 1)",this.context.fill(),void this.context.closePath())},this.update=function(){this.x+=this.xVelocity,this.y+=this.yVelocity,this.x>=canvasWidth?(this.xVelocity=-this.xVelocity,this.x=canvasWidth):this.x<=0&&(this.xVelocity=-this.xVelocity,this.x=0),this.y>=canvasHeight?(this.yVelocity=-this.yVelocity,this.y=canvasHeight):this.y<=0&&(this.yVelocity=-this.yVelocity,this.y=0)},this.setPosition=function(t,i){this.x=t,this.y=i},this.setVelocity=function(t,i){this.xVelocity=t,this.yVelocity=i},this.setImage=function(t){this.image=t}}function generateRandom(t,i){return Math.random()*(i-t)+t}function init(){var t=document.getElementById("fog");if(t.getContext){context=t.getContext("2d");for(var i=0;particleCount>i;++i){var e=new Particle(context);e.setPosition(generateRandom(0,canvasWidth),generateRandom(0,canvasHeight)),e.setVelocity(generateRandom(-maxVelocity,maxVelocity),generateRandom(-maxVelocity,maxVelocity)),particles.push(e)}}else alert("Please use a modern browser")}function draw(){context.fillStyle="rgba(0, 0, 0, 0.2)",context.fillRect(0,0,400,400),particles.forEach(function(t){t.draw()})}function update(){particles.forEach(function(t){t.update()})}var particles=[],particleCount=400,maxVelocity=2,targetFPS=15,canvasWidth=window.innerWidth,canvasHeight=window.innerHeight,imageObj=new Image;imageObj.onload=function(){particles.forEach(function(t){t.setImage(imageObj)})},imageObj.src="http://annemelody.com/assets/2015/lighthouse/smoke.png";var context;$("#fog").length&&init(),context&&setInterval(function(){update(),draw()},1e3/targetFPS);

  /////Fade
  $.fn.onscreen=function(){var t=$(window),o={top:t.scrollTop(),left:t.scrollLeft()};o.right=o.left+t.width(),o.bottom=o.top+t.height();var e=this.offset();return e.right=e.left+this.outerWidth(),e.bottom=e.top+this.outerHeight(),!(o.right<e.left||o.left>e.right||o.bottom<e.top||o.top>e.bottom)},$(".module").length>0&&$(".module").each(function(){$(this).onscreen()&&$(this).addClass("already-visible")}),$(".block").length>0&&$(".block").each(function(){$(this).onscreen()&&$(this).addClass("fade-visible")}),$(window).scroll(function(){$.fn.onscreen=function(){var t=$(window),o={top:t.scrollTop(),left:t.scrollLeft()};o.right=o.left+t.width(),o.bottom=o.top+t.height();var e=this.offset();return e.right=e.left+this.outerWidth(),e.bottom=e.top+this.outerHeight(),!(o.right<e.left||o.left>e.right||o.bottom<e.top||o.top>e.bottom)},$(".module").length>0&&$(".module").each(function(){$(this).onscreen()&&$(this).addClass("come-in")}),$(".block").length>0&&$(".block").each(function(){$(this).onscreen()&&$(this).addClass("fade-in")}),$(".opacity").each(function(){if($(this).onscreen()){var t=$(this).height(),o=$(this).parent().offset().top-t,e=$(window).scrollTop(),i=(e-o)/t;$(this).css("opacity",i)}}),$(".volume").each(function(t){var o=$(this).find(".audio").get(0);$(this).onscreen(!0)&&$(".icon-volume-up").length>0?o.play():o.pause()})});

  //Audio stop
  $(".control").click(function(){var o=document.getElementsByTagName("audio")[0];o.paused?(o.play(),$(".control").toggleClass("icon-volume-up icon-volume-down")):(o.pause(),$(".control").toggleClass("icon-volume-up icon-volume-down"))});

  //Light to dark transition
  $(window).scroll(function(){if($("#journal-content").hasClass("transNight")){var o=$(".sunset").offset().top,t=$(".night").offset().top,n=[250,250,250],a=[0,0,0],s=[a[0]-n[0],a[1]-n[1],a[1]-n[0]],r=($(this).scrollTop()-o)/(t-o);r=Math.min(1,Math.max(0,r));var h=[Math.round(n[0]+s[0]*r),Math.round(n[1]+s[1]*r),Math.round(n[2]+s[2]*r)];$("body").css("background-color","rgb("+h.join(",")+")")}});

  if (bgWidth > 1024) {
    //yearly
    $('.year .item').click(function(){
      $(this).addClass('open');
      $('.item').not(this).removeClass('open');
    });
    $('body').mouseup(function(){
      $('.item').removeClass('open');
    });
  }
});

//Horizontal Scroll
$(window).on("load",function(){var i=$(window).width();$(".horizontal-inner img").css("display","block"),i>700&&$(".horizontal-inner").each(function(){var i=$(window).height()/2.5,n=23;$(this).find("img").each(function(){$(this).css("height",i),n+=$(this).outerWidth(!0)}),$(this).css("width",n)})});
