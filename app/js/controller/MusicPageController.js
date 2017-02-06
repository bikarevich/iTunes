const STATE = new WeakMap();
const CHECK_LOADER_SERVICE = new WeakMap();
const MUSIC_PAGE_SERVICE = new WeakMap();

class MusicPageController {
    constructor(musicPageService, $state, checkLoaderService) {
        CHECK_LOADER_SERVICE.set(this, checkLoaderService);
        MUSIC_PAGE_SERVICE.set(this, musicPageService);
        STATE.set(this, $state);

        this.init();
    }

    init() {
        this.setTopAlbums();
        this.setTopSongs();
    }

    setTopAlbums() {
        MUSIC_PAGE_SERVICE.get(this).getTopAlbums().then((response) => {
            this.topAlbums = response.data.feed.entry;
        });
    }

    setTopSongs() {
        MUSIC_PAGE_SERVICE.get(this).getTopSongs().then((response) => {
            this.topSongs = response.data.feed.entry;
            this.topSongs.forEach((item) => {
                let href = item['im:collection'].link.attributes.href;
                item.collectionId = href.substring(href.lastIndexOf("/")+3,href.lastIndexOf("?"));
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
}

export {MusicPageController};