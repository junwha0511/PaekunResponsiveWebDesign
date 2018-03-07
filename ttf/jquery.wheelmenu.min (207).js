!function($){function predefineAngle(settings){var convert=false;if($.type(settings.angle)=="string"){try{if(eval(settings.angle).length>1)convert=true}catch(err){convert=false}if(convert==true){settings.angle=JSON.parse(settings.angle)}else{switch(settings.angle){case"N":settings.angle=[180,380];break;case"NE":settings.angle=[270,380];break;case"E":settings.angle=[270,470];break;case"SE":settings.angle=[360,470];break;case"S":settings.angle=[360,560];break;case"SW":settings.angle=[90,200];break;case"W":settings.angle=[90,290];break;case"NW":settings.angle=[180,290];break;case"all":settings.angle=[0,360];break}}}return settings}function predefineSpeed(e){if($.type(e.animationSpeed)=="string"){switch(e.animationSpeed){case"slow":e.animationSpeed=[75,700];break;case"medium":e.animationSpeed=[50,500];break;case"fast":e.animationSpeed=[25,250];break;case"instant":e.animationSpeed=[0,0];break}}return e}var defaults={trigger:"click",animation:"fade",angle:[0,360],animationSpeed:"medium"};$.fn.centerAround=function(e){var t=e.offset(),n=e.outerWidth(),r=e.outerHeight(),i=t.left-$(document).scrollLeft()+n/2,s=t.top-$(document).scrollTop()+r/2,o=this.offset();this.css("position","fixed");this.css("top",s-this.outerHeight()/2+"px");this.css("left",i-this.outerWidth()/2+"px");return this};$.fn.flyIn=function(e,t,n,r,i,s,o,u){var a=0;this.stop(true,true);this.each(function(e){i=(u.angle[0]+s*e)*(Math.PI/180);var t=Math.round(n/2+o*Math.cos(i)-$(this).find("a").outerWidth()/2),f=Math.round(r/2+o*Math.sin(i)-$(this).find("a").outerHeight()/2);$(this).animateRotate(360).css({position:"absolute",opacity:0,left:"50%",top:"50%",marginLeft:"-"+$(this).outerWidth()/2,marginTop:"-"+$(this).outerHeight()/2}).delay(a).animate({opacity:1,left:t+"px",top:f+"px"},u.animationSpeed[1]);a+=u.animationSpeed[0]})};$.fn.flyOut=function(e,t){var n=0;this.stop(true,true);$(this.get().reverse()).each(function(){$(this).animateRotate(-360).delay(n).animate({opacity:0,left:e.outerWidth()/2+"px",top:e.outerHeight()/2+"px"},150);n+=15}).promise().done(function(){e.removeClass("active").css("visibility","hidden").hide();t.removeClass("active")})};$.fn.fadeInIcon=function(e,t,n,r,i,s,o,u){var a=0;this.stop(true,true);this.each(function(e){i=(u.angle[0]+s*e)*(Math.PI/180);var t=Math.round(n/2+o*Math.cos(i)-$(this).find("a").outerWidth()/2),f=Math.round(r/2+o*Math.sin(i)-$(this).find("a").outerHeight()/2);$(this).css({position:"absolute",left:t+"px",top:f+"px",opacity:0}).delay(a).animate({opacity:1},u.animationSpeed[1]);a+=u.animationSpeed[0]})};$.fn.fadeOutIcon=function(e,t){var n=0;this.stop(true,true);$(this.get().reverse()).each(function(){$(this).delay(n).animate({opacity:0},150);n+=15}).promise().done(function(){e.removeClass("active").css("visibility","hidden").hide();t.removeClass("active")})};$.fn.hideIcon=function(e,t){var n=this.find(".item"),r=this;switch(t.animation){case"fade":n.fadeOutIcon(r,e);break;case"fly":n.flyOut(r,e);break}};$.fn.showIcon=function(e,t){var n=this,r="6";if(t.trigger=="hover"){var r="3"}e.addClass("active").css({"z-index":r});n.show().css({position:"absolute","z-index":"5",padding:"30px"}).centerAround(e);n.addClass("wheel active").css("visibility","visible").show();if(n.attr("data-angle")){t.angle=n.attr("data-angle")}t=predefineAngle(t);var i=n.width()/2,s=n.find(".item"),o=n,u=o.innerWidth(),a=o.innerHeight(),f=0,l=(t.angle[1]-t.angle[0])/s.length;switch(t.animation){case"fade":s.fadeInIcon(n,e,u,a,f,l,i,t);break;case"fly":s.flyIn(n,e,u,a,f,l,i,t);break}};$.fn.animateRotate=function(e,t,n,r){return this.each(function(){var i=$(this);$({deg:0}).animate({deg:e},{duration:t,easing:n,step:function(e){i.css({transform:"rotate("+e+"deg)"})},complete:r||$.noop})})};$.fn.wheelmenu=function(e){var t=$.extend({},defaults,e);t=predefineSpeed(t);return this.each(function(){var e=$(this);var n=$($(this).attr("href"));n.addClass("wheel");e.css("opacity",0).animate({opacity:1});if(t.trigger=="hover"){e.bind({mouseenter:function(){n.showIcon(e,t)}});n.bind({mouseleave:function(){n.hideIcon(e,t)}})}else{e.click(function(){if(n.css("visibility")=="visible"){n.hideIcon(e,t)}else{n.showIcon(e,t)}})}})}}(window.jQuery)