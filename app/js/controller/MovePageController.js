'use strict';

import {ItemViewController} from './ItemViewController';

let variables = new WeakMap();

class MovePageController extends ItemViewController {
    constructor(movePageService, pageBgService, $state, $sce, $scope, checkLoaderService) {
        super(pageBgService, checkLoaderService, $scope, $state);
        variables.set(this, {
            movePageService,
            $sce
        });
        this.init();
    }
    
    init() {
        this.setSongData();
    }

    setSongData() {
        variables.get(this).movePageService.getMoveData(this.id).then((response) => {
            this.moveData = response.data.results[0];
            this.moveData.previewUrl = variables.get(this).$sce.trustAsResourceUrl(this.moveData.previewUrl);
            this.moveData.largePreviewImgUrl = this.getLargePreviewImage(this.moveData.artworkUrl100);
            this.setPageBg(this.moveData.largePreviewImgUrl);
        })
    }
}

export {MovePageController};