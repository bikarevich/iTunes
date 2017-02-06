const SCE = new WeakMap();
const API_SERVICE = new WeakMap();
const BOOK_URL = new WeakMap();

class bookPageService {
    constructor(API, $sce) {
        API_SERVICE.set(this, API);
        SCE.set(this, $sce);
        BOOK_URL.set(this, SCE.get(this).trustAsResourceUrl('https://itunes.apple.com/lookup'));
    }

    getBookData(id) {
        return API_SERVICE.get(this).$jsonp(BOOK_URL.get(this), {id:id}).then(response => response);
    };
}

export {bookPageService};