module.exports = function (API, $sce) {
    var searchUrl = $sce.trustAsResourceUrl('https://itunes.apple.com/search');

    this.getSearchResults = function(data) {
        return API.$jsonp(searchUrl, data).then(function(response) {
            return response;
        })
    };

};