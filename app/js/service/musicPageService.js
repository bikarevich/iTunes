const API_SERVICE = new WeakMap();
const TOP_ALBUMS_URL = new WeakMap();
const TOP_SONGS_URL = new WeakMap();
const SCE = new WeakMap();

class musicPageService {
    constructor(API, $sce) {
        API_SERVICE.set(this, API);
        SCE.set(this, $sce);
        TOP_ALBUMS_URL.set(this, SCE.get(this).trustAsResourceUrl('https://itunes.apple.com/us/rss/topalbums/limit=10/json'));
        TOP_SONGS_URL.set(this, SCE.get(this).trustAsResourceUrl('https://itunes.apple.com/us/rss/topsongs/limit=10/json'));
    }

    getTopAlbums() {
        return API_SERVICE.get(this).$get(TOP_ALBUMS_URL.get(this)).then(response => response);
    };

    getTopSongs() {
        return API_SERVICE.get(this).$get(TOP_SONGS_URL.get(this)).then(response => response);
    };
}

export {musicPageService};