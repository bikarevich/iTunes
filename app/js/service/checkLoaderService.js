const ROOT_SCOPE = new WeakMap();

class checkLoaderService {
    constructor($rootScope) {
        ROOT_SCOPE.set(this, $rootScope);
    }

    disableLoader() {
        ROOT_SCOPE.get(this).showLoader = false;
        if (!ROOT_SCOPE.get(this).$$phase) {
            ROOT_SCOPE.get(this).$apply();
        }
    };

    enableLoader() {
        ROOT_SCOPE.get(this).showLoader = true;
        if (!ROOT_SCOPE.get(this).$$phase) {
            ROOT_SCOPE.get(this).$apply();
        }
    };
}

export {checkLoaderService};