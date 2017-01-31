module.exports = function () {
    this.getBase64Img = function (url) {
        return promise = new Promise(function (resolve, reject) {
            var width = window.innerWidth,
                height = window.innerHeight,
                pageBg = document.createElement('canvas'),
                body = document.querySelector('body'),
                img = document.createElement('img'),
                ctx = pageBg.getContext('2d'),
                k = width / height,
                defImgSize = 1000,
                blockSize = 4,
                defaultRGB = {r: 0, g: 0, b: 0},
                data,
                i = -3,
                length,
                rgb = {r: 0, g: 0, b: 0},
                luma,
                count = 0,
                imgWidth,
                imgHeight,
                lumaClass;

            img.crossOrigin = "Anonymous";

            pageBg.classList.add('page-bg');
            pageBg.width = width;
            pageBg.height = height;

            if (width >= height) {
                imgWidth = width;
                imgHeight = defImgSize * k;
            } else {
                imgHeight = height;
                imgWidth = defImgSize / k;
            }

            img.addEventListener('load', function handler() {
                ctx.filter = 'blur(35px)';
                ctx.drawImage(img, -(imgWidth*1.4 - width) / 2, -(imgHeight*1.4 - height) / 2, imgWidth*1.4, imgHeight*1.4);
                ctx.globalAlpha = 0.4;
                ctx.fillRect(0, 0, width, height);
                data = ctx.getImageData(0, 0, imgWidth, imgHeight);
                length = data.data.length;
                while ((i += blockSize * 4) < length) {
                    ++count;
                    rgb.r += data.data[i];
                    rgb.g += data.data[i + 1];
                    rgb.b += data.data[i + 2];
                }
                rgb.r = Math.floor(rgb.r / count);
                rgb.g = Math.floor(rgb.g / count);
                rgb.b = Math.floor(rgb.b / count);

                luma = 0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b;
                if (luma < 85) {
                    lumaClass = true;
                } else {
                    lumaClass = false;
                }

                var reader = new window.FileReader();

                pageBg.toBlob(function (blob) {
                    reader.readAsDataURL(blob);
                    reader.addEventListener('loadend', function handler(){
                        reader.removeEventListener('loadend', handler);
                        pageBg = null;
                        img = null;
                        resolve({url : reader.result, luma : lumaClass});
                    });
                });

                img.removeEventListener('load', handler);
            });

            img.addEventListener('error', function handler() {
                console.log('image didn\'t load');
                img.removeEventListener('error', handler);
                reject('Error');
            });

            img.src = url;
        });




    };
};