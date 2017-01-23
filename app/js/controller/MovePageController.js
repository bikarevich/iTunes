module.exports = function (MovePageService, $state) {
    var ctrl = this;
    var id = $state.params.id;

    ctrl.moveData = [];

    setSongData();

    function setSongData() {
        MovePageService.getMoveData(id).then(function(response) {
            ctrl.moveData = response.data.results[0];
        })
    }
};
