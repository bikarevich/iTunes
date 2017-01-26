module.exports = function (SongPageService, $state, $sce, $scope) {
    var ctrl = this,
        id = $state.params.id,
        img = document.createElement('img'),
        pageBg = document.createElement('canvas'),
        ctx = pageBg.getContext('2d'),
        body = document.getElementsByTagName('body')[0];

    img.crossOrigin = "Anonymous";

    ctrl.songData = [];

    setSongData();

    $scope.$on("$destroy", function() {
        body.removeChild(pageBg);
    });

    function setSongData() {
        SongPageService.getSongData(id).then(function(response) {
            ctrl.songData = response.data.results[0];
            ctrl.songData.largePreviewImgUrl = getLargePreviewImage();
            ctrl.songData.previewUrl = $sce.trustAsResourceUrl(ctrl.songData.previewUrl);
            setSongPageBg(ctrl.songData.largePreviewImgUrl);
        })
    }

    function getLargePreviewImage () {
        return ctrl.songData.artworkUrl100.replace('100x100bb', '1000x1000bb');
    }

    function setSongPageBg(url) {
        var width = window.innerWidth,
            height = window.innerHeight,
            k = width/height,
            defImgSize = 1000,
            blockSize = 5,
            defaultRGB = {r:0,g:0,b:0},
            data, width, height,
            i = -4,
            length,
            rgb = {r:0,g:0,b:0},
            luma,
            count = 0,
            imgWidth,
            imgHeight;

        pageBg.classList.add('page-bg');
        pageBg.width = width;
        pageBg.height = height;

        if (width >= height) {
            imgWidth = width;
            imgHeight = defImgSize*k;
        } else {
            imgHeight = height;
            imgWidth = defImgSize/k;
        }

        img.addEventListener('load', function handler() {
            ctx.filter = 'blur(30px)';
            ctx.drawImage(img, -(imgWidth-width)/2, -(imgHeight-height)/2, imgWidth, imgHeight);

            data = ctx.getImageData(0, 0, width, height);
            length = data.data.length;

            while ( (i += blockSize * 4) < length ) {
                ++count;
                rgb.r += data.data[i];
                rgb.g += data.data[i+1];
                rgb.b += data.data[i+2];
            }

            rgb.r = Math.floor(rgb.r/count);
            rgb.g = Math.floor(rgb.g/count);
            rgb.b = Math.floor(rgb.b/count);

            luma = 0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b;

            if(luma > 70) {
                document.getElementsByClassName('songColorWrap')[0].classList.remove('white');
            } else {
                document.getElementsByClassName('songColorWrap')[0].classList.add('white');
            }

            ctx.fillStyle = 'rgba(0, 0, 0, .4)';
            ctx.fillRect(0, 0, width, height);
            body.appendChild(pageBg);
            img.removeEventListener('load', handler);
        });

        img.addEventListener('error', function handler() {
            console.log('image didn\'t load');
            img.removeEventListener('error', handler);
        });

        img.src = url;
    }
};