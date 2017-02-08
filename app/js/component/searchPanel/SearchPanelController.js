let variables = new WeakMap();

class SearchPanelController{
    constructor(searchPanelService, searchResultsPageService, $state, $rootScope, checkLoaderService) {
        variables.set(this, {
            searchResultsPageService,
            searchPanelService,
            $state,
            $rootScope,
            checkLoaderService
        });

        this.searchData = {
            term : '',
            limit : '200'
        };
    }

    submitSearch() {
        variables.get(this).searchPanelService.getSearchResults(this.searchData).then((response) => {
            variables.get(this).checkLoaderService.enableLoader();
            variables.get(this).searchResultsPageService.setResults(response.data);
            if(variables.get(this).$state.current.name != 'search') {
                variables.get(this).$state.go('search');
            } else {
                variables.get(this).$rootScope.$emit("CallUpdateSearchResults", {});
            }
        })
    }
}

export {SearchPanelController};