const BOOKS_PAGE_SERVICE = new WeakMap();
const STATE = new WeakMap();
const SCE = new WeakMap();
const CHECK_LOADER_SERVICE = new WeakMap();

class BooksPageController {
    constructor(booksPageService, $state, $sce, checkLoaderService) {
        BOOKS_PAGE_SERVICE.set(this, booksPageService);
        CHECK_LOADER_SERVICE.set(this, checkLoaderService);
        STATE.set(this, $state);
        SCE.set(this, $sce);

        this.init();
    }

    init() {
        this.setTopFreeBooks();
        this.setTopPaidBooks();
    }

    setTopFreeBooks() {
        BOOKS_PAGE_SERVICE.get(this).getTopFreeBooks().then((response) => {
            this.topFreeBooks = response.data.feed.entry;
            this.topFreeBooks.forEach((item) => {
                item.summary.label = SCE.get(this).trustAsHtml(item.summary.label);
                CHECK_LOADER_SERVICE.get(this).disableLoader();
            });
        });
    }

    setTopPaidBooks() {
        BOOKS_PAGE_SERVICE.get(this).getTopPaidBooks().then((response) => {
            this.topPaidBooks = response.data.feed.entry;
            this.topPaidBooks.forEach((item) => {
                item.summary.label = SCE.get(this).trustAsHtml(item.summary.label);
            });
        });
    }

    goToBookView(id) {
        STATE.get(this).go('book', {id: id});
    }
}

export {BooksPageController};
