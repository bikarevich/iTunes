const HTTP = new WeakMap();

class API {
    constructor($http) {
        HTTP.set(this, $http);
    }

    $get(url, params, options) {
        return HTTP.get(this)({
            method: 'GET',
            url: url,
            params: params
        }, options).then(response => response, response => response);
    };

    $jsonp(url, params, options) {
        return HTTP.get(this)({
            method: 'jsonp',
            url: url,
            params: params
        }, options).then(response => response, response => response);
    };
}

export {API};