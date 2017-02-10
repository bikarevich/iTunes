'use strict';

let variables = new WeakMap();

class ItemViewController {
    constructor(pageBgService, checkLoaderService, $scope, $state) {
        variables.set(this, {
            pageBgService,
            checkLoaderService,
            $scope
        });
        this.MONTH = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        this.id = $state.params.id;
        $scope.$on("$destroy", () => {
            document.querySelector('body').style.backgroundImage = '';
        });
    }

    setPageBg(image) {
        let classList = document.querySelector('.songColorWrap').classList;
        variables.get(this).pageBgService.getBase64Img(image).then((response) => {
            document.querySelector('body').style.backgroundImage = 'url(' + response.url + ')';
            if (response.luma) {
                classList.add('white');
            } else {
                classList.remove('white');
            }
            this.checkLoader();
        });
    }

    checkLoader() {
        variables.get(this).checkLoaderService.disableLoader();
    }

    getLargePreviewImage(imgUrl) {
        return imgUrl.replace('100x100bb', '1000x1000bb');
    }
}

export {ItemViewController};