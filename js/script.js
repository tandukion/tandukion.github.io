/**
 * @author: Dwindra Sulistyoutomo
 */

(function($) {
  "use strict"; // Start of use strict

  const currentYear = document.getElementById('current-year');
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  document.querySelectorAll('a[target="_blank"]').forEach(function(link) {
    const rel = link.getAttribute('rel') || '';
    const hasNoopener = rel.split(/\s+/).includes('noopener');
    const hasNoreferrer = rel.split(/\s+/).includes('noreferrer');
    const nextRel = [
      ...new Set([
        ...rel.split(/\s+/).filter(Boolean),
        ...(hasNoopener ? [] : ['noopener']),
        ...(hasNoreferrer ? [] : ['noreferrer'])
      ])
    ].join(' ');
    link.setAttribute('rel', nextRel);
  });

  // --- PORTFOLIO functions ---
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

  // Resize selected cards and move other projects to the sublist.
  $.fn.filterChildren = function() {
    const children = this.children();
    const selectedProjectCount = config.SelectedProjectCount;

    if (children.length > selectedProjectCount) {
      $('#portfolio-sublist-header').show();
    }

    if (children.length > config.LargeProjectCount) {
      children.eq(config.LargeProjectCount).before(
        '<div class="col-12 content-section-heading text-center mt-4"><h5 class="mb-0">Other Projects</h5></div>'
      );
    }

    children.each(function(i) {
      if (i >= config.LargeProjectCount) {
        let el = $(this);
        el.removeClass("col-lg-6").addClass("col-lg-4"); 
      }

      if (i >= selectedProjectCount) {
        let el = $(this);
        el.detach().appendTo('#portfolio-sublist');
      }
    });
  };

  $('#portfolio-list').orderChildren(config.PortfolioOrder);
  $('#portfolio-list').filterChildren();

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

// });
})(jQuery);
