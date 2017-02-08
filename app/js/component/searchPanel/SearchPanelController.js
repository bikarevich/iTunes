const SEARCH_PANEL_SERVICE = new WeakMap();
const SEARCH_RESULTS_SERVICE = new WeakMap();
const STATE = new WeakMap();
const SCOPE = new WeakMap();
const ROOT_SCOPE = new WeakMap();
const CHECK_LOADER_SERVICE = new WeakMap();

class SearchPanelController{
    constructor(searchPanelService, searchResultsPageService, $state, $scope, $rootScope, checkLoaderService) {
        SEARCH_RESULTS_SERVICE.set(this, searchResultsPageService);
        SEARCH_PANEL_SERVICE.set(this, searchPanelService);
        STATE.set(this, $state);
        SCOPE.set(this, $scope);
        ROOT_SCOPE.set(this, $rootScope);
        CHECK_LOADER_SERVICE.set(this, checkLoaderService);

        let ctrl = this;

        this.searchData = {
            term : '',
            limit : '200'
        };

        this.proxy = new Proxy(this.submitSearch, {
            apply: function(target, thisArg, argumentsList) {
                CHECK_LOADER_SERVICE.get(ctrl).enableLoader();
                return target.apply(thisArg, argumentsList);
            }
        });
    }

    submitSearch() {
        SEARCH_PANEL_SERVICE.get(this).getSearchResults(this.searchData).then((response) => {
            SEARCH_RESULTS_SERVICE.get(this).setResults(response.data);
            if(STATE.get(this).current.name != 'search') {
                STATE.get(this).go('search');
            } else {
                ROOT_SCOPE.get(this).$emit("CallUpdateSearchResults", {});
            }
        })
    }
}

export {SearchPanelController};