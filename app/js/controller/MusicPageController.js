module.exports = function (MusicPageService, $state, CheckLoaderService) {
    var ctrl = this;

    ctrl.topAlbums = [];
    ctrl.topSongs = [];

    ctrl.goToSongView = goToSongView;
    ctrl.goToAlbumView = goToAlbumView;

    function setTopAlbums() {
        MusicPageService.getTopAlbums().then(function (response) {
            ctrl.topAlbums = response.data.feed.entry;
        });
    }

    function setTopSongs() {
        MusicPageService.getTopSongs().then(function (response) {
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

    setTopAlbums();
    setTopSongs();
};
