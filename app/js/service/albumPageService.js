const SCE = new WeakMap();
const API_SERVICE = new WeakMap();
const SONG_URL = new WeakMap();
const AUTHOR_URL = new WeakMap();

class albumPageService {
    constructor(API, $sce) {
        API_SERVICE.set(this, API);
        SCE.set(this, $sce);
        SONG_URL.set(this, SCE.get(this).trustAsResourceUrl('https://itunes.apple.com/lookup'));
        AUTHOR_URL.set(this, SCE.get(this).trustAsResourceUrl('https://itunes.apple.com/search'));
    }

    getAlbumData(id) {
        return API_SERVICE.get(this).$jsonp(SONG_URL.get(this), {id: id, entity: 'song'}).then(response => response);
    };

    getAuthorTracks(name) {
        return API_SERVICE.get(this).$jsonp(AUTHOR_URL.get(this), {term: name}).then(response => response);
    }
}

export {albumPageService};