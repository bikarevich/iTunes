const SEARCH_RESULTS = new WeakMap();

class searchResultsPageService {
    constructor() {
        SEARCH_RESULTS.set(this, {});
    }

    setResults(data) {
        SEARCH_RESULTS.set(this, data);
    };

    getResults() {
        return SEARCH_RESULTS.get(this);
    };
}

export {searchResultsPageService};