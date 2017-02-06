const STATE = new WeakMap();
const SCE = new WeakMap();
const CHECK_LOADER_SERVICE = new WeakMap();
const MOVE_PAGE_SERVICE = new WeakMap();

class MovesPageController {
    constructor(movesPageService, $state, $sce, checkLoaderService) {
        CHECK_LOADER_SERVICE.set(this, checkLoaderService);
        MOVE_PAGE_SERVICE.set(this, movesPageService);
        STATE.set(this, $state);
        SCE.set(this, $sce);

        this.init();
    }

    init() {
        this.setTopMoves();
        this.setTopVideoRentals();
    }

    setTopMoves() {
        MOVE_PAGE_SERVICE.get(this).getTopMoves().then((response) => {
            this.topMoves = response.data.feed.entry;
            this.topMoves.forEach((item) => {
                item.summary.label = SCE.get(this).trustAsHtml(item.summary.label);
            });
        });
    }

    setTopVideoRentals() {
        MOVE_PAGE_SERVICE.get(this).getTopVideoRentals().then((response) => {
            this.topVideoRentals = response.data.feed.entry;
            this.topVideoRentals.forEach((item) => {
                item.summary.label = SCE.get(this).trustAsHtml(item.summary.label);
            });
            CHECK_LOADER_SERVICE.get(this).disableLoader();
        });
    }

    goToMoveView(id) {
        STATE.get(this).go('move', {id: id});
    }
}

export {MovesPageController};
