const API_SERVICE = new WeakMap();
const SCE = new WeakMap();
const SEARCH_URL = new WeakMap();

class searchPanelService {
    constructor(API, $sce) {
        API_SERVICE.set(this, API);
        SCE.set(this, $sce);
        SEARCH_URL.set(this, SCE.get(this).trustAsResourceUrl('https://itunes.apple.com/search'));
    }

    getSearchResults (data) {
        return API_SERVICE.get(this).$jsonp(SEARCH_URL.get(this), data).then(response => response);
    }
}

export {searchPanelService}