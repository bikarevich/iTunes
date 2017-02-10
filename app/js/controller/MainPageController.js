'use strict';

let variables = new WeakMap();

class MainPageController {
    constructor(mainPageService, checkLoaderService, $state, $sce) {
        variables.set(this, {
            mainPageService,
            checkLoaderService,
            $state,
            $sce
        });
        this.init();
    }

    init() {
        this.setTopMoves();
        this.setTopBooks();
        this.setTopSongs();
    }

    setTopMoves() {
        variables.get(this).mainPageService.getTopMoves().then((response) => {
            this.topMoves = response.data.feed.entry;
            this.topMoves.forEach((item) => {
                item.summary.label = variables.get(this).$sce.trustAsHtml(item.summary.label);
            });
        });
    }

    setTopBooks() {
        variables.get(this).mainPageService.getTopBooks().then((response) => {
            this.topBooks = response.data.feed.entry;
            this.topBooks.forEach((item) => {
                item.summary.label = variables.get(this).$sce.trustAsHtml(item.summary.label);
            });
        });
    }

    setTopSongs() {
        variables.get(this).mainPageService.getTopSongs().then((response) => {
            this.topSongs = response.data.feed.entry;
            this.topSongs.forEach((item) => {
                let href = item['im:collection'].link.attributes.href;
                item.collectionId = href.substring(href.lastIndexOf("/") + 3, href.lastIndexOf("?"));
            });
            variables.get(this).checkLoaderService.disableLoader();
        });
    }

    goToAlbumView(id) {
        variables.get(this).$state.go('album', {id: id});
    }

    goToSongView(id) {
        variables.get(this).$state.go('song', {id: id});
    }

    goToMoveView(id) {
        variables.get(this).$state.go('move', {id: id});
    }

    goToBookView(id) {
        variables.get(this).$state.go('book', {id: id});
    }
}

export {MainPageController};