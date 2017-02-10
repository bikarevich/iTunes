(function (app) {
        'use strict';

        let variables = new WeakMap();

        class LazyLoadController {
            constructor($rootScope, $scope, searchResultsPageService, checkLoaderService, $state) {
                variables.set(this, {
                    windowHeight: window.innerHeight,
                    bodyHeight: document.querySelector('body').offsetHeight,
                    heightUpdated: false,
                    scrolled: false,
                    countVisible: 0,
                    itemsStep: 10,
                    totalItems: 0,
                    $scope,
                    $state,
                    $rootScope,
                    searchResultsPageService,
                    checkLoaderService
                });
                let scrollHandler = () => {
                    this.onScroll();
                };
                this.visibleItems = [];
                this.results = [];
                $rootScope.$on("CallUpdateSearchResults", () => {
                    this.updateSearchResults();
                });
                window.addEventListener('scroll', scrollHandler);
                $scope.$on("$destroy", () => {
                    window.removeEventListener('scroll', scrollHandler);
                });
                this.init();
            }

            init() {
                this.updateSearchResults();
            }

            updateSearchResults() {
                variables.get(this).checkLoaderService.enableLoader();
                this.resetCount();
                this.results = variables.get(this).searchResultsPageService.getResults();
                if (this.results.results && this.results.results.length > 0) {
                    variables.get(this).totalItems = this.results.resultCount;
                    this.addStepItem();
                    this.updateCount();
                }
                variables.get(this).checkLoaderService.disableLoader();
            };

            onScroll() {
                (this.debounce(() => {
                    this.updateBodyHeight();
                    this.checkScrollPos();
                }, 200))();
            }

            checkScrollPos() {
                variables.get(this).scrolled = window.pageYOffset || document.documentElement.scrollTop;
                if (this.getScrollPerc(variables.get(this).scrolled) > 90) {
                    this.addNewItems();
                }
            }

            goToItemView(trackId, collectionId, linkType, wrapperType) {
                if (wrapperType && wrapperType === 'track') {
                    switch (linkType) {
                        case 'track' :
                            variables.get(this).$state.go('song', {id: trackId});
                            break;
                        case 'collection' :
                            variables.get(this).$state.go('album', {id: collectionId});
                            break;
                    }
                } else {
                    switch (wrapperType) {
                        case 'track' :
                            variables.get(this).$state.go('song', {id: trackId || collectionId});
                            break;
                        case 'album' :
                            variables.get(this).$state.go('album', {id: trackId || collectionId});
                            break;
                        case 'audiobook' :
                            variables.get(this).$state.go('book', {id: trackId || collectionId});
                            break;
                        case 'book' :
                            variables.get(this).$state.go('book', {id: trackId || collectionId});
                            break;
                        default :
                            variables.get(this).$state.go('move', {id: trackId || collectionId});
                    }
                }
            }

            sortType() {
                this.visibleItems.sort(this.sortByType);
            }

            updateBodyHeight() {
                if (!variables.get(this).heightUpdated) {
                    variables.get(this).bodyHeight = document.querySelector('body').offsetHeight;
                    variables.get(this).heightUpdated = true;
                }
            }

            getScrollPerc(scroll) {
                return Math.round(100 * scroll / (variables.get(this).bodyHeight - variables.get(this).windowHeight));
            }

            addNewItems() {
                if (variables.get(this).countVisible + variables.get(this).itemsStep < variables.get(this).totalItems) {
                    this.addStepItem();
                    this.updateCount();
                    this.updateScope();
                } else if (variables.get(this).countVisible > variables.get(this).totalItems) {
                    return false;
                } else if (variables.get(this).countVisible + variables.get(this).itemsStep >= variables.get(this).totalItems) {
                    this.addBoundaryItem();
                    this.updateCount();
                    this.updateScope();
                }
            }

            addStepItem() {
                this.visibleItems = this.visibleItems.concat(this.results.results.slice(variables.get(this).countVisible, variables.get(this).countVisible + variables.get(this).itemsStep));
            }

            addBoundaryItem() {
                this.visibleItems = this.visibleItems.concat(this.results.results.slice(variables.get(this).countVisible, this.results.results.length));
            }

            updateCount() {
                variables.get(this).countVisible = variables.get(this).countVisible + variables.get(this).itemsStep;
                variables.get(this).heightUpdated = false;
            }

            resetCount() {
                variables.get(this).countVisible = 0;
                variables.get(this).itemsStep = 10;
                variables.get(this).totalItems = 0;
                this.visibleItems = [];
                this.results = [];
            }

            updateScope() {
                variables.get(this).$scope.$apply();
            }

            sortByType(a, b) {
                if (a.wrapperType > b.wrapperType) return 1;
                if (a.wrapperType < b.wrapperType) return -1;
                if (a.wrapperType == b.wrapperType) {
                    if (a.trackName > b.trackName) return 1;
                    if (a.trackName < b.trackName) return -1;
                }
            };

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
            };
        }

        app.component('lazyLoad', {
            templateUrl: 'js/component/lazyLoad/lazyLoad.html',
            controller: LazyLoadController,
            controllerAs: 'ctrl'
        });

    }(require('angular').module('App'))
);


