module.exports = function ($http) {
    this.$get = function (url, params, options) {
        return $http({
            method: 'GET',
            url: url,
            params: params
        }, options)
            .then(function (response) {
                return response;
            }, function (response) {
                return response;
            })
    };
};