module.exports = function (MovePageService, $state, $sce) {
    var ctrl = this;
    var id = $state.params.id;

    ctrl.moveData = [];

    setSongData();

    function setSongData() {
        MovePageService.getMoveData(id).then(function(response) {
            ctrl.moveData = response.data.results[0];
            ctrl.moveData.previewUrl = $sce.trustAsResourceUrl(ctrl.moveData.previewUrl);
            ctrl.moveData.largePreviewImgUrl = getLargePreviewImage();
        })
    }

    function getLargePreviewImage () {
        return ctrl.moveData.artworkUrl100.replace('100x100bb', '1000x1000bb');
    }
};
