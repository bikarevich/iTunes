'use strict';

let variables = new WeakMap();

class movePageService {
    constructor(API, $sce) {
        variables.set(this, {
            API,
            move_url : $sce.trustAsResourceUrl('https://itunes.apple.com/lookup')
        });
    }

    getMoveData(id) {
        return variables.get(this).API.$jsonp(variables.get(this).move_url, {id: id}).then(response => response);
    };
}

export {movePageService};