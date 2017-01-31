module.exports = function (SongPageService, $state, $sce, $scope, SearchResultsPageService, SearchPanelService, PageBgService, CheckLoaderService) {
    var ctrl = this,
        id = $state.params.id,
        body = document.querySelector('body');

    ctrl.songData = [];

    ctrl.findAuthor = findAuthor;
    ctrl.goToAlbum = goToAlbum;

    setSongData();

    $scope.$on("$destroy", function() {
        body.style.backgroundImage = '';
    });


    function goToAlbum(id) {
        $state.go('album', {id : id});
    }

    function setSongData() {
        SongPageService.getSongData(id).then(function(response) {
            var duration;
            ctrl.songData = response.data.results[0];
            ctrl.tracksList = response.data.results;
            ctrl.songData.largePreviewImgUrl = getLargePreviewImage();
            var date = new Date(ctrl.songData.releaseDate);
            var newDate = date.getFullYear() + '.' + ('0' + (date.getMonth()+1)).slice(-2) + '.' + ('0' + date.getDate()).slice(-2);
            ctrl.songData.releaseDate = newDate;
            if(ctrl.songData.trackPrice < 0) {
                ctrl.songData.trackPrice = 0
            }
            PageBgService.getBase64Img(ctrl.songData.largePreviewImgUrl).then(function(response) {
                body.style.backgroundImage = 'url(' + response.url  + ')';
                if(response.luma) {
                    document.querySelector('.songColorWrap').classList.add('white');
                } else {
                    document.querySelector('.songColorWrap').classList.remove('white');
                }
                CheckLoaderService.disableLoader();
            });
        })
    }

    function getLargePreviewImage () {
        return ctrl.songData.artworkUrl100.replace('100x100bb', '1000x1000bb');
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