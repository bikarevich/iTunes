module.exports = function (MusicPageService, $state) {
    var ctrl = this;

    ctrl.topAlbums = [];
    ctrl.topSongs = [];

    ctrl.goToSongView = goToSongView;

    function setTopAlbums() {
        MusicPageService.getTopAlbums().then(function (response) {
            ctrl.topAlbums = response.data.feed.entry;
        });
    }

    function setTopSongs() {
        MusicPageService.getTopSongs().then(function (response) {
            ctrl.topSongs = response.data.feed.entry;
        });
    }

    function goToSongView(id) {
        $state.go('song', {id: id});
    }

    setTopAlbums();
    setTopSongs();
};
