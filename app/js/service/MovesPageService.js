module.exports = function (API) {
    var topVideoRentalsUrl = 'https://itunes.apple.com/us/rss/topvideorentals/limit=10/json';
    var topMovesUrl = 'https://itunes.apple.com/us/rss/topmovies/limit=10/json';

    this.getTopVideoRentals = function() {
        return API.$get(topVideoRentalsUrl).then(function(response) {
            return response;
        })
    };

    this.getTopMoves = function() {
        return API.$get(topMovesUrl).then(function(response) {
            return response;
        })
    };
};