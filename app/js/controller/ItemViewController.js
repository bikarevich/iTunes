'use strict';

class ItemViewController {
    constructor(pageBgService, checkLoaderService, $scope, $state) {
        this.MONTH = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        this.pageBgService = pageBgService;
        this.checkLoaderService = checkLoaderService;
        this.$state = $state;
        this.id = $state.params.id;

        $scope.$on("$destroy", () => {
            document.querySelector('body').style.backgroundImage = '';
        });
    }

    setPageBg(image) {
        this.pageBgService.getBase64Img(image).then((response) => {
            document.querySelector('body').style.backgroundImage = 'url(' + response.url + ')';
            if (response.luma) {
                document.querySelector('.songColorWrap').classList.add('white');
            } else {
                document.querySelector('.songColorWrap').classList.remove('white');
            }
            this.checkLoader();
        });
    }

    checkLoader() {
        this.checkLoaderService.disableLoader();
    }

    getLargePreviewImage(imgUrl) {
        return imgUrl.replace('100x100bb', '1000x1000bb');
    }
}

export {ItemViewController};