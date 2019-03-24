// Story 

<?php
global $post;
$id = get_the_ID();


?>
<div class="swiper-slide">
	<a id="<?php echo $id;?>" data-post-id="<?php echo $id;?>" data-story-type="standard" href="javascript:;" class="story standard-story story-view storyclick">
	 ...
	</a>
</div>


// Swiper slider init
        var autoplay = 10000;
        var smallSwiperStories = new Swiper('.stories-small-swipe', {
          slidesPerView: 6,
          spaceBetween: 0,
          autoplay: {
            delay: autoplay,
          },
          watchSlidesProgress: true,
          // autoplay: autoplay,
          disableOnInteraction: false,
          onProgress: move,
          // Add this to the config of each swiper instance
          on: {
            slideChange: function() {
              $( '.swiper-slide-active .storyclick', this.$el ).trigger('click');
            }
          },
          setWrapperSize: true,
          // init: false,
          pagination: {
            el: '.swiper-pagination-stories-small',
            clickable: true,
          },
          breakpoints: {
            1600: {
              slidesPerView: 5,
              spaceBetween: 0,
            },
            1400: {
              slidesPerView: 4,
              spaceBetween: 0,
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 0,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 0,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 5,
            },
            640: {
              slidesPerView: 3,
              spaceBetween: 5,
            },
            320: {
              slidesPerView: 3,
              spaceBetween: 0,
            }
          }
        });
        
        
        
        
        
// Fancybox 

$(document).on('click', '.storyclick', function(event) {
            event.stopPropagation();
            event.stopImmediatePropagation();
            var post_id = $(this).attr( 'data-post-id' );
            var storyType = $(this).attr( 'data-story-type' );
            console.log(post_id);
            $.fancybox.close();
        	$.fancybox.open({
                trapFocus: true,
                type: 'ajax',
                src: lioit.ajaxurl,
                ajax: {
                   settings: {
                        data:  {
                            action: 'storyview',
                            post_id: post_id,
                 			story_type : storyType,
                            security : lioit.nonce,
                        },
                        beforeSend: function(xhr) {

                        },
                        complete: function(data, xher) {
                            init_bg_data_img();
                            init_handel();
                        },
                        success: function(data){
                            $('.fancybox-content').html(data); // insert data
                        }
                    }
                },
                afterShow: function( instance, current ) {
                	init_swiper();
                },
                scrollbar: {
                    el: '.swiper-scrollbar',
                    draggable: true,
                },
                touch: {
                   vertical: true,
                   momentum: true
                },
                 baseTpl:
                   '<div class="fancybox-container stories-modal-container" role="dialog" tabindex="-1">' +
                   '<div class="fancybox-bg stories-modal-bg"></div>' +
                   '<div class="fancybox-inner stories-modal-inner">' +
                   '<div class="fancybox-infobar stories-modal-infobar"><span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span></div>' +
                   '<div class="fancybox-toolbar stories-modal-toolbar">{{buttons}}</div>' +
                   '<div class="fancybox-navigation stories-modal-navigation">{{arrows}}</div>' +
                   '<div class="fancybox-stage stories-modal-stage"></div>' +
                   '<div class="fancybox-caption stories-modal-caption"></div>' +
                   "</div>" +
                   "</div>",
                iframe: {
                   tpl:
                     '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" allowfullscreen allow="autoplay; fullscreen" src=""></iframe>',
                   preload: true,
                   css: {},
                   attr: {
                     scrolling: "auto"
                   }
                },
        	});
        	return false;
        });
