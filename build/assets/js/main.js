!function($){var $sidebar_a,$window=$(window),$body=$("body"),$sidebar=$("#sidebar");breakpoints({xlarge:["1281px","1680px"],large:["981px","1280px"],medium:["737px","980px"],small:["481px","736px"],xsmall:[null,"480px"]}),"ie"==browser.name&&$body.addClass("is-ie"),$window.on("load",function(){window.setTimeout(function(){$body.removeClass("is-preload")},100)}),$("form").on("click",".submit",function(event){event.stopPropagation(),event.preventDefault(),$(this).parents("form").submit()}),$("#noscript-fb-container").css("display","none"),0<$sidebar.length&&($sidebar_a=$sidebar.find("a")).addClass("scrolly").on("click",function(){var $this=$(this);"#"==$this.attr("href").charAt(0)&&($sidebar_a.removeClass("active"),$this.addClass("active").addClass("active-locked"))}).each(function(){var $this=$(this),id=$this.attr("href"),$section=$(id);$section.length<1||$section.scrollex({mode:"middle",top:"-20vh",bottom:"-20vh",initialize:function(){$section.addClass("inactive")},enter:function(){$section.removeClass("inactive"),0==$sidebar_a.filter(".active-locked").length?($sidebar_a.removeClass("active"),$this.addClass("active")):$this.hasClass("active-locked")&&$this.removeClass("active-locked")}})}),$(".scrolly").scrolly({speed:1e3,offset:function(){return breakpoints.active("<=large")&&!breakpoints.active("<=small")&&0<$sidebar.length?$sidebar.height():0}}),$(".spotlights > section").scrollex({mode:"middle",top:"-10vh",bottom:"-10vh",initialize:function(){$(this).addClass("inactive")},enter:function(){$(this).removeClass("inactive")}}).each(function(){var x,$image=$(this).find(".image"),$img=$image.find("img");$image.css("background-image","url("+$img.attr("src")+")"),(x=$img.data("position"))&&$image.css("background-position",x),$img.hide()}),$(".features").scrollex({mode:"middle",top:"-20vh",bottom:"-20vh",initialize:function(){$(this).addClass("inactive")},enter:function(){$(this).removeClass("inactive")}})}(jQuery);