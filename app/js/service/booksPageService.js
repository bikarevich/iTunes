const SCE = new WeakMap();
const API_SERVICE = new WeakMap();
const TOP_FREE_BOOK_URL = new WeakMap();
const TOP_PAID_BOOK_URL = new WeakMap();

class booksPageService {
    constructor($sce, API) {
        API_SERVICE.set(this, API);
        SCE.set(this, $sce);
        TOP_FREE_BOOK_URL.set(this, SCE.get(this).trustAsResourceUrl('https://itunes.apple.com/us/rss/topfreeebooks/limit=10/json'));
        TOP_PAID_BOOK_URL.set(this, SCE.get(this).trustAsResourceUrl('https://itunes.apple.com/us/rss/toppaidebooks/limit=10/json'));
    }

    getTopFreeBooks() {
        return API_SERVICE.get(this).$get(TOP_FREE_BOOK_URL.get(this)).then(response => response);
    };

    getTopPaidBooks() {
        return API_SERVICE.get(this).$get(TOP_PAID_BOOK_URL.get(this)).then(response => response);
    };
}

export {booksPageService};