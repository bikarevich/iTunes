(function (app) {

        'use strict';

        function LazyLoadController($rootScope, $scope, searchResultsPageService, checkLoaderService, $state) {
            var ctrl = this,
                windowHeight = window.innerHeight,
                bodyHeight = document.querySelector('body').offsetHeight,
                heightUpdated,
                scrolled,
                countVisible = 0,
                itemsStep = 10,
                totalItems = 0;

            ctrl.isSorted = false;
            ctrl.visibleItems = [];
            ctrl.results = [];

            ctrl.goToItemView = goToItemView;
            ctrl.sortType = sortType;

            function goToItemView(trackId, collectionId, linkType, wrapperType) {
                if (wrapperType && wrapperType === 'track') {
                    switch (linkType) {
                        case 'track' :
                            $state.go('song', {id: trackId});
                            break;
                        case 'collection' :
                            $state.go('album', {id: collectionId});
                            break;
                    }
                } else {
                    switch (wrapperType) {
                        case 'track' :
                            $state.go('song', {id: trackId || collectionId});
                            break;
                        case 'album' :
                            $state.go('album', {id: trackId || collectionId});
                            break;
                        case 'audiobook' :
                            $state.go('book', {id: trackId || collectionId});
                            break;
                        case 'book' :
                            $state.go('book', {id: trackId || collectionId});
                            break;
                        default :
                            $state.go('move', {id: trackId || collectionId});
                    }
                }
            }

            function sortType() {
                ctrl.visibleItems.sort(sortByType);
            }

            function sortByType(a, b) {
                if (a.wrapperType > b.wrapperType) return 1;
                if (a.wrapperType < b.wrapperType) return -1;
                if (a.wrapperType == b.wrapperType) {
                    if (a.trackName > b.trackName) return 1;
                    if (a.trackName < b.trackName) return -1;
                }
            }

            function updateBodyHeight() {
                if (!heightUpdated) {
                    bodyHeight = document.querySelector('body').offsetHeight;
                    heightUpdated = true;
                }
            }

            function debounce(func, ms) {
                var isThrottled = false,
                    savedArgs,
                    savedThis;

                function wrapper() {
                    if (isThrottled) {
                        savedArgs = arguments;
                        savedThis = this;
                        return;
                    }
                    func.apply(this, arguments);
                    isThrottled = true;
                    setTimeout(function () {
                        isThrottled = false;
                        if (savedArgs) {
                            wrapper.apply(savedThis, savedArgs);
                            savedArgs = savedThis = null;
                        }
                    }, ms);
                }

                return wrapper;
            }

            function getScrollPerc(scroll) {
                return Math.round(100 * scroll / (bodyHeight - windowHeight));
            }

            function addNewItems() {
                if (countVisible + itemsStep < totalItems) {
                    ctrl.visibleItems = ctrl.visibleItems.concat(ctrl.results.results.slice(countVisible, countVisible + itemsStep));
                    countVisible = countVisible + itemsStep;
                    heightUpdated = false;
                    ctrl.isSorted = false;
                    $scope.$apply();
                } else if (countVisible > totalItems) {
                    return false;
                } else if (countVisible + itemsStep >= totalItems) {
                    ctrl.visibleItems = ctrl.visibleItems.concat(ctrl.results.results.slice(countVisible, ctrl.results.results.length));
                    countVisible = countVisible + itemsStep;
                    heightUpdated = false;
                    ctrl.isSorted = false;
                    $scope.$apply();
                }
            }

            var checkScroll = debounce(function () {
                updateBodyHeight();
                scrolled = window.pageYOffset || document.documentElement.scrollTop;
                if (getScrollPerc(scrolled) > 90) {
                    addNewItems();
                }
            }, 200);

            $rootScope.$on("CallUpdateSearchResults", function () {
                $scope.updateSearchResults();
            });

            $scope.updateSearchResults = function () {
                ctrl.results = searchResultsPageService.getResults();
                countVisible = 0;
                itemsStep = 10;
                totalItems = 0;
                if (ctrl.results.results && ctrl.results.results.length > 0) {
                    totalItems = ctrl.results.resultCount;
                    ctrl.visibleItems = ctrl.results.results.slice(countVisible, itemsStep);
                    countVisible = countVisible + itemsStep;
                    heightUpdated = false;
                }
                checkLoaderService.disableLoader();
            };

            $scope.updateSearchResults();

            window.addEventListener('scroll', function () {
                checkScroll();
            });
        }

        app.component('lazyLoad', {
            bindings: {
                readyData: '@'
            },
            templateUrl: 'js/component/lazyLoad/lazyLoad.html',
            controller: LazyLoadController,
            controllerAs: 'ctrl'
        });

    }(require('angular').module('App'))
);


