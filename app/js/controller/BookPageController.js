module.exports = function (BookPageService, $state, $sce) {
    var ctrl = this;
    var id = $state.params.id;

    ctrl.moveData = [];

    setBookData();

    function setBookData() {
        BookPageService.getBookData(id).then(function(response) {
            ctrl.bookData = response.data.results[0];
            ctrl.bookData.description = $sce.trustAsHtml(ctrl.bookData.description);
            ctrl.bookData.largePreviewImgUrl = getLargePreviewImage();
        })
    }

    function getLargePreviewImage () {
        return ctrl.bookData.artworkUrl100.replace('100x100bb', '1000x1000bb');
    }
};
