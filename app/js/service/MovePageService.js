module.exports = function (API, $sce) {
    var moveUrl =  $sce.trustAsResourceUrl('https://itunes.apple.com/lookup');

    this.getMoveData = function(id) {
        return API.$jsonp(moveUrl, {id:id}).then(function(response) {
            return response;
        })
    };
};