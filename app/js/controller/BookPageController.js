const BOOK_PAGE_SERVICE = new WeakMap();
const STATE = new WeakMap();
const SCE = new WeakMap();
const SCOPE = new WeakMap();
const CHECK_LOADER_SERVICE = new WeakMap();
const PAGE_BG_SERVICE = new WeakMap();

class BookPageController {
    constructor(bookPageService, PageBgService, $state, $sce, $scope, CheckLoaderService) {
        BOOK_PAGE_SERVICE.set(this, bookPageService);
        CHECK_LOADER_SERVICE.set(this, CheckLoaderService);
        STATE.set(this, $state);
        SCE.set(this, $sce);
        SCOPE.set(this, $scope);
        PAGE_BG_SERVICE.set(this, PageBgService);

        this.id = STATE.get(this).params.id;
        this.body = document.querySelector('body');

        SCOPE.get(this).$on("$destroy", () => {
            this.body.style.backgroundImage = '';
        });

        this.init();
    }

    init() {
        this.setBookData();
    }

    setBookData() {
        BOOK_PAGE_SERVICE.get(this).getBookData(this.id).then((response) => {
            this.bookData = response.data.results[0];
            this.bookData.description = SCE.get(this).trustAsHtml(this.bookData.description);
            this.bookData.largePreviewImgUrl = this.getLargePreviewImage();
            PAGE_BG_SERVICE.get(this).getBase64Img(this.bookData.largePreviewImgUrl).then((response) => {
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
        return this.bookData.artworkUrl100.replace('100x100bb', '1000x1000bb');
    }
}

export {BookPageController};