const API_SERVICE = new WeakMap();
const SCE = new WeakMap();
const MOVE_URL = new WeakMap();

class movePageService {
    constructor(API, $sce) {
        API_SERVICE.set(this, API);
        SCE.set(this, $sce);
        MOVE_URL.set(this, SCE.get(this).trustAsResourceUrl('https://itunes.apple.com/lookup'));
    }

    getMoveData(id) {
        return API_SERVICE.get(this).$jsonp(MOVE_URL.get(this), {id: id}).then(response => response);
    };
}

export {movePageService};