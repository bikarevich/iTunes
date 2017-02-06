var angular = require('angular');
require('angular-ui-router');

var app = angular.module('App', [
    'ui.router'
]);

require('./controller/index');
require('./service/index');
require('./directive/index');
require('./component/index');

app
    .config(function ($stateProvider, $urlRouterProvider, $compileProvider) {
        $urlRouterProvider.otherwise("/index");

        $compileProvider.preAssignBindingsEnabled(true);

        $stateProvider
            .state('index', {
                url: "/index",
                templateUrl: './views/mainPage.html',
                controller: 'MainPageController',
                controllerAs: 'ctrl'
            })
            .state('books', {
                url: "/books",
                templateUrl: './views/booksPage.html',
                controller: 'BooksPageController',
                controllerAs: 'ctrl'
            })
            .state('music', {
                url: "/music",
                templateUrl: './views/musicPage.html',
                controller: 'MusicPageController',
                controllerAs: 'ctrl'
            })
            .state('moves', {
                url: "/moves",
                templateUrl: './views/movesPage.html',
                controller: 'MovesPageController',
                controllerAs: 'ctrl'
            })
            .state('song', {
                url: "/music/:id",
                templateUrl: './views/songPage.html',
                controller: 'SongPageController',
                controllerAs: 'ctrl'
            })
            .state('move', {
                url: "/moves/:id",
                templateUrl: './views/movePage.html',
                controller: 'MovePageController',
                controllerAs: 'ctrl'
            })
            .state('book', {
                url: "/books/:id",
                templateUrl: './views/bookPage.html',
                controller: 'BookPageController',
                controllerAs: 'ctrl'
            })
            .state('album', {
                url: "/album/:id",
                templateUrl: './views/albumPage.html',
                controller: 'AlbumPageController',
                controllerAs: 'ctrl'
            })
            .state('search', {
                url: "/search",
                templateUrl: './views/searchResultsPage.html',
                controller: 'SearchResultsPageController',
                controllerAs: 'ctrl'
            });
    })
    .run(function ($rootScope) {
        $rootScope.showLoader = true;

        $rootScope.$on('$stateChangeStart', function () {
            $rootScope.showLoader = true;
        });
    });
