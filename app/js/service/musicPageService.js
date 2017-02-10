'use strict';

let variables = new WeakMap();

class musicPageService {
    constructor(API, $sce) {
        variables.set(this, {
            API,
            albums_url: $sce.trustAsResourceUrl('https://itunes.apple.com/us/rss/topalbums/limit=10/json'),
            songs_url: $sce.trustAsResourceUrl('https://itunes.apple.com/us/rss/topsongs/limit=10/json')
        });
    }

    getTopAlbums() {
        return variables.get(this).API.$get(variables.get(this).albums_url).then(response => response);
    };

    getTopSongs() {
        return variables.get(this).API.$get(variables.get(this).songs_url).then(response => response);
    };
}

export {musicPageService};