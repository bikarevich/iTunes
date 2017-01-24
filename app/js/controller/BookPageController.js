module.exports = function (BookPageService, $state, $sce) {
    var ctrl = this;
    var id = $state.params.id;

    ctrl.moveData = [];

    setBookData();

    function setBookData() {
        BookPageService.getBookData(id).then(function(response) {
            ctrl.bookData = response.data.results[0];
            ctrl.bookData.description = $sce.trustAsHtml(ctrl.bookData.description);
        })
    }
};
