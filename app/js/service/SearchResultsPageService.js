module.exports = function () {
    var searchResults = {};

    this.setResults = function (data) {
        searchResults = data;
    };

    this.getResults = function () {
        return searchResults;
    };
};