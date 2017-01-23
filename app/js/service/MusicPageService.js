module.exports = function (API) {
    var topAlbumsUrl = 'https://itunes.apple.com/us/rss/topalbums/limit=10/json';
    var topSongsUrl = 'https://itunes.apple.com/us/rss/topsongs/limit=10/json';

    this.getTopAlbums = function() {
        return API.$get(topAlbumsUrl).then(function(response) {
            return response;
        })
    };

    this.getTopSongs = function() {
        return API.$get(topSongsUrl).then(function(response) {
            return response;
        })
    };
};