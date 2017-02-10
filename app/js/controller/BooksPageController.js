'use strict';

let variables = new WeakMap();

class BooksPageController {
    constructor(booksPageService, $state, $sce, checkLoaderService) {
        variables.set(this, {
            booksPageService,
            $state,
            $sce,
            checkLoaderService
        });
        this.init();
    }

    init() {
        this.setTopFreeBooks();
        this.setTopPaidBooks();
    }

    setTopFreeBooks() {
        variables.get(this).booksPageService.getTopFreeBooks().then((response) => {
            this.topFreeBooks = response.data.feed.entry;
            this.topFreeBooks.forEach((item) => {
                item.summary.label = variables.get(this).$sce.trustAsHtml(item.summary.label);
                variables.get(this).checkLoaderService.disableLoader();
            });
        });
    }

    setTopPaidBooks() {
        variables.get(this).booksPageService.getTopPaidBooks().then((response) => {
            this.topPaidBooks = response.data.feed.entry;
            this.topPaidBooks.forEach((item) => {
                item.summary.label = variables.get(this).$sce.trustAsHtml(item.summary.label);
            });
        });
    }

    goToBookView(id) {
        variables.get(this).$state.go('book', {id: id});
    }
}

export {BooksPageController};
