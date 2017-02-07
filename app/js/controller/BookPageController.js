'use strict';

import {ItemViewController} from './ItemViewController';

class BookPageController extends ItemViewController {
    constructor(bookPageService, $sce, $state, $scope, checkLoaderService, pageBgService) {
        super(pageBgService, checkLoaderService, $scope, $state);
        this.bookPageService = bookPageService;
        this.$sce = $sce;
        this.init();
    }

    init() {
        this.setBookData();
    }

    setBookData() {
        this.bookPageService.getBookData(this.id).then((response) => {
            this.bookData = response.data.results[0];
            this.bookData.description = this.$sce.trustAsHtml(this.bookData.description);
            this.bookData.largePreviewImgUrl = this.getLargePreviewImage(this.bookData.artworkUrl100);
            this.setPageBg(this.bookData.largePreviewImgUrl);
        })
    }
}

export {BookPageController};