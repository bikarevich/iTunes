module.exports = function (MainPageService) {
    var ctrl = this;

    ctrl.topSongs = [];
    ctrl.topMoves = [];
    ctrl.topBooks = [];

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

    setTopMoves();
    setTopBooks();
    setTopSongs();
};
