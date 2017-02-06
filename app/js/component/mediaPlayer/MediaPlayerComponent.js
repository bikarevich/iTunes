(function (app) {

    'use strict';

    const SCOPE = new WeakMap();
    const ELEMENT = new WeakMap();
    let variables = new WeakMap();
    let that;

    class MediaPlayerController {
        constructor($scope, $element) {
            that = this;
            SCOPE.set(this, $scope);
            ELEMENT.set(this, $element);
            variables.set(this, {
                $wrap: ELEMENT.get(this)[0],
                $player: ELEMENT.get(this)[0].querySelector('.player'),
                $volBtn: ELEMENT.get(this)[0].querySelector('.volume-control'),
                $volPanel: ELEMENT.get(this)[0].querySelector('.volume-control-panel'),
                $trackBtn: ELEMENT.get(this)[0].querySelector('.track-control'),
                $trackPanel: ELEMENT.get(this)[0].querySelector('.track-control-panel'),
                $trackPanelLine: ELEMENT.get(this)[0].querySelector('.track-control-line'),
                volumePosition: 0,
                trackPosition: 0,
                currentTime: {
                    minutes: '00',
                    seconds: '00'
                },
                totalTime: {
                    minutes: '00',
                    seconds: '00'
                }
            });

            variables.get(this).$player.addEventListener("loadedmetadata", function () {
                that.setVolume();
                variables.get(that).trackPanelWidth = variables.get(that).$trackPanel.offsetWidth;
                variables.get(that).trackPanelHeight = variables.get(that).$trackPanel.offsetHeight;
                variables.get(that).volumePanelWidth = variables.get(that).$volPanel.offsetWidth;
                variables.get(that).volumeCoords = that.getCoords(variables.get(that).$volPanel);
                variables.get(that).trackCoords = that.getCoords(variables.get(that).$trackPanel);
                variables.get(that).volumeCoords.right = variables.get(that).volumeCoords.left + variables.get(that).volumePanelWidth;
                variables.get(that).trackCoords.right = variables.get(that).trackCoords.left + variables.get(that).trackPanelWidth;
                variables.get(that).duration = Math.round(variables.get(that).$player.duration);
                variables.get(that).totalTime.minutes = Math.floor(variables.get(that).duration / 60);
                variables.get(that).seconds = variables.get(that).duration - variables.get(that).totalTime.minutes * 60;
                variables.get(that).minutes = ('0' + variables.get(that).totalTime.minutes).slice(-2);
                variables.get(that).seconds = ('0' + variables.get(that).totalTime.seconds).slice(-2);
                variables.get(that).$volBtn.style.transform = 'translate(' + variables.get(that).$player.volume * variables.get(that).volumePanelWidth + 'px, 0px)';
                that.addBufferedLine();
                SCOPE.get(that).$apply();

                if (that.playing) {
                    variables.get(that).$player.play();
                }
            });

            variables.get(this).$player.addEventListener("timeupdate", function () {
                if (variables.get(that).$player.seekable.length > 0) {
                    that.buffCanvasUpdate(variables.get(that).$player.seekable.end(0));
                }
                let curTime = variables.get(that).$player.currentTime, a;
                let currentPerc = curTime / variables.get(that).duration;
                a = Math.floor(currentPerc * variables.get(that).trackPanelWidth);
                variables.get(that).$trackBtn.style.transform = "translate(" + a + "px , 0";
                variables.get(that).$trackPanelLine.style.width = a + "px";
            });

            variables.get(this).$trackBtn.addEventListener('mousedown', function () {
                document.addEventListener('mousemove', that.timeDrag);
                document.addEventListener('mouseup', function handler() {
                    document.removeEventListener('mousemove', that.timeDrag);
                    document.removeEventListener('mouseup', handler);
                });
            });

            variables.get(this).$volBtn.addEventListener('mousedown', function () {
                document.addEventListener('mousemove', that.volumeDrag);
                document.addEventListener('mouseup', function handler() {
                    document.removeEventListener('mousemove', that.volumeDrag);
                    document.removeEventListener('mouseup', handler);
                });
            });

            variables.get(this).$trackPanel.addEventListener('click', function (e) {
                that.timeDrag(e);
            });

            variables.get(this).$volPanel.addEventListener('click', function (e) {
                that.volumeDrag(e);
            });
        }

        addBufferedLine() {
            variables.get(this).buffCanvas = document.createElement('canvas');
            variables.get(this).buffCanvas.classList.add('track-control-buff-line');
            variables.get(this).buffCanvasCtx = variables.get(this).buffCanvas.getContext('2d');
            variables.get(this).buffCanvas.width = variables.get(this).trackPanelWidth;
            variables.get(this).buffCanvas.height = variables.get(this).trackPanelHeight;
            variables.get(this).$trackPanel.appendChild(variables.get(this).buffCanvas);
        }

        buffCanvasUpdate(endTime) {
            let x;
            x = endTime * variables.get(this).trackPanelWidth / variables.get(this).duration;
            variables.get(this).buffCanvas.width = variables.get(this).buffCanvas.width;
            variables.get(this).buffCanvasCtx.fillStyle = "rgba(255, 255, 255, .2)";
            variables.get(this).buffCanvasCtx.fillRect(0, 0, x, variables.get(this).trackPanelHeight);
        }

        timeDrag(e) {
            if (e.pageX - variables.get(that).trackCoords.left < 0) {
                variables.get(that).trackPosition = 0;
            } else if (e.pageX > variables.get(that).trackCoords.right) {
                variables.get(that).trackPosition = variables.get(that).trackPanelWidth;
            } else {
                variables.get(that).trackPosition = e.pageX - variables.get(that).trackCoords.left;
            }
            variables.get(that).$player.currentTime = variables.get(that).duration * variables.get(that).trackPosition / variables.get(that).trackPanelWidth;
            variables.get(that).$trackBtn.style.transform = 'translate(' + variables.get(that).trackPosition + 'px, 0px)';
            variables.get(that).$trackPanelLine.style.width = variables.get(that).trackPosition + 'px';
        }

        volumeDrag(e) {
            if (e.pageX < variables.get(that).volumeCoords.left) {
                variables.get(that).volumePosition = 0;
            } else if (e.pageX > variables.get(that).volumeCoords.right) {
                variables.get(that).volumePosition = variables.get(that).volumePanelWidth;
            } else {
                variables.get(that).volumePosition = e.pageX - variables.get(that).volumeCoords.left;
            }
            variables.get(that).$player.volume = variables.get(that).volumePosition / variables.get(that).volumePanelWidth;
            localStorage.setItem('volume', variables.get(that).$player.volume);
            variables.get(that).$volBtn.style.transform = 'translate(' + variables.get(that).volumePosition + 'px, 0px)';
        }

        setVolume() {
            let savedVol = localStorage.getItem('volume');
            if (!savedVol) savedVol = 1;
            variables.get(that).$player.volume = savedVol;
            variables.get(that).$volBtn.style.transform = 'translate(' + savedVol + 'px, 0px)';
        }

        getCoords(elem) {
            let box = elem.getBoundingClientRect();
            let body = document.body;
            let docEl = document.documentElement;

            let scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
            let scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

            let clientTop = docEl.clientTop || body.clientTop || 0;
            let clientLeft = docEl.clientLeft || body.clientLeft || 0;

            let top = box.top + scrollTop - clientTop;
            let left = box.left + scrollLeft - clientLeft;

            return {top: Math.round(top), left: Math.round(left)};
        }

        play() {
            variables.get(this).$player.play();
        }

        pause() {
            variables.get(this).$player.pause();
            this.playing = false;
            this.callback();
        }
    }

    app.component('mediaPlayer', {
        bindings: {
            src: '@',
            playing: '@',
            callback: '&'
        },
        templateUrl: 'js/component/mediaPlayer/mediaPlayer.html',
        controller: MediaPlayerController,
        controllerAs: 'ctrl'
    });

}(require('angular').module('App')));


