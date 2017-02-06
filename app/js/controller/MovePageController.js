const MOVE_PAGE_SERVICE = new WeakMap();
const CHECK_LOADER_SERVICE = new WeakMap();
const PAGE_BG_SERVICE = new WeakMap();
const STATE = new WeakMap();
const SCE = new WeakMap();
const SCOPE = new WeakMap();

class MovePageController {
    constructor(movePageService, PageBgService, $state, $sce, $scope, CheckLoaderService) {
        MOVE_PAGE_SERVICE.set(this, movePageService);
        CHECK_LOADER_SERVICE.set(this, CheckLoaderService);
        PAGE_BG_SERVICE.set(this, PageBgService);
        STATE.set(this, $state);
        SCE.set(this, $sce);
        SCOPE.set(this, $scope);

        this.id = STATE.get(this).params.id;
        this.body = document.querySelector('body');

        SCOPE.get(this).$on("$destroy", () => {
            this.body.style.backgroundImage = '';
        });

        this.init();
    }
    
    init() {
        this.setSongData();
    }


    setSongData() {
        MOVE_PAGE_SERVICE.get(this).getMoveData(this.id).then((response) => {
            this.moveData = response.data.results[0];
            this.moveData.previewUrl = SCE.get(this).trustAsResourceUrl(this.moveData.previewUrl);
            this.moveData.largePreviewImgUrl = this.getLargePreviewImage();
            PAGE_BG_SERVICE.get(this).getBase64Img(this.moveData.largePreviewImgUrl).then((response) => {
                this.body.style.backgroundImage = 'url(' + response.url + ')';
                if (response.luma) {
                    document.querySelector('.songColorWrap').classList.add('white');
                } else {
                    document.querySelector('.songColorWrap').classList.remove('white');
                }
                CHECK_LOADER_SERVICE.get(this).disableLoader();
            });
        })
    }

    getLargePreviewImage() {
        return this.moveData.artworkUrl100.replace('100x100bb', '1000x1000bb');
    }
}

export {MovePageController};