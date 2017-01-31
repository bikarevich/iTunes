module.exports = function ($rootScope) {
    this.disableLoader = function () {
        $rootScope.showLoader = false;
        if (!$rootScope.$$phase) {
            $rootScope.$apply();
        }
    };
};