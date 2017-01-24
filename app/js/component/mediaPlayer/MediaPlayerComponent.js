(function (app) {

    'use strict';

    function MediaPlayerController ($scope) {
        console.log(this);
        console.log($scope);
        console.log(this.src);
    }


    app.component('mediaPlayer', {
        bindings: {
            src: '='
        },
        templateUrl: 'js/component/mediaPlayer/mediaPlayer.html',
        controller: MediaPlayerController,
        controllerAs : 'ctrl'
    });

}(require('angular').module('App')));

