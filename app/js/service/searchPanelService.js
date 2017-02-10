'use strict';

let variables = new WeakMap();

class searchPanelService {
    constructor(API, $sce) {
        variables.set(this, {
            API,
            url : $sce.trustAsResourceUrl('https://itunes.apple.com/search')
        });
    }

    getSearchResults (data) {
        return variables.get(this).API.$jsonp(variables.get(this).url, data).then(response => response);
    }
}

export {searchPanelService}