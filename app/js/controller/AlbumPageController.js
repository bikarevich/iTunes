'use strict';

import {ItemViewController} from './ItemViewController';

class AlbumPageController extends ItemViewController {
    constructor(albumPageService, $state, $sce, $scope, searchResultsPageService, searchPanelService, pageBgService, checkLoaderService, $rootScope) {
        super(pageBgService, checkLoaderService, $scope, $state);
        this.albumPageService = albumPageService;
        this.searchPanelService = searchPanelService;
        this.searchResultsPageService = searchResultsPageService;
        this.$sce = $sce;
        this.$rootScope = $rootScope;
        this.init();
    }

    init() {
        this.setAlbumData();
    }

    setAlbumData() {
        this.albumPageService.getAlbumData(this.id).then((response) => {
            this.AlbumTracks = response.data.results;
            if (this.AlbumTracks && this.AlbumTracks.length > 0) {
                this.albumData = response.data.results[0];
                this.AlbumTracks.shift();
                this.setVariousArtist();
                this.setNewDate();
                this.setPreviewImages();
                this.checkPrice();
                this.setPageBg(this.albumData.largePreviewImgUrl);
            } else {
                this.$state.go('index');
            }
        });
    }

    setVariousArtist() {
        if (this.albumData.artistName === 'Various Artists') {
            this.AlbumTracks.forEach(function (item) {
                item.trackName = item.trackName + '. ' + item.artistName;
            })
        }
    }

    setNewDate() {
        let date = new Date(this.albumData.releaseDate);
        let nowDate = new Date();
        if (date > nowDate) {
            this.albumData.preorder = true;
        }
        let newDate = ('0' + date.getDate()).slice(-2) + ' ' + this.MONTH[date.getMonth()] + ', ' + date.getFullYear();
        this.albumData.releaseDate = newDate;
    }

    setPreviewImages() {
        this.albumData.largePreviewImgUrl = this.getLargePreviewImage(this.albumData.artworkUrl100);
        this.albumData.previewUrl = this.$sce.trustAsResourceUrl(this.albumData.largePreviewImgUrl);
    }

    checkPrice() {
        if (this.albumData.trackPrice < 0) {
            this.albumData.trackPrice = 0
        }
    }

    findAuthor(name) {
        this.searchPanelService.getSearchResults({term: name, limit: 200, media: 'music'}).then((response) => {
            this.searchResultsPageService.setResults(response.data);
            if (this.$state.current.name != 'search') {
                this.$state.go('search');
            } else {
                this.$rootScope.$emit("CallUpdateSearchResults", {});
            }
        });
    }
}

export {AlbumPageController};