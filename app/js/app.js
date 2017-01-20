var angular = require('angular');
require('angular-ui-router');


var app = angular.module('App', [
    'ui.router'
]);

require('./service/index');
require('./controller/index');

app
    .config(function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise("/index");

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
    });
