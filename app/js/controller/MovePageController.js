module.exports = function (MovePageService, PageBgService, $state, $sce, $scope) {
    var ctrl = this,
        id = $state.params.id,
        img = document.createElement('img'),
        pageBg = document.createElement('canvas'),
        ctx = pageBg.getContext('2d'),
        body = document.querySelector('body');

    img.crossOrigin = "Anonymous";

    ctrl.moveData = [];

    setSongData();

    $scope.$on("$destroy", function() {
        body.style.backgroundImage = '';
    });

    function setSongData() {
        MovePageService.getMoveData(id).then(function(response) {
            ctrl.moveData = response.data.results[0];
            ctrl.moveData.previewUrl = $sce.trustAsResourceUrl(ctrl.moveData.previewUrl);
            ctrl.moveData.largePreviewImgUrl = getLargePreviewImage();
            PageBgService.getBase64Img(ctrl.moveData.largePreviewImgUrl).then(function(response) {
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
        return ctrl.moveData.artworkUrl100.replace('100x100bb', '1000x1000bb');
    }
};
