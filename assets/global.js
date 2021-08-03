// function getFocusableElements(container) {
//   return Array.from(
//     container.querySelectorAll(
//       "summary, a[href], button:enabled, [tabindex]:not([tabindex^='-']), [draggable], area, input:not([type=hidden]):enabled, select:enabled, textarea:enabled, object, iframe"
//     )
//   );
// }

// const trapFocusHandlers = {};

// function trapFocus(container, elementToFocus = container) {
//   var elements = getFocusableElements(container);
//   var first = elements[0];
//   var last = elements[elements.length - 1];

//   removeTrapFocus();

//   trapFocusHandlers.focusin = (event) => {
//     if (
//       event.target !== container &&
//       event.target !== last &&
//       event.target !== first
//     )
//       return;

//     document.addEventListener('keydown', trapFocusHandlers.keydown);
//   };

//   trapFocusHandlers.focusout = function() {
//     document.removeEventListener('keydown', trapFocusHandlers.keydown);
//   };

//   trapFocusHandlers.keydown = function(event) {
//     if (event.code.toUpperCase() !== 'TAB') return; // If not TAB key
//     // On the last focusable element and tab forward, focus the first element.
//     if (event.target === last && !event.shiftKey) {
//       event.preventDefault();
//       first.focus();
//     }

//     //  On the first focusable element and tab backward, focus the last element.
//     if (
//       (event.target === container || event.target === first) &&
//       event.shiftKey
//     ) {
//       event.preventDefault();
//       last.focus();
//     }
//   };

//   document.addEventListener('focusout', trapFocusHandlers.focusout);
//   document.addEventListener('focusin', trapFocusHandlers.focusin);

//   elementToFocus.focus();
// }

// function pauseAllMedia() {
//   document.querySelectorAll('.js-youtube').forEach((video) => {
//     video.contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
//   });
//   document.querySelectorAll('.js-vimeo').forEach((video) => {
//     video.contentWindow.postMessage('{"method":"pause"}', '*');
//   });
//   document.querySelectorAll('video').forEach((video) => video.pause());
//   document.querySelectorAll('product-model').forEach((model) => model.modelViewerUI?.pause());
// }

// function removeTrapFocus(elementToFocus = null) {
//   document.removeEventListener('focusin', trapFocusHandlers.focusin);
//   document.removeEventListener('focusout', trapFocusHandlers.focusout);
//   document.removeEventListener('keydown', trapFocusHandlers.keydown);

//   if (elementToFocus) elementToFocus.focus();
// }

// class QuantityInput extends HTMLElement {
//   constructor() {
//     super();
//     this.input = this.querySelector('input');
//     this.changeEvent = new Event('change', { bubbles: true })

//     this.querySelectorAll('button').forEach(
//       (button) => button.addEventListener('click', this.onButtonClick.bind(this))
//     );
//   }

//   onButtonClick(event) {
//     event.preventDefault();
//     const previousValue = this.input.value;

//     event.target.name === 'plus' ? this.input.stepUp() : this.input.stepDown();
//     if (previousValue !== this.input.value) this.input.dispatchEvent(this.changeEvent);
//   }
// }

// customElements.define('quantity-input', QuantityInput);

// function debounce(fn, wait) {
//   let t;
//   return (...args) => {
//     clearTimeout(t);
//     t = setTimeout(() => fn.apply(this, args), wait);
//   };
// }

// const serializeForm = form => {
//   const obj = {};
//   const formData = new FormData(form);
//   for (const key of formData.keys()) {
//     obj[key] = formData.get(key);
//   }
//   return JSON.stringify(obj);
// };

// function fetchConfig(type = 'json') {
//   return {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json', 'Accept': `application/${type}` }
//   };
// }

// /*
//  * Shopify Common JS
//  *
//  */
// if ((typeof window.Shopify) == 'undefined') {
//   window.Shopify = {};
// }

// Shopify.bind = function(fn, scope) {
//   return function() {
//     return fn.apply(scope, arguments);
//   }
// };

// Shopify.setSelectorByValue = function(selector, value) {
//   for (var i = 0, count = selector.options.length; i < count; i++) {
//     var option = selector.options[i];
//     if (value == option.value || value == option.innerHTML) {
//       selector.selectedIndex = i;
//       return i;
//     }
//   }
// };

// Shopify.addListener = function(target, eventName, callback) {
//   target.addEventListener ? target.addEventListener(eventName, callback, false) : target.attachEvent('on'+eventName, callback);
// };

