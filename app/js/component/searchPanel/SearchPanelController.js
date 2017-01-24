module.exports = function (SearchPanelService, SearchResultsPageService, $state, $scope, $rootScope) {
    var ctrl = this;

    ctrl.searchData = {
        term : '',
        limit : '25'
    };

    ctrl.submitSearch = submitSearch;

    function submitSearch() {
        SearchPanelService.getSearchResults(ctrl.searchData).then(function (response) {
            SearchResultsPageService.setResults(response.data.results);
            if($state.current.name != 'search') {
                $state.go('search');
            } else {
                $rootScope.$emit("CallUpdateSearchResults", {});
            }

        })
    }
};