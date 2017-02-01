(function (app) {

    'use strict';

    function ScrollTopBtnController($element) {
        var ctrl = this;
        var windowHeight = window.innerHeight,
            bodyHeight = document.querySelector('body').offsetHeight,
            elemClasses = $element.children()[0].classList;

        ctrl.scrollToTop = scrollToTop;

        function scrollToTop() {
            var scrollDuration = 100;
            var scrollStep = -window.scrollY / (scrollDuration / 15),
                scrollInterval = setInterval(function(){
                    if ( window.scrollY != 0 ) {
                        window.scrollBy( 0, scrollStep );
                    }
                    else clearInterval(scrollInterval);
                },15);
        }

        window.addEventListener('scroll', function () {
            if ((window.pageYOffset || document.documentElement.scrollTop) > 300) {
                elemClasses.add('visible');
            } else {
                elemClasses.remove('visible');
            }
        });

    }

    app.component('scrollTopBtn', {
        templateUrl: 'js/component/scrollTopBtn/scrollTopBtn.html',
        controller: ScrollTopBtnController,
        controllerAs: 'ctrl'
    });

}(require('angular').module('App')));


