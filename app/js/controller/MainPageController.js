module.exports = function (MainPageService, $state) {
    var ctrl = this;

    ctrl.topSongs = [];
    ctrl.topMoves = [];
    ctrl.topBooks = [];

    setTopMoves();
    setTopBooks();
    setTopSongs();

    ctrl.goToSongView = goToSongView;
    ctrl.goToMoveView = goToMoveView;

    function setTopMoves() {
        MainPageService.getTopMoves().then(function (response) {
            ctrl.topMoves = response.data.feed.entry;
        });
    }

    function setTopBooks() {
        MainPageService.getTopBooks().then(function (response) {
            ctrl.topBooks = response.data.feed.entry;
        });
    }

    function setTopSongs() {
        MainPageService.getTopSongs().then(function (response) {
            ctrl.topSongs = response.data.feed.entry;
        });
    }

    function goToSongView(id) {
        $state.go('song', {id: id});
    }

    function goToMoveView(id) {
        $state.go('move', {id: id});
    }


};
