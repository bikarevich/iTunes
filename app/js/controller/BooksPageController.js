module.exports = function (BooksPageService, $state, $sce, CheckLoaderService) {
    var ctrl = this;

    ctrl.topFreeBooks = [];
    ctrl.topPaidBooks = [];

    ctrl.goToBookView = goToBookView;

    setTopFreeBooks();
    setTopPaidBooks();

    function setTopFreeBooks() {
        BooksPageService.getTopFreeBooks().then(function (response) {
            ctrl.topFreeBooks = response.data.feed.entry;
            angular.forEach(ctrl.topFreeBooks, function (item, key) {
                item.summary.label = $sce.trustAsHtml(item.summary.label);
                CheckLoaderService.disableLoader();
            });
        });
    }

    function setTopPaidBooks() {
        BooksPageService.getTopPaidBooks().then(function (response) {
            ctrl.topPaidBooks = response.data.feed.entry;
            angular.forEach(ctrl.topPaidBooks, function (item, key) {
                item.summary.label = $sce.trustAsHtml(item.summary.label);
            });
        });
    }

    function goToBookView(id) {
        $state.go('book', {id: id});
    }
};
