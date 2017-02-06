(function (app) {

    'use strict';
    const SCE = new WeakMap();

    class TrackListController {
        constructor($sce) {
            SCE.set(this, $sce);
            this.trackList = [];
            this.$onChanges = function () {
                if(this.trackList.length > 0) {
                    this.AlbumTracks = JSON.parse(this.trackList);
                    if(this.AlbumTracks.length > 0) {
                        this.AlbumTracks.forEach((item) => {
                            let duration;
                            item.previewSceUrl = SCE.get(this).trustAsResourceUrl(item.previewUrl);
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
        }

        playTrack(data) {
            this.AlbumTracks.forEach(function (item) {
                item.isPlaying = false;
            });
            data.isPlaying = true;
            this.currentTrack = data;
        }

        stopPlayer() {
            this.AlbumTracks.forEach(function (item) {
                item.isPlaying = false;
            });
            this.currentTrack = null;
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


