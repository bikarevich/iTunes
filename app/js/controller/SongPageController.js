'use strict';

import {ItemViewController} from './ItemViewController';

class SongPageController extends ItemViewController {
    constructor(songPageService, $state, $sce, $scope, searchResultsPageService, searchPanelService, pageBgService, checkLoaderService, $rootScope) {
        super(pageBgService, checkLoaderService, $scope, $state);
        this.songPageService = songPageService;
        this.searchResultsPageService = searchResultsPageService;
        this.searchPanelService = searchPanelService;
        this.$rootScope = $rootScope;
        this.$sce = $sce;
        this.init();
    }

    init() {
        this.setSongData();
    }

    goToAlbum(id) {
        this.$state.go('album', {id: id});
    }

    setSongData() {
        this.songPageService.getSongData(this.id).then((response) => {
            this.songData = response.data.results[0];
            this.tracksList = response.data.results;
            this.setNewDate();
            this.setPreviewImages();
            this.checkPrice();
            this.setPageBg(this.songData.largePreviewImgUrl);
        })
    }

    setNewDate() {
        let date = new Date(this.songData.releaseDate);
        let newDate = ('0' + date.getDate()).slice(-2) + ' ' + this.MONTH[date.getMonth()] + ', ' + date.getFullYear();
        this.songData.releaseDate = newDate;
    }

    setPreviewImages() {
        this.songData.largePreviewImgUrl = this.getLargePreviewImage(this.songData.artworkUrl100);
    }

    checkPrice() {
        if (this.songData.trackPrice < 0) {
            this.songData.trackPrice = 0
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

export {SongPageController};