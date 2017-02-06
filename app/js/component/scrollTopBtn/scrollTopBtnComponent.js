(function (app) {

    'use strict';
    const ELEMENT = new WeakMap();
    class ScrollTopBtnController {
        constructor($element) {
            ELEMENT.set(this, $element);

            let elemClasses = ELEMENT.get(this).children()[0].classList;

            window.addEventListener('scroll', function () {
                if ((window.pageYOffset || document.documentElement.scrollTop) > 300) {
                    elemClasses.add('visible');
                } else {
                    elemClasses.remove('visible');
                }
            });
        }

        scrollToTop() {
            let scrollDuration = 100,
                scrollStep = -window.scrollY / (scrollDuration / 15),
                scrollInterval = setInterval(function(){
                    if ( window.scrollY != 0 ) {
                        window.scrollBy( 0, scrollStep );
                    }
                    else clearInterval(scrollInterval);
                },15);
        }
    }

    app.component('scrollTopBtn', {
        templateUrl: 'js/component/scrollTopBtn/scrollTopBtn.html',
        controller: ScrollTopBtnController,
        controllerAs: 'ctrl'
    });

}(require('angular').module('App')));


