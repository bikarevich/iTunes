(function (app) {

    'use strict';

    function TrackListController($sce) {
        var ctrl = this;

        ctrl.AlbumTracks = [];

        ctrl.playTrack = playTrack;
        ctrl.stopPlayer = stopPlayer;

        ctrl.$onChanges = function () {
            if(ctrl.trackList.length > 0) {
                ctrl.AlbumTracks = JSON.parse(ctrl.trackList);
                if(ctrl.AlbumTracks.length > 0) {
                    angular.forEach(ctrl.AlbumTracks, function (item) {
                        var duration;
                        item.previewSceUrl = $sce.trustAsResourceUrl(item.previewUrl);
                        item.totalTime = {};
                        item.isPlaying = false;
                        duration = Math.round(item.trackTimeMillis/1000);
                        item.totalTime.minutes = Math.floor(duration / 60);
                        item.totalTime.seconds = duration - item.totalTime.minutes * 60;
                        item.totalTime.minutes = ('0' + item.totalTime.minutes).slice(-2);
                        item.totalTime.seconds = ('0' + item.totalTime.seconds).slice(-2);
                    });
                }
            }
        };

        function playTrack(data) {
            angular.forEach(ctrl.AlbumTracks, function (item) {
                item.isPlaying = false;
            });
            data.isPlaying = true;
            ctrl.currentTrack = data;
        }

        function stopPlayer() {
            angular.forEach(ctrl.AlbumTracks, function (item) {
                item.isPlaying = false;
            });
            ctrl.currentTrack = null;
        }
        
    }

    app.component('trackList', {
        bindings : {
            trackList : '@'
        },
        templateUrl: 'js/component/trackList/trackList.html',
        controller: TrackListController,
        controllerAs: 'ctrl'
    });

}(require('angular').module('App')));


