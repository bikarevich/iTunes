'use strict';

let variables = new WeakMap();

class bookPageService {
    constructor(API, $sce) {
        variables.set(this, {
            API,
            book_url : $sce.trustAsResourceUrl('https://itunes.apple.com/lookup')
        });
    }

    getBookData(id) {
        return variables.get(this).API.$jsonp(variables.get(this).book_url, {id:id}).then(response => response);
    };
}

export {bookPageService};