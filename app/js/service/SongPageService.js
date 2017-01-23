module.exports = function (API, $sce) {
    var songUrl =  $sce.trustAsResourceUrl('https://itunes.apple.com/lookup');

    this.getSongData = function(id) {
        return API.$jsonp(songUrl, {id:id}).then(function(response) {
            return response;
        })
    };
};