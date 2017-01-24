module.exports = function (BooksPageService, $state, $sce) {
    var ctrl = this;

    ctrl.topFreeBooks = [];
    ctrl.topPaidBooks = [];

    ctrl.goToBookView = goToBookView;

    setTopFreeBooks();
    setTopPaidBooks();

    function setTopFreeBooks() {
        BooksPageService.getTopFreeBooks().then(function (response) {
            ctrl.topFreeBooks = response.data.feed.entry;
            angular.forEach(ctrl.topFreeBooks, function(item, key) {
                item.summary.label = $sce.trustAsHtml(item.summary.label);
            });
        });
    }

    function setTopPaidBooks() {
        BooksPageService.getTopPaidBooks().then(function (response) {
            ctrl.topPaidBooks = response.data.feed.entry;
            angular.forEach(ctrl.topPaidBooks, function(item, key) {
                item.summary.label = $sce.trustAsHtml(item.summary.label);
            });
        });
    }

    function goToBookView(id) {
        $state.go('book', {id: id});
    }
};
