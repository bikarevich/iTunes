(function (app) {

    'use strict';

    function MediaPlayerController($scope, $element) {
        var ctrl = this,
            $wrap = $element[0],
            $player = $wrap.getElementsByClassName('player')[0],
            $volBtn = $wrap.getElementsByClassName('volume-control')[0],
            $volPanel = $wrap.getElementsByClassName('volume-control-panel')[0],
            $trackBtn = $wrap.getElementsByClassName('track-control')[0],
            $trackPanel = $wrap.getElementsByClassName('track-control-panel')[0],
            trackPanelWidth = $trackPanel.offsetWidth,
            volumePanelWidth = $volPanel.offsetWidth,
            volumeCoords = getCoords($volPanel),
            areaNewLeft = 0,
            duration,
            volume,
            currentPerc;
        volumeCoords.right = volumeCoords.left + volumePanelWidth;
        ctrl.isPlaying = false;
        ctrl.currentTime = {
            minutes : '00',
            seconds : '00'
        };
        ctrl.totalTime = {
            minutes : '00',
            seconds : '00'
        };

        ctrl.play = play;
        ctrl.pause = pause;

        $player.addEventListener("loadedmetadata", function () {
            duration = Math.round($player.duration);
            ctrl.totalTime.minutes = Math.floor(duration / 60);
            ctrl.totalTime.seconds = duration - ctrl.totalTime.minutes * 60;

            $volBtn.style.transform = 'translate(' + $player.volume * volumePanelWidth + 'px, 0px)';

            $scope.$apply();
        });

        $player.addEventListener("timeupdate", function () {
            var curTime = Math.round($player.currentTime),
                min,
                sec;
            currentPerc = curTime / duration;
            min = Math.floor(curTime / 60);
            sec = curTime - min * 60;
            ctrl.currentTime.minutes = ('0' + min).slice(-2);
            ctrl.currentTime.seconds = ('0' + sec).slice(-2);
            $trackBtn.style.transform = "translate(" + Math.floor(currentPerc * trackPanelWidth) + "px , 0";
            $scope.$apply();
        });

        $volBtn.addEventListener('mousedown', function () {
            document.addEventListener('mousemove', leftAction);
            document.addEventListener('mouseup', function handler() {
                document.removeEventListener('mousemove', leftAction);
                document.removeEventListener('mouseup', handler);
            });
        });

        function leftAction(e) {
            if (e.pageX - volumeCoords.left < 0) {
                areaNewLeft = 0;
            } else if (e.pageX > volumeCoords.right) {
                areaNewLeft = volumePanelWidth;
            } else {
                areaNewLeft = e.pageX - volumeCoords.left;
            }

            $player.volume = areaNewLeft/volumePanelWidth;

            $volBtn.style.transform = 'translate(' + areaNewLeft + 'px, 0px)';
        }

        function getCoords(elem) {
            var box = elem.getBoundingClientRect();
            var body = document.body;
            var docEl = document.documentElement;

            var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
            var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

            var clientTop = docEl.clientTop || body.clientTop || 0;
            var clientLeft = docEl.clientLeft || body.clientLeft || 0;

            var top = box.top + scrollTop - clientTop;
            var left = box.left + scrollLeft - clientLeft;

            return {top: Math.round(top), left: Math.round(left)};
        }

        function play() {
            $player.play();
            ctrl.isPlaying = true;
        }

        function pause() {
            $player.pause();
            ctrl.isPlaying = false;
        }
    }

    app.component('mediaPlayer', {
        bindings: {
            src: '@'
        },
        templateUrl: 'js/component/mediaPlayer/mediaPlayer.html',
        controller: MediaPlayerController,
        controllerAs: 'ctrl'
    });

}(require('angular').module('App')));

