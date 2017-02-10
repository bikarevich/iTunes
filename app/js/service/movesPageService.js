'use strict';

let variables = new WeakMap();

class movesPageService {
    constructor(API, $sce) {
        variables.set(this, {
            API,
            video_url : $sce.trustAsResourceUrl('https://itunes.apple.com/us/rss/topvideorentals/limit=10/json'),
            moves_url : $sce.trustAsResourceUrl('https://itunes.apple.com/us/rss/topmovies/limit=10/json')
        });
    }

    getTopVideoRentals() {
        return variables.get(this).API.$get(variables.get(this).video_url).then(response => response);
    };

    getTopMoves() {
        return variables.get(this).API.$get(variables.get(this).moves_url).then(response => response);
    };
}

export {movesPageService};