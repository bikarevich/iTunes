'use strict';

import {ItemViewController} from './ItemViewController';

let variables = new WeakMap();

class BookPageController extends ItemViewController {
    constructor(bookPageService, $sce, $state, $scope, checkLoaderService, pageBgService) {
        super(pageBgService, checkLoaderService, $scope, $state);
        this.bookPageService = bookPageService;
        this.$sce = $sce;
        variables.set(this, {
            bookPageService,
            $sce
        });
        this.init();
    }

    init() {
        this.setBookData();
    }

    setBookData() {
        variables.get(this).bookPageService.getBookData(this.id).then((response) => {
            this.bookData = response.data.results[0];
            this.bookData.description = variables.get(this).$sce.trustAsHtml(this.bookData.description);
            this.bookData.largePreviewImgUrl = this.getLargePreviewImage(this.bookData.artworkUrl100);
            this.setPageBg(this.bookData.largePreviewImgUrl);
        })
    }
}

export {BookPageController};