(function (app) {

    'use strict';

    function MediaPlayerController($scope, $element) {
        var ctrl = this,
            $wrap = $element[0],
            $player = $wrap.querySelector('.player'),
            $volBtn = $wrap.querySelector('.volume-control'),
            $volPanel = $wrap.querySelector('.volume-control-panel'),
            $trackBtn = $wrap.querySelector('.track-control'),
            $trackPanel = $wrap.querySelector('.track-control-panel'),
            $trackPanelLine = $wrap.querySelector('.track-control-line'),
            volumePosition = 0,
            trackPosition = 0,
            trackPanelWidth,
            trackPanelHeight,
            volumePanelWidth,
            volumeCoords,
            trackCoords,
            duration,
            volume,
            currentPerc,
            buffCanvas,
            buffCanvasCtx;

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
            setVolume();
            trackPanelWidth = $trackPanel.offsetWidth;
            trackPanelHeight = $trackPanel.offsetHeight;
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
            addBufferedLine();
        });

        $player.addEventListener("timeupdate", function () {
            buffCanvasUpdate(this.seekable.end(0));
            var curTime = Math.round($player.currentTime),
                min,
                sec;
            currentPerc = curTime / duration;
            min = Math.floor(curTime / 60);
            sec = curTime - min * 60;
            ctrl.currentTime.minutes = ('0' + min).slice(-2);
            ctrl.currentTime.seconds = ('0' + sec).slice(-2);
            $trackBtn.style.transform = "translate(" + Math.floor(currentPerc * trackPanelWidth) + "px , 0";
            $trackPanelLine.style.width = Math.floor(currentPerc * trackPanelWidth) + "px";
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

        $trackPanel.addEventListener('click', function (e) {
            timeDrag(e);
        });

        $volPanel.addEventListener('click', function (e) {
            volumeDrag(e);
        });

        function addBufferedLine() {
            buffCanvas = document.createElement('canvas');
            buffCanvas.classList.add('track-control-buff-line');
            buffCanvasCtx = buffCanvas.getContext('2d');
            buffCanvas.width = trackPanelWidth;
            buffCanvas.height = trackPanelHeight;
            $trackPanel.appendChild(buffCanvas);
        }

        function buffCanvasUpdate(endTime) {
            var x;
            x = endTime * trackPanelWidth / duration;
            buffCanvas.width = buffCanvas.width;
            buffCanvasCtx.fillStyle="rgba(255, 255, 255, .2)";
            buffCanvasCtx.fillRect(0, 0, x, trackPanelHeight);
        }

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
            $trackPanelLine.style.width = trackPosition + 'px';
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
            localStorage.setItem('volume', $player.volume);
            $volBtn.style.transform = 'translate(' + volumePosition + 'px, 0px)';
        }

        function setVolume() {
            var savedVol = localStorage.getItem('volume');
            if (!savedVol) savedVol = 1;
            $player.volume = savedVol;
            $volBtn.style.transform = 'translate(' + savedVol + 'px, 0px)';
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
            src: '@',
            trackTitle: '@'
        },
        templateUrl: 'js/component/mediaPlayer/mediaPlayer.html',
        controller: MediaPlayerController,
        controllerAs: 'ctrl'
    });

}(require('angular').module('App')));