// Shopify.postLink = function(path, options) {
//   options = options || {};
//   var method = options['method'] || 'post';
//   var params = options['parameters'] || {};

//   var form = document.createElement("form");
//   form.setAttribute("method", method);
//   form.setAttribute("action", path);

//   for(var key in params) {
//     var hiddenField = document.createElement("input");
//     hiddenField.setAttribute("type", "hidden");
//     hiddenField.setAttribute("name", key);
//     hiddenField.setAttribute("value", params[key]);
//     form.appendChild(hiddenField);
//   }
//   document.body.appendChild(form);
//   form.submit();
//   document.body.removeChild(form);
// };

// Shopify.CountryProvinceSelector = function(country_domid, province_domid, options) {
//   this.countryEl         = document.getElementById(country_domid);
//   this.provinceEl        = document.getElementById(province_domid);
//   this.provinceContainer = document.getElementById(options['hideElement'] || province_domid);

//   Shopify.addListener(this.countryEl, 'change', Shopify.bind(this.countryHandler,this));

//   this.initCountry();
//   this.initProvince();
// };

// Shopify.CountryProvinceSelector.prototype = {
//   initCountry: function() {
//     var value = this.countryEl.getAttribute('data-default');
//     Shopify.setSelectorByValue(this.countryEl, value);
//     this.countryHandler();
//   },

//   initProvince: function() {
//     var value = this.provinceEl.getAttribute('data-default');
//     if (value && this.provinceEl.options.length > 0) {
//       Shopify.setSelectorByValue(this.provinceEl, value);
//     }
//   },

//   countryHandler: function(e) {
//     var opt       = this.countryEl.options[this.countryEl.selectedIndex];
//     var raw       = opt.getAttribute('data-provinces');
//     var provinces = JSON.parse(raw);

//     this.clearOptions(this.provinceEl);
//     if (provinces && provinces.length == 0) {
//       this.provinceContainer.style.display = 'none';
//     } else {
//       for (var i = 0; i < provinces.length; i++) {
//         var opt = document.createElement('option');
//         opt.value = provinces[i][0];
//         opt.innerHTML = provinces[i][1];
//         this.provinceEl.appendChild(opt);
//       }

//       this.provinceContainer.style.display = "";
//     }
//   },

//   clearOptions: function(selector) {
//     while (selector.firstChild) {
//       selector.removeChild(selector.firstChild);
//     }
//   },

//   setOptions: function(selector, values) {
//     for (var i = 0, count = values.length; i < values.length; i++) {
//       var opt = document.createElement('option');
//       opt.value = values[i];
//       opt.innerHTML = values[i];
//       selector.appendChild(opt);
//     }
//   }
// };

// class MenuDrawer extends HTMLElement {
//   constructor() {
//     super();

//     this.mainDetailsToggle = this.querySelector('details');
//     const summaryElements = this.querySelectorAll('summary');
//     this.addAccessibilityAttributes(summaryElements);

//     if (navigator.platform === 'iPhone') document.documentElement.style.setProperty('--viewport-height', `${window.innerHeight}px`);

//     this.addEventListener('keyup', this.onKeyUp.bind(this));
//     this.addEventListener('focusout', this.onFocusOut.bind(this));
//     this.bindEvents();
//   }

//   bindEvents() {
//     this.querySelectorAll('summary').forEach(summary => summary.addEventListener('click', this.onSummaryClick.bind(this)));
//     this.querySelectorAll('button').forEach(button => button.addEventListener('click', this.onCloseButtonClick.bind(this)));
//   }

//   addAccessibilityAttributes(summaryElements) {
//     summaryElements.forEach(element => {
//       element.setAttribute('role', 'button');
//       element.setAttribute('aria-expanded', false);
//       element.setAttribute('aria-controls', element.nextElementSibling.id);
//     });
//   }

//   onKeyUp(event) {
//     if(event.code.toUpperCase() !== 'ESCAPE') return;

//     const openDetailsElement = event.target.closest('details[open]');
//     if(!openDetailsElement) return;

//     openDetailsElement === this.mainDetailsToggle ? this.closeMenuDrawer(this.mainDetailsToggle.querySelector('summary')) : this.closeSubmenu(openDetailsElement);
//   }

//   onSummaryClick(event) {
//     const summaryElement = event.currentTarget;
//     const detailsElement = summaryElement.parentNode;
//     const isOpen = detailsElement.hasAttribute('open');

