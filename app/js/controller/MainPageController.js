module.exports = function (MainPageService, $state, $sce, CheckLoaderService) {
    var ctrl = this;

    ctrl.topSongs = [];
    ctrl.topMoves = [];
    ctrl.topBooks = [];

    setTopMoves();
    setTopBooks();
    setTopSongs();

    ctrl.goToSongView = goToSongView;
    ctrl.goToMoveView = goToMoveView;
    ctrl.goToBookView = goToBookView;
    ctrl.goToAlbumView = goToAlbumView;

    function setTopMoves() {
        MainPageService.getTopMoves().then(function (response) {
            ctrl.topMoves = response.data.feed.entry;
            angular.forEach(ctrl.topMoves, function(item, key) {
                 item.summary.label = $sce.trustAsHtml(item.summary.label);
            });
        });
    }

    function setTopBooks() {
        MainPageService.getTopBooks().then(function (response) {
            ctrl.topBooks = response.data.feed.entry;
            angular.forEach(ctrl.topBooks, function(item, key) {
                item.summary.label = $sce.trustAsHtml(item.summary.label);
            });
        });
    }

    function setTopSongs() {
        MainPageService.getTopSongs().then(function (response) {
            ctrl.topSongs = response.data.feed.entry;
            ctrl.topSongs.forEach(function (item) {
                var href = item['im:collection'].link.attributes.href;
                item.collectionId = href.substring(href.lastIndexOf("/")+3,href.lastIndexOf("?"));
            });
            CheckLoaderService.disableLoader();
        });
    }

    function goToAlbumView(id) {
        $state.go('album', {id: id});
    }

    function goToSongView(id) {
        $state.go('song', {id: id});
    }

    function goToMoveView(id) {
        $state.go('move', {id: id});
    }

    function goToBookView(id) {
        $state.go('book', {id: id});
    }


};
