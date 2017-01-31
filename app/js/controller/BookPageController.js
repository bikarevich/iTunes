module.exports = function (BookPageService, PageBgService, $state, $sce, $scope, CheckLoaderService) {
    var ctrl = this,
        id = $state.params.id,
        img = document.createElement('img'),
        pageBg = document.createElement('canvas'),
        ctx = pageBg.getContext('2d'),
        body = document.querySelector('body');


    img.crossOrigin = "Anonymous";
    ctrl.moveData = [];

    setBookData();

    $scope.$on("$destroy", function() {
        body.style.backgroundImage = '';
    });

    function setBookData() {
        BookPageService.getBookData(id).then(function(response) {
            ctrl.bookData = response.data.results[0];
            ctrl.bookData.description = $sce.trustAsHtml(ctrl.bookData.description);
            ctrl.bookData.largePreviewImgUrl = getLargePreviewImage();
            PageBgService.getBase64Img(ctrl.bookData.largePreviewImgUrl).then(function(response) {
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
        return ctrl.bookData.artworkUrl100.replace('100x100bb', '1000x1000bb');
    }
};
