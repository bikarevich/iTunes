const API_SERVICE = new WeakMap();
const TOP_VIDEO_RENTALS_URL = new WeakMap();
const TOP_MOVES_URL = new WeakMap();
const SCE = new WeakMap();

class movesPageService {
    constructor(API, $sce) {
        API_SERVICE.set(this, API);
        SCE.set(this, $sce);
        TOP_VIDEO_RENTALS_URL.set(this, SCE.get(this).trustAsResourceUrl('https://itunes.apple.com/us/rss/topvideorentals/limit=10/json'));
        TOP_MOVES_URL.set(this, SCE.get(this).trustAsResourceUrl('https://itunes.apple.com/us/rss/topmovies/limit=10/json'));
    }

    getTopVideoRentals() {
        return API_SERVICE.get(this).$get(TOP_VIDEO_RENTALS_URL.get(this)).then(response => response);
    };

    getTopMoves() {
        return API_SERVICE.get(this).$get(TOP_MOVES_URL.get(this)).then(response => response);
    };
}

export {movesPageService};