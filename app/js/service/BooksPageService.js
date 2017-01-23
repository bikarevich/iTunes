module.exports = function (API) {
    var topFreeBooksUrl = 'https://itunes.apple.com/us/rss/topfreeebooks/limit=10/json';
    var topPaidtBooksUrl = 'https://itunes.apple.com/us/rss/toppaidebooks/limit=10/json';

    this.getTopFreeBooks = function() {
        return API.$get(topFreeBooksUrl).then(function(response) {
            return response;
        })
    };

    this.getTopPaidBooks = function() {
        return API.$get(topPaidtBooksUrl).then(function(response) {
            return response;
        })
    };
};