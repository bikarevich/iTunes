'use strict';

let variables = new WeakMap();

class MovesPageController {
    constructor(movesPageService, $state, $sce, checkLoaderService) {
        variables.set(this, {
            movesPageService,
            $state,
            $sce,
            checkLoaderService
        });
        this.init();
    }

    init() {
        this.setTopMoves();
        this.setTopVideoRentals();
    }

    setTopMoves() {
        variables.get(this).movesPageService.getTopMoves().then((response) => {
            this.topMoves = response.data.feed.entry;
            this.topMoves.forEach((item) => {
                item.summary.label = variables.get(this).$sce.trustAsHtml(item.summary.label);
            });
        });
    }

    setTopVideoRentals() {
        variables.get(this).movesPageService.getTopVideoRentals().then((response) => {
            this.topVideoRentals = response.data.feed.entry;
            this.topVideoRentals.forEach((item) => {
                item.summary.label = variables.get(this).$sce.trustAsHtml(item.summary.label);
            });
            variables.get(this).checkLoaderService.disableLoader();
        });
    }

    goToMoveView(id) {
        variables.get(this).$state.go('move', {id: id});
    }
}

export {MovesPageController};
