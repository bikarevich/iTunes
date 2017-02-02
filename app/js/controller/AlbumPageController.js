module.exports = function (AlbumPageService, $state, $sce, $scope, SearchResultsPageService, SearchPanelService, PageBgService, CheckLoaderService) {
    var ctrl = this,
        id = $state.params.id,
        body = document.querySelector('body');

    ctrl.albumData = [];
    ctrl.AlbumTracks = [];
    ctrl.currentTrack = null;

    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    ctrl.findAuthor = findAuthor;

    setAlbumData();

    $scope.$on("$destroy", function () {
        body.style.backgroundImage = '';
    });

    function setAlbumData() {
        AlbumPageService.getAlbumData(id).then(function (response) {
            ctrl.AlbumTracks = response.data.results;
            if (ctrl.AlbumTracks && ctrl.AlbumTracks.length > 0) {
                ctrl.albumData = response.data.results[0];
                ctrl.AlbumTracks.shift();
                if (ctrl.albumData.artistName === 'Various Artists') {
                    ctrl.AlbumTracks.forEach(function (item) {
                        item.trackName = item.trackName + '. ' + item.artistName;
                    })
                }
                ctrl.albumData.largePreviewImgUrl = getLargePreviewImage();
                ctrl.albumData.previewUrl = $sce.trustAsResourceUrl(ctrl.albumData.previewUrl);
                var date = new Date(ctrl.albumData.releaseDate);
                var nowDate = new Date();
                if (date > nowDate) {
                    ctrl.albumData.preorder = true;
                }
                var newDate = ('0' + date.getDate()).slice(-2) + ' ' + months[date.getMonth()] + ', ' + date.getFullYear();
                ctrl.albumData.releaseDate = newDate;
                if (ctrl.albumData.trackPrice < 0) {
                    ctrl.albumData.trackPrice = 0
                }
                PageBgService.getBase64Img(ctrl.albumData.largePreviewImgUrl).then(function (response) {
                    body.style.backgroundImage = 'url(' + response.url + ')';
                    if (response.luma) {
                        document.querySelector('.songColorWrap').classList.add('white');
                    } else {
                        document.querySelector('.songColorWrap').classList.remove('white');
                    }
                    CheckLoaderService.disableLoader();
                });
            } else {
                $state.go('index');
            }
        });
    }

    function getLargePreviewImage() {
        return ctrl.albumData.artworkUrl100.replace('100x100bb', '1000x1000bb');
    }

    function findAuthor(name) {
        SearchPanelService.getSearchResults({term: name, limit: 200, media: 'music'}).then(function (response) {
            SearchResultsPageService.setResults(response.data);
            if ($state.current.name != 'search') {
                $state.go('search');
            } else {
                $rootScope.$emit("CallUpdateSearchResults", {});
            }
        });
    }
};