module.exports = function (SongPageService, $state, $sce, $scope, SearchResultsPageService, SearchPanelService) {
    var ctrl = this,
        id = $state.params.id,
        img = document.createElement('img'),
        pageBg = document.createElement('canvas'),
        ctx = pageBg.getContext('2d'),
        body = document.getElementsByTagName('body')[0];

    img.crossOrigin = "Anonymous";
    ctrl.songData = [];

    ctrl.findAuthor = findAuthor;

    setSongData();

    $scope.$on("$destroy", function() {
        body.style.backgroundImage = '';
    });

    function setSongData() {
        SongPageService.getSongData(id).then(function(response) {
            ctrl.songData = response.data.results[0];
            ctrl.songData.largePreviewImgUrl = getLargePreviewImage();
            ctrl.songData.previewUrl = $sce.trustAsResourceUrl(ctrl.songData.previewUrl);
            setSongPageBg(ctrl.songData.largePreviewImgUrl);
            var date = new Date(ctrl.songData.releaseDate);
            var newDate = date.getFullYear() + '.' + ('0' + (date.getMonth()+1)).slice(-2) + '.' + ('0' + date.getDate()).slice(-2);
            ctrl.songData.releaseDate = newDate;
            if(ctrl.songData.trackPrice < 0) {
                ctrl.songData.trackPrice = 0
            }
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
            blockSize = 4,
            defaultRGB = {r:0,g:0,b:0},
            data, width, height,
            i = -3,
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
            ctx.drawImage(img, -(imgWidth-width)/2, -(imgHeight-height)/2, imgWidth, imgHeight);
            ctx.filter = 'blur(35px)';
            ctx.drawImage(img, -(imgWidth-width)/2, -(imgHeight-height)/2, imgWidth, imgHeight);
            ctx.fillStyle = 'rgba(0, 0, 0, .4)';
            ctx.fillRect(0, 0, width, height);
            data = ctx.getImageData(0, 0, imgWidth, imgHeight);
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
            if(luma < 85) {
                document.getElementsByClassName('songColorWrap')[0].classList.add('white');
            } else {
                document.getElementsByClassName('songColorWrap')[0].classList.remove('white');
            }

            var reader = new window.FileReader();

            pageBg.toBlob(function (blob) {
                reader.readAsDataURL(blob);
                reader.onloadend = function() {
                    body.style.backgroundImage = 'url(' + reader.result  + ')';
                }
            });

            img.removeEventListener('load', handler);
        });

        img.addEventListener('error', function handler() {
            console.log('image didn\'t load');
            img.removeEventListener('error', handler);
        });

        img.src = url;
    }

    function findAuthor(name) {
        SearchPanelService.getSearchResults({term : name, limit : 25, media : 'music'}).then(function (response) {
            SearchResultsPageService.setResults(response.data.results);
            if($state.current.name != 'search') {
                $state.go('search');
            } else {
                $rootScope.$emit("CallUpdateSearchResults", {});
            }
        });
    }
};