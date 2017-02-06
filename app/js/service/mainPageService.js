const API_SERVICE = new WeakMap();
const TOP_SONGS_URL = 'https://itunes.apple.com/us/rss/topsongs/limit=10/json';
const TOP_BOOKS_URL = 'https://itunes.apple.com/us/rss/topfreeebooks/limit=10/json';
const TOP_MOVIES_URL = 'https://itunes.apple.com/us/rss/topmovies/limit=10/json';

class mainPageService {
    constructor(API) {
        API_SERVICE.set(this, API);
    }

    getTopSongs() {
        return API_SERVICE.get(this).$get(TOP_SONGS_URL).then(response => response);
    };

    getTopMoves() {
        return API_SERVICE.get(this).$get(TOP_MOVIES_URL).then(response => response);
    };

    getTopBooks() {
        return API_SERVICE.get(this).$get(TOP_BOOKS_URL).then(response => response);
    };
}

export {mainPageService};