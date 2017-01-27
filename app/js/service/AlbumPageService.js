module.exports = function (API, $sce) {
    var songUrl =  $sce.trustAsResourceUrl('https://itunes.apple.com/lookup');
    var authorUrl =  $sce.trustAsResourceUrl('https://itunes.apple.com/search');

    this.getAlbumData = function(id) {
        return API.$jsonp(songUrl, {id:id, entity : 'song'}).then(function(response) {
            return response;
        })
    };

    this.getAuthorTracks = function (name) {
        return API.$jsonp(authorUrl, {term:name}).then(function(response) {
            return response;
        })
    }
};