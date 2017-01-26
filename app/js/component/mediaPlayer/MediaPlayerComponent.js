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
            volumePosition = 0,
            trackPosition = 0,
            trackPanelWidth,
            volumePanelWidth,
            volumeCoords,
            trackCoords,
            duration,
            volume,
            currentPerc;

        ctrl.isPlaying = false;
        ctrl.currentTime = {
            minutes: '00',
            seconds: '00'
        };
        ctrl.totalTime = {
            minutes: '00',
            seconds: '00'
        };

        ctrl.play = play;
        ctrl.pause = pause;

        $player.addEventListener("loadedmetadata", function () {
            trackPanelWidth = $trackPanel.offsetWidth;
            volumePanelWidth = $volPanel.offsetWidth;
            volumeCoords = getCoords($volPanel);
            trackCoords = getCoords($trackPanel);
            volumeCoords.right = volumeCoords.left + volumePanelWidth;
            trackCoords.right = trackCoords.left + trackPanelWidth;

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

        $trackBtn.addEventListener('mousedown', function () {
            document.addEventListener('mousemove', timeDrag);
            document.addEventListener('mouseup', function handler() {
                document.removeEventListener('mousemove', timeDrag);
                document.removeEventListener('mouseup', handler);
            });
        });

        $volBtn.addEventListener('mousedown', function () {
            document.addEventListener('mousemove', volumeDrag);
            document.addEventListener('mouseup', function handler() {
                document.removeEventListener('mousemove', volumeDrag);
                document.removeEventListener('mouseup', handler);
            });
        });

        function timeDrag(e) {
            if (e.pageX - trackCoords.left < 0) {
                trackPosition = 0;
            } else if (e.pageX > trackCoords.right) {
                trackPosition = trackPanelWidth;
            } else {
                trackPosition = e.pageX - trackCoords.left;
            }
            $player.currentTime = duration * trackPosition / trackPanelWidth;
            $trackBtn.style.transform = 'translate(' + trackPosition + 'px, 0px)';
        }

        function volumeDrag(e) {
            if (e.pageX < volumeCoords.left) {
                volumePosition = 0;
            } else if (e.pageX > volumeCoords.right) {
                volumePosition = volumePanelWidth;
            } else {
                volumePosition = e.pageX - volumeCoords.left;
            }
            $player.volume = volumePosition / volumePanelWidth;
            $volBtn.style.transform = 'translate(' + volumePosition + 'px, 0px)';
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


