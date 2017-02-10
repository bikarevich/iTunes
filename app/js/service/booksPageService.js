'use strict';

let variables = new WeakMap();

class booksPageService {
    constructor($sce, API) {
        variables.set(this, {
            API,
            free_url: $sce.trustAsResourceUrl('https://itunes.apple.com/us/rss/topfreeebooks/limit=10/json'),
            paid_url: $sce.trustAsResourceUrl('https://itunes.apple.com/us/rss/toppaidebooks/limit=10/json')
        });
    }

    getTopFreeBooks() {
        return variables.get(this).API.$get(variables.get(this).free_url).then(response => response);
    };

    getTopPaidBooks() {
        return variables.get(this).API.$get(variables.get(this).paid_url).then(response => response);
    };
}

export {booksPageService};