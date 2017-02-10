'use strict';

import {ItemViewController} from './ItemViewController';

let variables = new WeakMap();

class SongPageController extends ItemViewController {
    constructor(songPageService, $state, $sce, $scope, searchResultsPageService, searchPanelService, pageBgService, checkLoaderService, $rootScope) {
        super(pageBgService, checkLoaderService, $scope, $state);
        variables.set(this, {
            songPageService,
            $state,
            $sce,
            $scope,
            searchResultsPageService,
            searchPanelService,
            pageBgService,
            checkLoaderService,
            $rootScope
        });
        this.init();
    }

    init() {
        this.setSongData();
    }

    goToAlbum(id) {
        variables.get(this).$state.go('album', {id: id});
    }

    setSongData() {
        variables.get(this).songPageService.getSongData(this.id).then((response) => {
            this.songData = response.data.results[0];
            this.tracksList = response.data.results;
            this.setNewDate();
            this.setPreviewImages();
            this.checkPrice();
            this.setPageBg(this.songData.largePreviewImgUrl);
        })
    }

    setNewDate() {
        let dateOptions = {year: 'numeric', month: 'long', day: 'numeric' };
        let date = new Date(this.songData.releaseDate);
        this.songData.releaseDate = new Intl.DateTimeFormat('en-US', dateOptions).format(date);
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
        let $state = variables.get(this).$state;
        variables.get(this).searchPanelService.getSearchResults({
            term: name,
            limit: 200,
            media: 'music'
        }).then((response) => {
            variables.get(this).searchResultsPageService.setResults(response.data);
            if ($state.current.name != 'search') {
                $state.go('search');
            } else {
                variables.get(this).$rootScope.$emit("CallUpdateSearchResults", {});
            }
        });
    }
}

export {SongPageController};