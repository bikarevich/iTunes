module.exports = function (API) {
    var topSongsUrl = 'https://itunes.apple.com/us/rss/topsongs/limit=10/json';
    var topBooksUrl = 'https://itunes.apple.com/us/rss/topfreeebooks/limit=10/json';
    var topMovesUrl = 'https://itunes.apple.com/us/rss/topmovies/limit=10/json';

    this.getTopSongs = function() {
        return API.$get(topSongsUrl).then(function(response) {
            return response;
        })
    };

    this.getTopMoves = function() {
        return API.$get(topMovesUrl).then(function(response) {
            return response;
        })
    };

    this.getTopBooks = function() {
        return API.$get(topBooksUrl).then(function(response) {
            return response;
        })
    };
};