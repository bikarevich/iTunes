module.exports = function (MovesPageService, $state, $sce) {
    var ctrl = this;

    ctrl.topVideoRentals = [];
    ctrl.topMoves = [];

    ctrl.goToMoveView = goToMoveView;

    setTopMoves();
    setTopVideoRentals();

    function setTopMoves() {
        MovesPageService.getTopMoves().then(function (response) {
            ctrl.topMoves = response.data.feed.entry;
            angular.forEach(ctrl.topMoves, function(item, key) {
                item.summary.label = $sce.trustAsHtml(item.summary.label);
            });
        });
    }

    function setTopVideoRentals() {
        MovesPageService.getTopVideoRentals().then(function (response) {
            ctrl.topVideoRentals = response.data.feed.entry;
            angular.forEach(ctrl.topVideoRentals, function(item, key) {
                item.summary.label = $sce.trustAsHtml(item.summary.label);
            });
        });
    }

    function goToMoveView(id) {
        $state.go('move', {id: id});
    }
};
