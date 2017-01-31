module.exports = function (SearchResultsPageService, $rootScope, $scope, $state, CheckLoaderService) {
    var ctrl = this;
        ctrl.isSorted = false;
    ctrl.goToItemView = goToItemView;
    ctrl.sortType = sortType;

    function goToItemView(trackId, collectionId, linkType, wrapperType) {
        if (wrapperType && wrapperType === 'track') {
            switch (linkType) {
                case 'track' :
                    $state.go('song', {id: trackId});
                    break;
                case 'collection' :
                    $state.go('album', {id: collectionId});
                    break;
            }
        } else {
            switch (wrapperType) {
                case 'track' :
                    $state.go('song', {id: trackId || collectionId});
                    break;
                case 'album' :
                    $state.go('album', {id: trackId || collectionId});
                    break;
                case 'audiobook' :
                    $state.go('book', {id: trackId || collectionId});
                    break;
                case 'book' :
                    $state.go('book', {id: trackId || collectionId});
                    break;
                default :
                    $state.go('move', {id: trackId || collectionId});
            }
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
        CheckLoaderService.disableLoader();
    };

    $scope.updateSearchResults();
};