//     if (detailsElement === this.mainDetailsToggle) {
//       if(isOpen) event.preventDefault();
//       isOpen ? this.closeMenuDrawer(summaryElement) : this.openMenuDrawer(summaryElement);
//     } else {
//       trapFocus(summaryElement.nextElementSibling, detailsElement.querySelector('button'));

//       setTimeout(() => {
//         detailsElement.classList.add('menu-opening');
//       });
//     }
//   }

//   openMenuDrawer(summaryElement) {
//     setTimeout(() => {
//       this.mainDetailsToggle.classList.add('menu-opening');
//     });
//     summaryElement.setAttribute('aria-expanded', true);
//     trapFocus(this.mainDetailsToggle, summaryElement);
//     document.body.classList.add(`overflow-hidden-${this.dataset.breakpoint}`);
//   }

//   closeMenuDrawer(event, elementToFocus = false) {
//     if (event !== undefined) {
//       this.mainDetailsToggle.classList.remove('menu-opening');
//       this.mainDetailsToggle.querySelectorAll('details').forEach(details =>  {
//         details.removeAttribute('open');
//         details.classList.remove('menu-opening');
//       });
//       this.mainDetailsToggle.querySelector('summary').setAttribute('aria-expanded', false);
//       document.body.classList.remove(`overflow-hidden-${this.dataset.breakpoint}`);
//       removeTrapFocus(elementToFocus);
//       this.closeAnimation(this.mainDetailsToggle);
//     }
//   }

//   onFocusOut(event) {
//     setTimeout(() => {
//       if (this.mainDetailsToggle.hasAttribute('open') && !this.mainDetailsToggle.contains(document.activeElement)) this.closeMenuDrawer();
//     });
//   }

//   onCloseButtonClick(event) {
//     const detailsElement = event.currentTarget.closest('details');
//     this.closeSubmenu(detailsElement);
//   }

//   closeSubmenu(detailsElement) {
//     detailsElement.classList.remove('menu-opening');
//     removeTrapFocus();
//     this.closeAnimation(detailsElement);
//   }

//   closeAnimation(detailsElement) {
//     let animationStart;

//     const handleAnimation = (time) => {
//       if (animationStart === undefined) {
//         animationStart = time;
//       }

//       const elapsedTime = time - animationStart;

//       if (elapsedTime < 400) {
//         window.requestAnimationFrame(handleAnimation);
//       } else {
//         detailsElement.removeAttribute('open');
//         if (detailsElement.closest('details[open]')) {
//           trapFocus(detailsElement.closest('details[open]'), detailsElement.querySelector('summary'));
//         }
//       }
//     }

//     window.requestAnimationFrame(handleAnimation);
//   }
// }

// customElements.define('menu-drawer', MenuDrawer);

// class HeaderDrawer extends MenuDrawer {
//   constructor() {
//     super();
//   }

//   openMenuDrawer(summaryElement) {
//     this.header = this.header || document.getElementById('shopify-section-header');
//     this.borderOffset = this.borderOffset || this.closest('.header-wrapper').classList.contains('header-wrapper--border-bottom') ? 1 : 0;
//     document.documentElement.style.setProperty('--header-bottom-position', `${parseInt(this.header.getBoundingClientRect().bottom - this.borderOffset)}px`);

//     setTimeout(() => {
//       this.mainDetailsToggle.classList.add('menu-opening');
//     });

//     summaryElement.setAttribute('aria-expanded', true);
//     trapFocus(this.mainDetailsToggle, summaryElement);
//     document.body.classList.add(`overflow-hidden-${this.dataset.breakpoint}`);
//   }
// }

// customElements.define('header-drawer', HeaderDrawer);

// class ModalDialog extends HTMLElement {
//   constructor() {
//     super();
//     this.querySelector('[id^="ModalClose-"]').addEventListener(
//       'click',
//       this.hide.bind(this)
//     );
//     this.addEventListener('click', (event) => {
//       if (event.target.nodeName === 'MODAL-DIALOG') this.hide();
//     });
//     this.addEventListener('keyup', () => {
//       if (event.code.toUpperCase() === 'ESCAPE') this.hide();
//     });
//   }

//   show(opener) {
//     this.openedBy = opener;
//     document.body.classList.add('overflow-hidden');
//     this.setAttribute('open', '');
//     this.querySelector('.template-popup')?.loadContent();
//     trapFocus(this, this.querySelector('[role="dialog"]'));
//   }

