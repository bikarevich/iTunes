const MAIN_PAGE_SERVICE = new WeakMap();
const CHECK_LOADER_SERVICE = new WeakMap();
const STATE = new WeakMap();
const SCE = new WeakMap();

class MainPageController {
    constructor(mainPageService, checkLoaderService, $state, $sce) {
        MAIN_PAGE_SERVICE.set(this, mainPageService);
        CHECK_LOADER_SERVICE.set(this, checkLoaderService);
        STATE.set(this, $state);
        SCE.set(this, $sce);
        this.init();
    }

    init() {
        this.setTopMoves();
        this.setTopBooks();
        this.setTopSongs();
    }

    setTopMoves() {
        MAIN_PAGE_SERVICE.get(this).getTopMoves().then((response) => {
            this.topMoves = response.data.feed.entry;
            this.topMoves.forEach((item) => {
                item.summary.label = SCE.get(this).trustAsHtml(item.summary.label);
            });
        });
    }

    setTopBooks() {
        MAIN_PAGE_SERVICE.get(this).getTopBooks().then((response) => {
            this.topBooks = response.data.feed.entry;
            this.topBooks.forEach((item) => {
                item.summary.label = SCE.get(this).trustAsHtml(item.summary.label);
            });
        });
    }

    setTopSongs() {
        MAIN_PAGE_SERVICE.get(this).getTopSongs().then((response) => {
            this.topSongs = response.data.feed.entry;
            this.topSongs.forEach((item) => {
                let href = item['im:collection'].link.attributes.href;
                item.collectionId = href.substring(href.lastIndexOf("/") + 3, href.lastIndexOf("?"));
            });
            CHECK_LOADER_SERVICE.get(this).disableLoader();
        });
    }

    goToAlbumView(id) {
        STATE.get(this).go('album', {id: id});
    }

    goToSongView(id) {
        STATE.get(this).go('song', {id: id});
    }

    goToMoveView(id) {
        STATE.get(this).go('move', {id: id});
    }

    goToBookView(id) {
        STATE.get(this).go('book', {id: id});
    }
}

export {MainPageController};