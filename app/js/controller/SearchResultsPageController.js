module.exports = function (SearchResultsPageService, $rootScope, $scope, $state) {
    var ctrl = this;

    ctrl.goToMoveView = goToMoveView;

    function goToMoveView(id) {
        $state.go('move', {id: id});
    }

    $rootScope.$on("CallUpdateSearchResults", function(){
        $scope.updateSearchResults();
    });

    $scope.updateSearchResults = function() {
        ctrl.results = SearchResultsPageService.getResults();
    };

    $scope.updateSearchResults();
};