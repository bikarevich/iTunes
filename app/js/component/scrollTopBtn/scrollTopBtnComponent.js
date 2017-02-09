(function (app) {
    'use strict';

    let variables = new WeakMap();

    class ScrollTopBtnController {
        constructor($element, $scope) {
            variables.set(this, {
                $scope,
                $element : $element
            });

            let elemClasses = $element[0].firstElementChild.classList;

            let scrollHandler = () => {
                if ((window.pageYOffset || document.documentElement.scrollTop) > 300) {
                    elemClasses.add('visible');
                } else {
                    elemClasses.remove('visible');
                }
            };

            window.addEventListener('scroll', scrollHandler);

            variables.get(this).$scope.$on("$destroy", () => {
                window.removeEventListener('scroll', scrollHandler);
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


