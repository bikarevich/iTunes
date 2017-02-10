'use strict';

import {ItemViewController} from './ItemViewController';

let variables = new WeakMap();

class AlbumPageController extends ItemViewController {
    constructor(albumPageService, $state, $sce, $scope, searchResultsPageService, searchPanelService, pageBgService, checkLoaderService, $rootScope) {
        super(pageBgService, checkLoaderService, $scope, $state);
        variables.set(this, {
            albumPageService,
            $state,
            $sce,
            searchResultsPageService,
            searchPanelService,
            checkLoaderService,
            $rootScope
        });
        this.init();
    }

    init() {
        this.setAlbumData();
    }

    setAlbumData() {
        variables.get(this).albumPageService.getAlbumData(this.id).then((response) => {
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
                variables.get(this).$state.go('index');
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
        let dateOptions = {year: 'numeric', month: 'long', day: 'numeric' };
        if (date > nowDate) {
            this.albumData.preorder = true;
        }
        this.albumData.releaseDate = new Intl.DateTimeFormat('en-US', dateOptions).format(date);
    }

    setPreviewImages() {
        this.albumData.largePreviewImgUrl = this.getLargePreviewImage(this.albumData.artworkUrl100);
        this.albumData.previewUrl = variables.get(this).$sce.trustAsResourceUrl(this.albumData.largePreviewImgUrl);
    }

    checkPrice() {
        if (this.albumData.trackPrice < 0) {
            this.albumData.trackPrice = 0
        }
    }

    findAuthor(name) {
        let $state = variables.get(this).$state;
        variables.get(this).checkLoaderService.enableLoader();
        variables.get(this).searchPanelService.getSearchResults({term: name, limit: 200, media: 'music'}).then((response) => {
            variables.get(this).searchResultsPageService.setResults(response.data);
            if ($state.current.name != 'search') {
                $state.go('search');
            } else {
                variables.get(this).$rootScope.$emit("CallUpdateSearchResults", {});
            }
        });
    }
}

export {AlbumPageController};