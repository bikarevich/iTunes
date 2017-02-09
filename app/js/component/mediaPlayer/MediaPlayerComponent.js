'use strict';
import {EventListenerComponent} from '../../utils/eventListeners/eventListenerComponent';
(function (app) {

    let variables = new WeakMap();

    class MediaPlayerController extends EventListenerComponent {
        constructor($scope, $element) {
            super();
            variables.set(this, {
                $scope,
                $wrap: $element[0],
                $player: $element[0].querySelector('.player'),
                $volBtn: $element[0].querySelector('.volume-control'),
                $volPanel: $element[0].querySelector('.volume-control-panel'),
                $trackBtn: $element[0].querySelector('.track-control'),
                $trackPanel: $element[0].querySelector('.track-control-panel'),
                $trackPanelLine: $element[0].querySelector('.track-control-line'),
                trackCoords: {},
                volumeCoords: {},
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

            variables.get(this).$player.addEventListener("loadedmetadata", () => {
                this.setVolume();
                this.setTrackParams();
                this.setVolumeParams();
                this.setTotalTime();
                this.setVolumeVal();
                this.addBufferedLine();
                $scope.$apply();
                if (this.playing) {
                    variables.get(this).$player.play();
                }
            });

            variables.get(this).$player.addEventListener("timeupdate", () => {
                if (variables.get(this).$player.seekable.length > 0) {
                    this.buffCanvasUpdate(variables.get(this).$player.seekable.end(0));
                }
                this.setTracksCurrentPosition();
            });

            variables.get(this).$volBtn.addEventListener('mousedown', () => {
                document.addEventListener('mousemove', this.volumeDrag);
                document.addEventListener('mouseup', function handler() {
                    document.removeEventListener('mousemove', this.volumeDrag);
                    document.removeEventListener('mouseup', handler);
                });
            });

            this.addListener(variables.get(this).$trackPanel, 'click', this.timeDrag, this);

            this.addListener(variables.get(this).$trackBtn, 'mousedown', ()=> {
                this.addListener(document, 'mousemove', this.timeDrag, this);
                this.addListener(document, 'mouseup', ()=>{
                    this.removeListener(document, 'mousemove');
                    this.removeListener(document, 'mouseup');
                }, this);
            }, this);

            variables.get(this).$volPanel.addEventListener('click', (e) => {
                this.volumeDrag(e);
            });
        }

        setTracksCurrentPosition() {
            let curTime = variables.get(this).$player.currentTime, a;
            let currentPerc = curTime / variables.get(this).duration;
            a = Math.floor(currentPerc * variables.get(this).trackPanelWidth);
            variables.get(this).$trackBtn.style.transform = "translate(" + a + "px , 0";
            variables.get(this).$trackPanelLine.style.width = a + "px";
        }

        setTrackParams() {
            variables.get(this).trackPanelWidth = variables.get(this).$trackPanel.offsetWidth;
            variables.get(this).trackPanelHeight = variables.get(this).$trackPanel.offsetHeight;
            variables.get(this).trackCoords = MediaPlayerController.getCoords(variables.get(this).$trackPanel);
            variables.get(this).trackCoords.right = variables.get(this).trackCoords.left + variables.get(this).trackPanelWidth;
        }

        setVolumeParams() {
            variables.get(this).volumePanelWidth = variables.get(this).$volPanel.offsetWidth;
            variables.get(this).volumeCoords = MediaPlayerController.getCoords(variables.get(this).$volPanel);
            variables.get(this).volumeCoords.right = variables.get(this).volumeCoords.left + variables.get(this).volumePanelWidth;
        }

        setTotalTime() {
            variables.get(this).duration = Math.round(variables.get(this).$player.duration);
            variables.get(this).totalTime.minutes = Math.floor(variables.get(this).duration / 60);
            variables.get(this).seconds = variables.get(this).duration - variables.get(this).totalTime.minutes * 60;
            variables.get(this).minutes = ('0' + variables.get(this).totalTime.minutes).slice(-2);
            variables.get(this).seconds = ('0' + variables.get(this).totalTime.seconds).slice(-2);
        }

        setVolumeVal() {
            variables.get(this).$volBtn.style.transform = 'translate(' + variables.get(this).$player.volume * variables.get(this).volumePanelWidth + 'px, 0px)';
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
            if (e.pageX - variables.get(this).trackCoords.left < 0) {
                variables.get(this).trackPosition = 0;
            } else if (e.pageX > variables.get(this).trackCoords.right) {
                variables.get(this).trackPosition = variables.get(this).trackPanelWidth;
            } else {
                variables.get(this).trackPosition = e.pageX - variables.get(this).trackCoords.left;
            }
            variables.get(this).$player.currentTime = variables.get(this).duration * variables.get(this).trackPosition / variables.get(this).trackPanelWidth;
            variables.get(this).$trackBtn.style.transform = 'translate(' + variables.get(this).trackPosition + 'px, 0px)';
            variables.get(this).$trackPanelLine.style.width = variables.get(this).trackPosition + 'px';
        }

        volumeDrag(e) {
            if (e.pageX < variables.get(this).volumeCoords.left) {
                variables.get(this).volumePosition = 0;
            } else if (e.pageX > variables.get(this).volumeCoords.right) {
                variables.get(this).volumePosition = variables.get(this).volumePanelWidth;
            } else {
                variables.get(this).volumePosition = e.pageX - variables.get(this).volumeCoords.left;
            }
            variables.get(this).$player.volume = variables.get(this).volumePosition / variables.get(this).volumePanelWidth;
            localStorage.setItem('volume', variables.get(this).$player.volume);
            variables.get(this).$volBtn.style.transform = 'translate(' + variables.get(this).volumePosition + 'px, 0px)';
        }

        setVolume() {
            let savedVol = localStorage.getItem('volume');
            if (!savedVol) savedVol = 1;
            variables.get(this).$player.volume = savedVol;
            variables.get(this).$volBtn.style.transform = 'translate(' + savedVol + 'px, 0px)';
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

    MediaPlayerController.getCoords = (elem) => {
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
    };

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


