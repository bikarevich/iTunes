module.exports = function (AlbumPageService, $state, $sce, $scope, SearchResultsPageService, SearchPanelService, PageBgService) {
    var ctrl = this,
        id = $state.params.id,
        body = document.querySelector('body');

    ctrl.albumData = [];
    ctrl.AlbumTracks = [];
    ctrl.currentTrack = null;

    ctrl.findAuthor = findAuthor;

    setAlbumData();

    $scope.$on("$destroy", function() {
        body.style.backgroundImage = '';
    });

    function setAlbumData() {
        AlbumPageService.getAlbumData(id).then(function(response) {
            ctrl.albumData = response.data.results[0];
            ctrl.AlbumTracks = response.data.results;
            ctrl.AlbumTracks.shift();
            ctrl.albumData.largePreviewImgUrl = getLargePreviewImage();
            ctrl.albumData.previewUrl = $sce.trustAsResourceUrl(ctrl.albumData.previewUrl);
            var date = new Date(ctrl.albumData.releaseDate);
            var newDate = date.getFullYear() + '.' + ('0' + (date.getMonth()+1)).slice(-2) + '.' + ('0' + date.getDate()).slice(-2);
            ctrl.albumData.releaseDate = newDate;
            if(ctrl.albumData.trackPrice < 0) {
                ctrl.albumData.trackPrice = 0
            }
            PageBgService.getBase64Img(ctrl.albumData.largePreviewImgUrl).then(function(response) {
                body.style.backgroundImage = 'url(' + response.url  + ')';
                if(response.luma) {
                    document.querySelector('.songColorWrap').classList.add('white');
                } else {
                    document.querySelector('.songColorWrap').classList.remove('white');
                }
            });
        })
    }


    function getLargePreviewImage () {
        return ctrl.albumData.artworkUrl100.replace('100x100bb', '1000x1000bb');
    }

    function findAuthor(name) {
        SearchPanelService.getSearchResults({term : name, limit : 25, media : 'music'}).then(function (response) {
            SearchResultsPageService.setResults(response.data.results);
            if($state.current.name != 'search') {
                $state.go('search');
            } else {
                $rootScope.$emit("CallUpdateSearchResults", {});
            }
        });
    }
};