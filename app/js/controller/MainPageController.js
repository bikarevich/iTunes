module.exports = function (MainPageService, $state) {
    var ctrl = this;

    ctrl.topSongs = [];
    ctrl.topMoves = [];
    ctrl.topBooks = [];

    setTopMoves();
    setTopBooks();
    setTopSongs();

    ctrl.goToSongView = goToSongView;

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
            console.log(response);
        });
    }

    function goToSongView(id) {
        console.log(id);
        $state.go('song', {id: id});
    }


};
