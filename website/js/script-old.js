
(function($){ // preserve scope
	var openstatus = "closed";
	var easeType = "easeOutExpo";
	var GNpausetext = $('<span/>',{
							class: 'playlabel',
							text: ' (click to pause)'
						});
	
	var bigCloser = $('<a/>',{
							id: 'bigcloser',
							href: "#"
						});
							
	function checkforplayable(){				
	if(document.createElement('audio').canPlayType) { 
		$('dl .audiotoggle').addClass('canplay');
		}
	}
		
	function pauseall(){
		$('audio').each(function(){
			this.pause();
		});		
	}

	function GNaudioplay(){
		var GNplayer = "#"+$(this).attr('rel');
		pauseall();
		$(GNplayer).get(0).play();
		$(this).addClass('playing').append(GNpausetext);   
	}
	
	function GNaudiostop(){
		var GNplayer = "#"+$(this).attr('rel');
		$(GNplayer).get(0).pause();
		$(this).removeClass('playing');
		$('.playlabel').remove();
	}
	
	
	function closeAnim(){
		$(".isopen").animate({
			"bottom": "-1000px"
			}, 1000, easeType, function(){
			$(this).removeClass("isopen");
		});
	}
	
	function openAnim(dlink){
		//alert("open");
		$(dlink).css({
			"bottom": "-1000px"
			}).animate({
				"bottom": "0px"
			}, 600, easeType, function(){
			 $(this).addClass("isopen");
			});
	}
	

	function clickPageOpen(e){
		closeAnim();
		//alert(e);
		if (e !== "#h" && e !== "#releases"){
		openAnim(e);
		var w = e.substring(1, 30);
		//alert(w);
		if ((w !== "about") && (w !== "subscription") && (w !== "news")){w = "releases";}
		$('nav a').removeClass("current");
		$('#nav-'+w).addClass("current");
		openstatus="open";
		}
		return false;
	}
	
	function clickPageClose(){
		var albumclick = $(this).attr("href");
		$('.albumcover').animate({backgroundPosition: '50% 50px'}, {duration: 300});
		$('h5').animate({top:'300px'},{queue:false,duration:200});
		closeAnim();
		openstatus="closed";
		albumoutall();
		return false;
	}
	
	function clickClose(){
		closeAnim();
		$.address.value("/h");
		$('nav a').removeClass("current");
		$('#nav-releases').addClass("current");
		openstatus="closed";
		albumoutall();
		return false;
	}
	
	function albumover(){
		if (openstatus=="closed"){
			$('.albumcover', this).animate({backgroundPosition: '50% 0px'}, {duration: 300});
			$(this).find('h5').animate({top:'385px'},{queue:false,duration:200});
		}
	}

	function albumout(){
		if (openstatus=="closed"){
			$('.albumcover', this).animate({backgroundPosition: '50% 50px'}, {duration: 300});
			$(this).find('h5').animate({top:'300px'},{queue:false,duration:200});
		}
	}

	function albumoutall(){
			$('.albumcover').animate({backgroundPosition: '50% 50px'}, {duration: 300});
			$('h5').animate({top:'300px'},{queue:false,duration:200});
	}
		
	function navClick(){
		$('nav a').removeClass("current");
		$(this).addClass("current");
	}

		
	$(function(){ // same as document ready
	var HIconfig = {    
	 over: albumover, 
	 timeout: 50,
	 sensitivity: 12,
	 interval:10,
	 out: albumout
	};
		$('nav a').click(navClick);
		$('.album').hoverIntent(HIconfig);
		$(".close").click(clickClose);
		$("dl .audiotoggle").toggle(GNaudioplay,GNaudiostop);

		checkforplayable();

		$.address.change(function(event) {
		var stufftoload = event.value.replace(/^\//, '#');  
		clickPageOpen(stufftoload);
		});
	
	});
	
})(jQuery)


