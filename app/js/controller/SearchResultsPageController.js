module.exports = function (SearchResultsPageService, $rootScope, $scope, $state) {
    var ctrl = this;
        ctrl.isSorted = false;
    ctrl.goToItemView = goToItemView;
    ctrl.sortType = sortType;

    function goToItemView(id, type) {
        switch (type) {
            case 'track' :
                $state.go('song', {id: id});
                break;
            case 'audiobook' :
                $state.go('book', {id: id});
                break;
            default :
                $state.go('move', {id: id});
        }
    }
    
    function sortType() {
        ctrl.results.sort(sortByType);
    }

    function sortByType(a, b) {
        if (a.wrapperType > b.wrapperType) return 1;
        if (a.wrapperType < b.wrapperType) return -1;
        if (a.wrapperType == b.wrapperType) {
            if (a.trackName > b.trackName) return 1;
            if (a.trackName < b.trackName) return -1;
        }
    }

    $rootScope.$on("CallUpdateSearchResults", function(){
        $scope.updateSearchResults();
    });

    $scope.updateSearchResults = function() {
        ctrl.results = SearchResultsPageService.getResults();
    };

    $scope.updateSearchResults();
};