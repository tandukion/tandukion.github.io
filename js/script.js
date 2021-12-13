/**
 * @author: Dwindra Sulistyoutomo
 */

(function($) {
  "use strict"; // Start of use strict

// Get config data first
$.get('_data/_config.yml', function(data) {
  // --- PRE-PROCESS config ---
  let config = jsyaml.load(data);

  // prepend # to identify ID on portfolio order, and add "-card"
  $.each(config.portfolio_order, function(i, value){
    config.portfolio_order[i] = "#"+value+"-card";
  });

  // Sort the portfolio list to add priority to show first
  // Sorting function
  $.fn.orderChildren = function(order) {
    this.each(function() {
      var el = $(this);
      for(var i = order.length - 1; i >= 0; i--) {
        el.prepend(el.children(order[i]));
      }
    });
    return this;
  };

  $('#portfolio-list').orderChildren(config.portfolio_order);

  // Smooth scrolling using jQuery Easing
  $('a.js-scroll-trigger[href*="#"]').click(function() {
    if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
      let target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Scroll to top button appear
  $(document).scroll(function() {
    const scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });

  // Create about image that fit the height of the about content
  $('.img-about').height($('.about-image-wrapper').height());
  $('.img-about').width($('.about-image-wrapper').width());
  $(window).on('resize', function(){
    $('.img-about').height($('.about-image-wrapper').height());
    $('.img-about').width($('.about-image-wrapper').width());
  });

  // Lazy load portofolio modal to reduce page load size
  $('.portfolio-modal').on("show.bs.modal", function () {
    let images = $(this).find('.lazy-load');
    images.each(function(){
      var img = $(this);
      img.attr('src', img.data('src'));
    });
  });

  // Skills pop-up
  $('.img-skill').popover();

});
})(jQuery);

