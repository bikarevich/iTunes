module.exports = function (MusicPageService) {
    var ctrl = this;

    ctrl.topAlbums = [];
    ctrl.topSongs = [];

    function setTopAlbums() {
        MusicPageService.getTopAlbums().then(function (response) {
            ctrl.topAlbums = response.data.feed.entry;
            console.log(ctrl.topAlbums);
        });
    }

    function setTopSongs() {
        MusicPageService.getTopSongs().then(function (response) {
            ctrl.topSongs = response.data.feed.entry;
        });
    }

    setTopAlbums();
    setTopSongs();
};
