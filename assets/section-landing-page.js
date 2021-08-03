$(document).ready(() => {

  function disableScrolling(){
    // lock scroll position, but retain settings for later
    var scrollPosition = [
      self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
      self.pageYOffset || document.documentElement.scrollTop  || document.body.scrollTop
    ];
    var html = jQuery('html'); // it would make more sense to apply this to body, but IE7 won't have that
    html.data('scroll-position', scrollPosition);
    html.data('previous-overflow', html.css('overflow'));
    html.css('overflow', 'hidden');
    window.scrollTo(scrollPosition[0], scrollPosition[1]);
    }


    function enableScrolling(){
      // un-lock scroll position
      var html = jQuery('html');
      var scrollPosition = html.data('scroll-position');
      html.css('overflow', html.data('previous-overflow'));
      window.scrollTo(scrollPosition[0], scrollPosition[1])
    }


  disableScrolling()

  const left = $('.landing-page__left')
  const right = $('.landing-page__right')

  right.on('click', function(){
    $('.landing-page').addClass('remove')
    $('body').removeClass('dark')
    initLinesAnimations()
    $('.header').addClass('active')
    setTimeout(function(){ 

      enableScrolling()
    }, 1000);
  })

  left.on('click', function(){
    $('.landing-page').addClass('remove')
    $('body').addClass('dark')
    $('.header').addClass('active')

    setTimeout(function(){ 

      enableScrolling()
     }, 1000);
  })
})