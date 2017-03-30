$(document).ready(function() {
	
/*========================================
				NAVIGATION
========================================*/
	$('.main_navy a').on('click',function(event){
			
		var $this = $(this),
			link_class = $this.attr('class'),
			block = $("#"+link_class),
			block_offset = block.offset(),
			block_top = block_offset.top,
			speed = 2,
			time = block_top/speed;	
			
		if(link_class == "home"){
			time = 800;
		}
				
		event.preventDefault();			
		$('body,html').delay(300).animate({scrollTop:block_top}, time);
		$('.main_navy').animate({right:-240},500);
	});
		
	$(".navigation span").on('click',function(){
		$('.main_navy').animate({right: 0},500);
	});
	
		
	$('.main_navy span.close').on('click',function(){
		$('.main_navy').animate({right:-240},500);
	});
	
	
	$('<div id="arrowUp">UP</div>')
		.css({
			'width':'42px',
			'height':'42px',
			'backgroundColor':'#3d506f',
			'borderRadius':'5px',
			'borderColor':'#fff',
			'borderStyle':'solid',
			'borderWidth':'1px',
			'cursor':'pointer',
			'position':'fixed',
			'right':'20px',
			'bottom':'20px',
			'opacity':'0.4',
			'textAlign':'center',
			'line-height':'42px',
			'color':'#fff',
			'fontWeight':'bold',
		})
		.appendTo('body')
		.hide();
	
		
	$('#arrowUp')
		.hover(function(){
			$(this).animate({
				'opacity':'1'
			},200);
		},function(){
			$(this).animate({
				'opacity':'0.4'
			},600);
		})
		.click(function() {

			$('body, html').animate({scrollTop: 0},'slow');
		});
		


	$(window).scroll(function() {
	    var wh = $(this).height();
	    var scrTop = $(this).scrollTop();
        var animHeight = scrTop + wh - 100;

		if ( scrTop > 250 ) {
			$('#arrowUp').fadeIn('slow');
		} else {
			$('#arrowUp').fadeOut('slow');
		}



		if( animHeight >=  $('h2').offset().top ){

	        $('h2').css({visibility:"visible"}).addClass('animatedH2');
        }

		if ( animHeight >=  $('#skills').offset().top ){
            $('.htmlSkill').addClass('animateHtml');
            $('.jsSkill').addClass('animateJs');
            $('.designSkill').addClass('animateDesign');
            $('.photoSkill').addClass('animatePhoto');
        } else {
            $('.htmlSkill').removeClass('animateHtml');
            $('.jsSkill').removeClass('animateJs');
            $('.designSkill').removeClass('animateDesign');
            $('.photoSkill').removeClass('animatePhoto');
        }
	});

	console.log($('#skills').offset().top);
	
/*========================================
				PLACEHOLDER
========================================*/
	
	$(".our_contact input[type='text']").each(function() {
		$(this)
			.data('default', $(this).val())
			.addClass('inactive')
			.focus(function() {	
				$(this).removeClass('inactive');
					if($(this).val() === $(this).data('default') || $(this).val() === '') {
					$(this).val('');
				}
			})
			.blur(function() {
				if($(this).val() === '') {
					$(this).addClass('inactive').val($(this).data('default'));
				}
			});
	});
	
/*========================================
				BIOGRAPHY
========================================*/
	$triangle = $('<span id="triangle"></span>');
	
	$('li.person').on('click', function(event){
		
		event.preventDefault();
		$triangle_start = $(this).position().left + $(this).outerWidth()/2 - $triangle.width()/2;
		
		if (!$(this).hasClass('active_person')){
			$(this)
				.addClass('active_person')
				.siblings()
				.removeClass('active_person')
				.parents('#about_us')
				.find('div.about_person')
				.eq($(this).index())
				.fadeIn(150)
				.siblings('div.about_person')
				.hide();
		}
		
		if($('#person_biography').css('display') == 'none'){
			$triangle.css({
				'background': '#161f32',
				'display': 'block',
				'position': 'absolute',
				'transform': 'rotate(45deg)',
				'width': '30px',
				'height': '30px',
				'opacity': '0',
				'left': $triangle_start,
				'bottom': '-30px',
				})
			.appendTo('.our_personal')
			.animate({'bottom': '-15px','opacity':' 1'},500);
		} else {
			
	
			$triangle_finish = $(this).position().left + $(this).outerWidth()/2-$triangle.width()/2;
			$triangle.animate({
				left: $triangle_finish
			},500, 'linear');
	
		}
		
		$('#person_biography').slideDown(500);
				
	});
		
	
	$('#person_biography span.close').on('click',function(){
		
		$('#person_biography').slideUp(500);		
		$('.our_personal li').removeClass('active_person');
		$triangle.animate({'bottom': '-30px','opacity':'0'},500);
		$triangle.remove();
	});
	
	
/*========================================
				PORTFOLIO
========================================*/
	
	
	$('.example').on('click',function(){
		
		var $this = $(this),
			$container = $('.example_details'),
			$img = $('<div class=" example_img l_blue"></div>'),
			$description = $('<div class="example_description"></div>'),
			$attr = $this.find('img').attr('src');
						
		var	$from = 0, 
			$to = $attr.length - 4, //.jpg;
			$attr_src = $attr.substring($from,$to)+'_big.jpg';
		
		if (!$this.hasClass('active_slide')){
		
			$('.example').removeClass('active_slide');
			$container.children('div').remove();
			
			$('<img>')
				.attr('src', $attr_src)
				.appendTo($img);

			
			if ($this.hasClass('web')){
				$description.load('examples.html .web');
			} else if ($this.hasClass('graphic')){
				$description.load('examples.html .graphic');
			} else if ($this.hasClass('photography')){
				$description.load('examples.html .photography');
			}
					
			$img.appendTo($container);
			$description.appendTo($container);
			
			$container.slideDown(500);
		}
		
		$this.addClass('active_slide');
		
	});
	
	$('.example_details span.close').on('click',function(){
		$('.example').removeClass('active_slide');
		$('.example_details').slideUp(500, function(){
			$(this).children('div').empty();
		});
	});

/*========================================
				SLIDER
 ========================================*/

    $("#lightSlider").lightSlider({
        item: 1,
        auto: true,
        speed: 1600,
        pause: 4000,
        controls: false,
        loop: true,
        pager: true,
        enableDrag:false,
    });

});


/*========================================
				MAP
========================================*/

var map;
function initMap() {
  var myLatLng = {lat: 50.4495471, lng: 30.5248801};
  map = new google.maps.Map(document.getElementById('map'), {
    center: myLatLng,
    zoom: 17, // 17
    zoomControl: true,
    scrollwheel: false,
  });

  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    icon: 'img/marker.png',
    title: 'Здесь был Я!'
  });

  var styles = [
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#e3e2f5"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "visibility": "simplified"
      }
    ]
  },
  {
    "featureType": "landscape.man_made",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#161f32"
      }
    ]
  },
  {
    "featureType": "poi.medical",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#f47866"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#004230"
      }
    ]
  },
  {
    "featureType": "poi.place_of_worship",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#aafdb5"
      }
    ]
  },
  {
    "featureType": "poi.school",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#b7b8f0"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#222c40"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#6460fb"
      }
    ]
  }
];

  map.setOptions({styles: styles});

}
 