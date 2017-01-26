module.exports = function (SearchResultsPageService, $rootScope, $scope, $state) {
    var ctrl = this;

    ctrl.goToSongView = goToSongView;

    function goToSongView(id) {
        $state.go('song', {id: id});
    }

    $rootScope.$on("CallUpdateSearchResults", function(){
        $scope.updateSearchResults();
    });

    $scope.updateSearchResults = function() {
        ctrl.results = SearchResultsPageService.getResults();
    };

    $scope.updateSearchResults();
};