//   hide() {
//     document.body.classList.remove('overflow-hidden');
//     this.removeAttribute('open');
//     removeTrapFocus(this.openedBy);
//     window.pauseAllMedia();
//   }
// }
// customElements.define('modal-dialog', ModalDialog);

// class ModalOpener extends HTMLElement {
//   constructor() {
//     super();

//     const button = this.querySelector('button');
//     button?.addEventListener('click', () => {
//       document.querySelector(this.getAttribute('data-modal'))?.show(button);
//     });
//   }
// }
// customElements.define('modal-opener', ModalOpener);

// class DeferredMedia extends HTMLElement {
//   constructor() {
//     super();
//     this.querySelector('[id^="Deferred-Poster-"]')?.addEventListener('click', this.loadContent.bind(this));
//   }

//   loadContent() {
//     if (!this.getAttribute('loaded')) {
//       const content = document.createElement('div');
//       content.appendChild(this.querySelector('template').content.firstElementChild.cloneNode(true));

//       this.setAttribute('loaded', true);
//       window.pauseAllMedia();
//       this.appendChild(content.querySelector('video, model-viewer, iframe')).focus();
//     }
//   }
// }

// customElements.define('deferred-media', DeferredMedia);



  function initLinesAnimations(){

    console.log('lines drawn');



      const generalArrow = document.getElementsByClassName('animated-svg')
      for (var i = generalArrow.length - 1; i >= 0; i--) {
        let speed = generalArrow[i].dataset.speed; 
    
        new Vivus(generalArrow[i], {
          type: 'sync',
          duration: speed
        });
      }     

  }


  $(document).ready(() => {



    const getWindowHeight = function(){
      //get viewheigth all devices
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }







    function initHeader(){

      $('.header__main-menu-item').each(function(){
        let left = $(this).position()
        $(this).parent().find('.header__sub-nav').find('ul').first().css('left', `${left.left }px`)
      })

      $('.header__main-menu-item').on('mouseenter', function(){
        let left = $(this).position() 

        $('.header__sub-nav').each(function(){
          $(this).removeClass('active')
        })

        $(this).parent().find('.header__sub-nav').addClass('active')
      })



      $('.header__main-menu-item').on('mouseleave', function(){
        let self = this
        let inSub = false;

        $(this).parent().find('.header__sub-nav').on('mouseenter', function(){
          inSub = true;
        })

        $(this).parent().find('.header__sub-nav').on('mouseleave', function(){
          inSub = false;
          $(self).parent().find('.header__sub-nav').removeClass('active')
        })   

        setTimeout(function(){ 
          if(!inSub){
            $(self).parent().find('.header__sub-nav').removeClass('active')
          }

      

         }, 1000);
      })

      var lastScrollTop = 0;
      $(window).scroll(function(event){
        var st = $(this).scrollTop();
        let $header = $('.header')
  
        if ($('html').hasClass('disable-scrolling')) {
          return;
        }else{
          if(st > 10){
  
            $('.header').removeClass('active')
            
          }

    
          if (st > lastScrollTop){
     
            $('.header').removeClass('active')
  
    
          } else {
        
            $('.header').addClass('active')
          }
          lastScrollTop = st;
        }
      });

      //dark/light mode

      $('.js-switch-theme').on('click', function(){
        if($('body').hasClass('dark')){
          $('body').removeClass('dark')
          $('.header__mobile').removeClass('active')
          //$("html, body").animate({ scrollTop: 0 }, 00);

          $(this).find('li').text('be Punk rock')
        }else{
          $('body').addClass('dark')
          $(this).find('li').text('be Pinkies up')   
          $('.header__mobile').removeClass('active')  
         // $("html, body").animate({ scrollTop: 0 }, 00);   }

          initLinesAnimations()
        }
      })

      //mobile menu
      $('.icon-menu').on('click', function(){
        $('.header__mobile').addClass('active')
        $('.header__mobile').css('transition', '0.4s')

      })

      $('.icon-close').on('click', function(){

        $('.header__mobile').removeClass('active')
      })



      
      $('.header__mobile-has-subs').on('click', function(){

        if ($(this).siblings().find('.header__mobile-submenu').hasClass('active')) {
          $(this).siblings().find('.header__mobile-submenu').removeClass('active')

          $(this).find('svg').removeClass('active')  
          $(this).removeClass('active')
        }else{
          $('.header__mobile-submenu').each(function(){
            $(this).removeClass('active')
          })

          $('.header__mobile-has-subs').each(function(){
            $(this).removeClass('active')
          })


          
          $('.header__mobile-has-subs').find('svg').each(function(){
            $(this).removeClass('active')
            
          })
          $(this).siblings().find('.header__mobile-submenu').addClass('active')
          $(this).find('svg').addClass('active')  
          $(this).addClass('active')
        }   
      })
    }

    function initCarousel(){

      const swiper = new Swiper('.carousel', {
        slidesPerView: 1,
        loop: true,
        on: {
          slideChangeTransitionStart: function (e) {


          
            initLinesAnimations()
       



            $('.slider-left').fadeOut()
            $('.slider-right').fadeOut()
          },
          slideChangeTransitionEnd: function (e) {

            $('.swiper-slide-active').find('.slider-left').show()
            $('.swiper-slide-active').find('.slider-right').hide()
            $('.swiper-slide-next').find('.slider-left').hide()
            $('.swiper-slide-next').find('.slider-right').show()
            },
        },
        pagination: {
          el: '.carousel__swiper-pagination',
          type: 'bullets',
          clickable: "true",
        },
        breakpoints: {
          1024: {
            slidesPerView: 1.09,           
          },

          1400: {
            slidesPerView: 1.08,           
          },
          1600: {
            slidesPerView: 1.06,           
          },

        },

        navigation: {
          prevEl: '.carousel__slide-left-long-bar .slider-left',
          nextEl: '.carousel__slide-left-long-bar .slider-right'
        },
      });


      resizeElements()


      function resizeElements(){
        let latticeHeight = $('.carousel__slide-right-lattice').height()
        let padding = $('.carousel__inner').outerHeight() - $('.carousel__inner').height()
        let imageHeight = $('.carousel__slide-left-image-wrap img').offset().top
        
        
        $('.carousel__slide-left-long-bar').css('top', `-${padding }px`)
        $('.carousel__slide-right-inner').css('height', `calc(100% - ${latticeHeight + 40}px)`)
        $('.carousel__slide-right-h-top').css('top', `${latticeHeight}px`)
        $('.carousel__slide-left-long-bar-top').css('height', `${imageHeight - 53}px`)
      }

      
      $('.js-switch-theme').on('click', function(){
        if($('body').hasClass('dark')){   
          let pinkiesFeat = $('.pinkies-featured').last().attr('data-swiper-slide-index')        
          swiper.slideTo(pinkiesFeat - 1, 1000)    
        }else{    
          let punkFeat = $('.pinkies-punk').first().attr('data-swiper-slide-index')        
          swiper.slideTo(punkFeat - 1, 1000)          
        }
      })

      const left = $('.landing-page__left')
      const right = $('.landing-page__right')   

  
    
    
      right.on('click', function(){
        let punkFeat = $('.pinkies-punk').last().attr('data-swiper-slide-index')        
        swiper.slideTo(punkFeat - 1, 1000)     
      })
    
      left.on('click', function(){
        let pinkiesFeat = $('.pinkies-featured').last().attr('data-swiper-slide-index')        
        swiper.slideTo(pinkiesFeat - 1, 1000)    
      })
    }

    function initOurStory(){   

      if( $(window).width() < 1024 ){
        let image = $('.js-our-story-mob')
        $('.our-story__right p').first().append(image)

        let cutOff = $('.our-story__right p')
        let container = $('.our-story')


        cutOff.each(function(i){
   
          if(i == 1){
            $(this).append('<span class="js-our-story-read-more"><br><br>READ MORE +</span')
          }

          if(i < 2){
            return;
          }

          $(this).hide()
        })

        $('.js-our-story-read-more').on('click', function(){
          $('.js-our-story-read-more').fadeOut()
          cutOff.fadeIn()
        })
      }
    }

    function initFeaturedArticles(){
      

      if($(window).width() < 1025){
        const swiper = new Swiper('.featured-blogs', {
          slidesPerView: 1,
          pagination: {
            el: '.featured-blogs__swiper-pagination',
            type: 'bullets',
            clickable: "true",
          },
          spaceBetween: 20,
        });
      }

    }



    initHeader()
    initLinesAnimations()
    initCarousel()
    initOurStory()
    getWindowHeight()
    initFeaturedArticles()
    var windowWidth = $(window).width();

    window.addEventListener('resize', () => {

      if ($(window).width() != windowWidth) {

        // Update the window width for next time
        windowWidth = $(window).width();

        console.log('resize!!');
        // getWindowHeight()
        // initOurStory()
        // initHeader()
        // initCarousel()
        location.reload();

    }



       //location.reload();
    });
  })



