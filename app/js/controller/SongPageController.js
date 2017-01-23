module.exports = function (SongPageService, $state, $sce) {
    var ctrl = this;
    var id = $state.params.id;

    ctrl.songData = [];

    setSongData();

    function setSongData() {
        SongPageService.getSongData(id).then(function(response) {
            ctrl.songData = response.data.results[0];
        })
    }
};
