module.exports = function ($rootScope) {
    this.disableLoader = function () {
        $rootScope.showLoader = false;
        if (!$rootScope.$$phase) {
            $rootScope.$apply();
        }
    };

    this.enableLoader = function () {
        $rootScope.showLoader = true;
        if (!$rootScope.$$phase) {
            $rootScope.$apply();
        }
    };
};