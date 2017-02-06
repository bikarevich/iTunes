const ALBUM_PAGE_SERVICE = new WeakMap();
const STATE = new WeakMap();
const SCE = new WeakMap();
const SCOPE = new WeakMap();
const SEARCH_RESULTS_PAGE_SERVICE = new WeakMap();
const SEARCH_PANELS_ERVICE = new WeakMap();
const PAGE_BG_SERVICE = new WeakMap();
const CHECK_LOADER_SERVICE = new WeakMap();
const MONTH = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

class AlbumPageController {
    constructor(albumPageService, $state, $sce, $scope, searchResultsPageService, searchPanelService, pageBgService, checkLoaderService) {
        ALBUM_PAGE_SERVICE.set(this, albumPageService);
        CHECK_LOADER_SERVICE.set(this, checkLoaderService);
        STATE.set(this, $state);
        SCE.set(this, $sce);
        SCOPE.set(this, $scope);
        SEARCH_RESULTS_PAGE_SERVICE.set(this, searchResultsPageService);
        SEARCH_PANELS_ERVICE.set(this, searchPanelService);
        PAGE_BG_SERVICE.set(this, pageBgService);

        this.id = STATE.get(this).params.id;
        this.body = document.querySelector('body');


        SCOPE.get(this).$on("$destroy", () => {
            this.body.style.backgroundImage = '';
        });

        this.init();
    }

    init() {
        this.setAlbumData();
    }

    setAlbumData() {
        ALBUM_PAGE_SERVICE.get(this).getAlbumData(this.id).then((response) => {
            this.AlbumTracks = response.data.results;
            if (this.AlbumTracks && this.AlbumTracks.length > 0) {
                this.albumData = response.data.results[0];
                this.AlbumTracks.shift();
                if (this.albumData.artistName === 'Various Artists') {
                    this.AlbumTracks.forEach(function (item) {
                        item.trackName = item.trackName + '. ' + item.artistName;
                    })
                }
                this.albumData.largePreviewImgUrl = this.getLargePreviewImage();
                this.albumData.previewUrl = SCE.get(this).trustAsResourceUrl(this.albumData.previewUrl);
                let date = new Date(this.albumData.releaseDate);
                let nowDate = new Date();
                if (date > nowDate) {
                    this.albumData.preorder = true;
                }
                let newDate = ('0' + date.getDate()).slice(-2) + ' ' + MONTH[date.getMonth()] + ', ' + date.getFullYear();
                this.albumData.releaseDate = newDate;
                if (this.albumData.trackPrice < 0) {
                    this.albumData.trackPrice = 0
                }
                PAGE_BG_SERVICE.get(this).getBase64Img(this.albumData.largePreviewImgUrl).then((response) => {
                    this.body.style.backgroundImage = 'url(' + response.url + ')';
                    if (response.luma) {
                        document.querySelector('.songColorWrap').classList.add('white');
                    } else {
                        document.querySelector('.songColorWrap').classList.remove('white');
                    }
                    CHECK_LOADER_SERVICE.get(this).disableLoader();
                });
            } else {
                STATE.get(this).go('index');
            }
        });
    }

    getLargePreviewImage() {
        return this.albumData.artworkUrl100.replace('100x100bb', '1000x1000bb');
    }

    findAuthor(name) {
        SEARCH_PANELS_ERVICE.get(this).getSearchResults({term: name, limit: 200, media: 'music'}).then((response) => {
            SEARCH_RESULTS_PAGE_SERVICE.get(this).setResults(response.data);
            if (STATE.get(this).current.name != 'search') {
                STATE.get(this).go('search');
            } else {
                $rootScope.$emit("CallUpdateSearchResults", {});
            }
        });
    }
}

export {AlbumPageController};