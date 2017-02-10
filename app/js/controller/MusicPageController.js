'use strict';

let variables = new WeakMap();

class MusicPageController {
    constructor(musicPageService, $state, checkLoaderService) {
        variables.set(this, {
            musicPageService,
            $state,
            checkLoaderService
        });
        this.init();
    }

    init() {
        this.setTopAlbums();
        this.setTopSongs();
    }

    setTopAlbums() {
        variables.get(this).musicPageService.getTopAlbums().then((response) => {
            this.topAlbums = response.data.feed.entry;
        });
    }

    setTopSongs() {
        variables.get(this).musicPageService.getTopSongs().then((response) => {
            this.topSongs = response.data.feed.entry;
            this.topSongs.forEach((item) => {
                let href = item['im:collection'].link.attributes.href;
                item.collectionId = href.substring(href.lastIndexOf("/")+3,href.lastIndexOf("?"));
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
}

export {MusicPageController};