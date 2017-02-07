(function (app) {
        'use strict';

        let variables = new WeakMap();
        const SCOPE = new WeakMap();
        const STATE = new WeakMap();
        const ROOT_SCOPE = new WeakMap();
        const SEARCH_RESULTS_SERVICE = new WeakMap();
        const CHECK_LOADER_SERVICE = new WeakMap();

        class LazyLoadController {
            constructor($rootScope, $scope, searchResultsPageService, checkLoaderService, $state) {
                let that = this;
                SCOPE.set(this, $scope);
                ROOT_SCOPE.set(this, $rootScope);
                SEARCH_RESULTS_SERVICE.set(this, searchResultsPageService);
                CHECK_LOADER_SERVICE.set(this, checkLoaderService);
                STATE.set(this, $state);
                variables.set(this, {
                    windowHeight: window.innerHeight,
                    bodyHeight: document.querySelector('body').offsetHeight,
                    heightUpdated: false,
                    scrolled: false,
                    countVisible: 0,
                    itemsStep: 10,
                    totalItems: 0
                });

                this.isSorted = false;
                this.visibleItems = [];
                this.results = [];

                ROOT_SCOPE.get(this).$on("CallUpdateSearchResults", function () {
                    SCOPE.get(that).updateSearchResults();
                });

                SCOPE.get(this).updateSearchResults = function () {
                    that.results = SEARCH_RESULTS_SERVICE.get(that).getResults();
                    variables.get(that).countVisible = 0;
                    variables.get(that).itemsStep = 10;
                    variables.get(that).totalItems = 0;
                    if (that.results.results && that.results.results.length > 0) {
                        variables.get(that).totalItems = that.results.resultCount;
                        that.visibleItems = that.results.results.slice(variables.get(that).countVisible, variables.get(that).itemsStep);
                        variables.get(that).countVisible = variables.get(that).countVisible + variables.get(that).itemsStep;
                        variables.get(that).heightUpdated = false;
                    }
                    CHECK_LOADER_SERVICE.get(that).disableLoader();
                };

                SCOPE.get(this).updateSearchResults();

                window.addEventListener('scroll', function () {
                    that.checkScroll();
                });
            }

            checkScroll() {
                let that = this;
                (that.debounce(function () {
                    that.updateBodyHeight();
                    variables.get(that).scrolled = window.pageYOffset || document.documentElement.scrollTop;
                    if (that.getScrollPerc(variables.get(that).scrolled) > 90) {
                        that.addNewItems();
                    }
                }, 200))();
            }

            goToItemView(trackId, collectionId, linkType, wrapperType) {
                if (wrapperType && wrapperType === 'track') {
                    switch (linkType) {
                        case 'track' :
                            STATE.get(this).go('song', {id: trackId});
                            break;
                        case 'collection' :
                            STATE.get(this).go('album', {id: collectionId});
                            break;
                    }
                } else {
                    switch (wrapperType) {
                        case 'track' :
                            STATE.get(this).go('song', {id: trackId || collectionId});
                            break;
                        case 'album' :
                            STATE.get(this).go('album', {id: trackId || collectionId});
                            break;
                        case 'audiobook' :
                            STATE.get(this).go('book', {id: trackId || collectionId});
                            break;
                        case 'book' :
                            STATE.get(this).go('book', {id: trackId || collectionId});
                            break;
                        default :
                            STATE.get(this).go('move', {id: trackId || collectionId});
                    }
                }
            }

            sortType() {
                this.visibleItems.sort(this.sortByType);
            }

            sortByType(a, b) {
                if (a.wrapperType > b.wrapperType) return 1;
                if (a.wrapperType < b.wrapperType) return -1;
                if (a.wrapperType == b.wrapperType) {
                    if (a.trackName > b.trackName) return 1;
                    if (a.trackName < b.trackName) return -1;
                }
            }

            updateBodyHeight() {
                if (!variables.get(this).heightUpdated) {
                    variables.get(this).bodyHeight = document.querySelector('body').offsetHeight;
                    variables.get(this).heightUpdated = true;
                }
            }

            debounce(func, ms) {
                let isThrottled = false,
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

            getScrollPerc(scroll) {
                return Math.round(100 * scroll / (variables.get(this).bodyHeight - variables.get(this).windowHeight));
            }

            addNewItems() {
                if (variables.get(this).countVisible + variables.get(this).itemsStep < variables.get(this).totalItems) {
                    this.visibleItems = this.visibleItems.concat(this.results.results.slice(variables.get(this).countVisible, variables.get(this).countVisible + variables.get(this).itemsStep));
                    variables.get(this).countVisible = variables.get(this).countVisible + variables.get(this).itemsStep;
                    variables.get(this).heightUpdated = false;
                    this.isSorted = false;
                    SCOPE.get(this).$apply();
                } else if (variables.get(this).countVisible > variables.get(this).totalItems) {
                    return false;
                } else if (variables.get(this).countVisible + variables.get(this).itemsStep >= variables.get(this).totalItems) {
                    this.visibleItems = this.visibleItems.concat(this.results.results.slice(variables.get(this).countVisible, this.results.results.length));
                    variables.get(this).countVisible = variables.get(this).countVisible + variables.get(this).itemsStep;
                    variables.get(this).heightUpdated = false;
                    this.isSorted = false;
                    SCOPE.get(this).$apply();
                }
            }

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


