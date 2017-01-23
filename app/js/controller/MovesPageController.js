module.exports = function (MovesPageService) {
    var ctrl = this;

    ctrl.topVideoRentals = [];
    ctrl.topMoves = [];

    function setTopMoves() {
        MovesPageService.getTopMoves().then(function (response) {
            ctrl.topMoves = response.data.feed.entry;
        });
    }

    function setTopVideoRentals() {
        MovesPageService.getTopVideoRentals().then(function (response) {
            ctrl.topVideoRentals = response.data.feed.entry;
        });
    }

    setTopMoves();
    setTopVideoRentals();
};
