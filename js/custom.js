/* When DOM is loaded*/
$(document).ready(
  function() {

    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $('a.page-scroll').bind('click', function(event) {
      var $anchor = $(this);
      $('html, body').stop().animate({
        scrollTop: $($anchor.attr('href')).offset().top
      }, 1500, 'easeInOutExpo');
      event.preventDefault();
    });

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function() {
      $('.navbar-toggle:visible').click();
    });

    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
      target: '.navbar-fixed-top'
    })

    var preload = $('.preloader').clone();

    var modal = $('#modal')
      .on('hidden.bs.modal', function(event) {
        $(this).find('.modal-body').html(preload);
      });

    function createmodal(popup, title, href) {
      if ($.trim(title)) {
        popup.find('.modal-title').html($.trim(title));
      }
      if ($.trim(href)) {
        popup.find('.modal-body').load($.trim(href) + " #modal-target");
      }
    }

    if ($.url().param('modal-url')) {
      // use parameters in url
      modal.on('show.bs.modal', function(event) {
        createmodal($(this),
          $.url().param('modal-title'),
          $.url().param('modal-url'));
        // dont check url after
        $(this).on('show.bs.modal', function(event) {
          createmodal($(this),
            $(event.relatedTarget).attr('data-icon') + " " + $(event.relatedTarget).attr('title'),
            $(event.relatedTarget).attr('href'));
        })
      }).modal('show');
    } else {
      // modal : default behaviour (on link clicked)
      modal.on('show.bs.modal', function(event) {
        createmodal($(this),
          $(event.relatedTarget).attr('data-icon') + " " + $(event.relatedTarget).attr('title'),
          $(event.relatedTarget).attr('href'));
      }).modal('hide');
    }

    // init magnify
    modal.on('shown.bs.modal', function(event) {
      $(this).find('[data-toggle="magnify"]').each(function() {
        $(this).magnify();
      })
    });

    // init swipe for mobile
    $("#header-carousel").swiperight(function() {
      $(this).carousel('prev');
    });
    $("#header-carousel").swipeleft(function() {
      $(this).carousel('next');
    });

    $('[data-toggle="popover"]').popover({
      html: true,
      content: function() {
        var id = $(this).attr('data-content-id');
        if (id) {
          return $(id).html();
        } else {
          return $(this).attr('data-content');
        }
      }
    });

    // init wow.js
    new WOW({
      mobile: false
    }).init();

    /*
     Initialisation du lasy
    */
    $("img.lazy").show().lazyload({
      threshold: 500
    });

    /*
    	Preload caroussel img
    */
    $(".preload-img-bg").each(function() {
      var img = new Image();
      img.src = $(this).css('background-image').replace(/^url\(['"]?/, '').replace(/['"]?\)$/, '');
    });

    /*
    	Preload img after dom is ready
    */
    $("img.preload-img").each(function() {
      $(this).attr('src', $(this).attr('data-original'));
    });
    /* time circle init */
    /* http://git.wimbarelds.nl/TimeCircles/index.html */
    $("#DateCountdown").TimeCircles({
      "animation": "smooth",
      "bg_width": 0.2,
      "fg_width": 0.015,
      "circle_bg_color": "#EEEEEE",
      "time": {
        "Days": {
          "text": "Jours",
          "color": "#CCCCCC",
          "show": true
        },
        "Hours": {
          "text": "Heures",
          "color": "#CCCCCC",
          "show": true
        },
        "Minutes": {
          "text": "Minutes",
          "color": "#CCCCCC",
          "show": true
        },
        "Seconds": {
          "text": "Secondes",
          "color": "#CCCCCC",
          "show": true
        }
      }
    });

    // init lazy scripts
    var js,
      fjs = document.getElementsByTagName('script')[0],
      addScript = function(url, id) {
        if (document.getElementById(id)) {
          return;
        }
        js = document.createElement('script');
        js.src = url;
        id && (js.id = id);
        fjs.parentNode.insertBefore(js, fjs);
      };

    // Facebook SDK
    addScript('//connect.facebook.net/fr_FR/sdk.js#xfbml=1&version=v2.4', 'facebook-jssdk');

  }
);