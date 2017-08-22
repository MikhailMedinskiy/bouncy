;(function ($) {
    // Scripts that will only run once the page Document Object Model (DOM) is ready for JavaScript code to execute.

    var lastId,
	    topMenu = $(".menu__list"),
	    topMenuHeight = topMenu.outerHeight()+15,
	    // All list items
	    menuItems = topMenu.find("a"),
	    // Anchors corresponding to menu items
	    scrollItems = menuItems.map(function(){
	      var item = $($(this).attr("href"));
	      if (item.length) { return item; }
	    });

	// Bind click handler to menu items
	// so we can get a fancy scroll animation
	menuItems.click(function(e){
		var href = $(this).attr("href"),
		offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
		$('html, body').stop().animate({ 
		    scrollTop: offsetTop
		}, 1000);
		e.preventDefault();

	});


    $(document).ready(function () {

    	$('.team-slider').slick({
    		dots: true,
    		arrows: false
    	});
    	$('.testimonials-slider').slick({
    		dots: true,
    		arrows: false,
    		autoplay: true,
  			autoplaySpeed: 4000
    	})

    	$('.next-block').on("click", function(e){
    			e.preventDefault();
    		   $('html, body').animate({
			        scrollTop: $( $.attr(this, 'href') ).offset().top
			    }, 1000);
			   })

    });


    $(window).scroll(function() {

    	 var fromTop = $(this).scrollTop()+topMenuHeight;
   
		   // Get id of current scroll item
		   var cur = scrollItems.map(function(){
		     if ($(this).offset().top < fromTop)
		       return this;
		   });
		   // Get the id of the current element
		   cur = cur[cur.length-1];
		   var id = cur && cur.length ? cur[0].id : "";
		   
		   if (lastId !== id) {
		       lastId = id;
		       // Set/remove active class
		       menuItems
		         .removeClass("menu__link--active")
		         .filter("[href='#"+id+"']").addClass("menu__link--active");
		   }      

	    var scroll = $(window).scrollTop();

	     //>=, not <=
	    if (scroll >= 100) {
	        //clearHeader, not clearheader - caps H
	        $(".header").addClass("header--light");
	    } else{
	    	$('.header').removeClass('header--light')
	    }
	}); //missing );


    // Scripts that will run after the whole page is loaded (images, videos, iframes. etc)
    $(window).on('load', function () {

    	$(".loader_inner").fadeOut();
		$(".loader").delay(400).fadeOut("slow");

    	var $grid = $('.portfolio__wrapper').isotope({
    		percentPosition: true,
    		masonry: {
			    columnWidth: '.portfolio__item',
			  }

    	});

		// filter items on button click
		$('.filter').on( 'click', '.filter__link', function(event) {
			event.preventDefault();

		 	var filterValue = $(this).attr('data-filter');
		 	$grid.isotope({ filter: filterValue });

		 	$('.filter__link').removeClass('filter__link--active');
		 	$(this).addClass('filter__link--active');
		});

		//MAP

		var mapContainer = $('#map-wrapper')[0];
		var odessaLatLng = {lat: 46.479319, lng: 30.723166};
      	var odessaIcon = 'img/map-marker.png';

      	var map = new google.maps.Map(mapContainer, {
	        center: odessaLatLng,
	        zoom: 17,
	        zoomControl: false,
			mapTypeControl: false,
			scaleControl: false,
			streetViewControl: false,
			rotateControl: false,
			fullscreenControl: false
      	});

      	var marker = new google.maps.Marker({
	       position: odessaLatLng,
	       map: map,
	       icon: odessaIcon
	    });

	    var scroll = $(window).scrollTop();

	    $(".intro__title").animated("fadeInDown","fadeOutUp");
	    $(".intro__subtitle").animated("fadeInUp","fadeOutUp");
	    $(".section .container").animated("fadeInLeft","fadeOutUp");

    });

    // Scripts that will run on window resize
    $(window).on('resize', function () {

    });


})(jQuery); // Fully reference jQuery after this point.
