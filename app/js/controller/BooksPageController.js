module.exports = function (BooksPageService) {
    var ctrl = this;

    ctrl.topFreeBooks = [];
    ctrl.topPaidBooks = [];

    function setTopFreeBooks() {
        BooksPageService.getTopFreeBooks().then(function (response) {
            ctrl.topFreeBooks = response.data.feed.entry;
        });
    }

    function setTopPaidBooks() {
        BooksPageService.getTopPaidBooks().then(function (response) {
            ctrl.topPaidBooks = response.data.feed.entry;
        });
    }

    setTopFreeBooks();
    setTopPaidBooks();
};
