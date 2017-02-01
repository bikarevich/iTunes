module.exports = function (SearchPanelService, SearchResultsPageService, $state, $scope, $rootScope, CheckLoaderService) {
    var ctrl = this;

    ctrl.searchData = {
        term : '',
        limit : '200'
    };

    ctrl.submitSearch = submitSearch;

    function submitSearch() {
        CheckLoaderService.enableLoader();
        SearchPanelService.getSearchResults(ctrl.searchData).then(function (response) {
            SearchResultsPageService.setResults(response.data);
            if($state.current.name != 'search') {
                $state.go('search');
            } else {
                $rootScope.$emit("CallUpdateSearchResults", {});
            }

        })
    }
};