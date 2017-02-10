'use strict';

let variables = new WeakMap();

class songPageService {
    constructor(API, $sce) {
        variables.set(this, {
            API,
            song_url : $sce.trustAsResourceUrl('https://itunes.apple.com/lookup'),
            author_url : $sce.trustAsResourceUrl('https://itunes.apple.com/search'),
        });
    }

    getSongData(id) {
        return variables.get(this).API.$jsonp(variables.get(this).song_url, {id: id}).then(response => response);
    }

    getAuthorTracks(name) {
        return variables.get(this).API.$jsonp(variables.get(this).author_url, {term: name}).then(response => response);
    }
}

export {songPageService};