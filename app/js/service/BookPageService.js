module.exports = function (API, $sce) {
    var bookUrl =  $sce.trustAsResourceUrl('https://itunes.apple.com/lookup');

    this.getBookData = function(id) {
        return API.$jsonp(bookUrl, {id:id}).then(function(response) {
            return response;
        })
    };
};