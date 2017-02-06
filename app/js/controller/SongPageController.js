const SONG_PAGE_SERVICE = new WeakMap();
const CHECK_LOADER_SERVICE = new WeakMap();
const PAGE_BG_SERVICE = new WeakMap();
const STATE = new WeakMap();
const SCE = new WeakMap();
const SCOPE = new WeakMap();
const SEARCH_RESULTS_SERVICE = new WeakMap();
const SEARCH_PANEL_SERVICE = new WeakMap();
const MONTH = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

class SongPageController {
    constructor(songPageService, $state, $sce, $scope, searchResultsPageService, searchPanelService, pageBgService, checkLoaderService) {
        SONG_PAGE_SERVICE.set(this, songPageService);
        CHECK_LOADER_SERVICE.set(this, checkLoaderService);
        PAGE_BG_SERVICE.set(this, pageBgService);
        STATE.set(this, $state);
        SCE.set(this, $sce);
        SCOPE.set(this, $scope);
        SEARCH_PANEL_SERVICE.set(this, searchPanelService);
        SEARCH_RESULTS_SERVICE.set(this, searchResultsPageService);

        this.id = STATE.get(this).params.id;
        this.body = document.querySelector('body');

        SCOPE.get(this).$on("$destroy", () => {
            this.body.style.backgroundImage = '';
        });

        this.init();
    }

    init() {
        this.setSongData();
    }

    goToAlbum(id) {
        STATE.get(this).go('album', {id: id});
    }

    setSongData() {
        SONG_PAGE_SERVICE.get(this).getSongData(this.id).then((response) => {
            let duration;
            this.songData = response.data.results[0];
            this.tracksList = response.data.results;
            this.songData.largePreviewImgUrl = this.getLargePreviewImage();
            let date = new Date(this.songData.releaseDate);
            let newDate = ('0' + date.getDate()).slice(-2) + ' ' + MONTH[date.getMonth()] + ', ' + date.getFullYear();
            this.songData.releaseDate = newDate;
            if (this.songData.trackPrice < 0) {
                this.songData.trackPrice = 0
            }
            PAGE_BG_SERVICE.get(this).getBase64Img(this.songData.largePreviewImgUrl).then((response) => {
                this.body.style.backgroundImage = 'url(' + response.url + ')';
                if (response.luma) {
                    document.querySelector('.songColorWrap').classList.add('white');
                } else {
                    document.querySelector('.songColorWrap').classList.remove('white');
                }
                CHECK_LOADER_SERVICE.get(this).disableLoader();
            });
        })
    }

    getLargePreviewImage() {
        return this.songData.artworkUrl100.replace('100x100bb', '1000x1000bb');
    }

    findAuthor(name) {
        SEARCH_PANEL_SERVICE.get(this).getSearchResults({term: name, limit: 200, media: 'music'}).then((response) => {
            SEARCH_RESULTS_SERVICE.get(this).setResults(response.data);
            if (STATE.get(this).current.name != 'search') {
                STATE.get(this).go('search');
            } else {
                $rootScope.$emit("CallUpdateSearchResults", {});
            }
        });
    }
}

export {SongPageController};