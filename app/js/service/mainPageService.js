'use strict';

let variables = new WeakMap();

class mainPageService {
    constructor(API) {
        variables.set(this, {
            API,
            books_url : 'https://itunes.apple.com/us/rss/topfreeebooks/limit=10/json',
            songs_url : 'https://itunes.apple.com/us/rss/topsongs/limit=10/json',
            movies_url : 'https://itunes.apple.com/us/rss/topmovies/limit=10/json'
        });
    }

    getTopSongs() {
        return variables.get(this).API.$get(variables.get(this).songs_url).then(response => response);
    };

    getTopMoves() {
        return variables.get(this).API.$get(variables.get(this).movies_url).then(response => response);
    };

    getTopBooks() {
        return variables.get(this).API.$get(variables.get(this).books_url).then(response => response);
    };
}

export {mainPageService};