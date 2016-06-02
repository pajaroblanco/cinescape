/**
 * Created by Brandon on 6/2/2016.
 */

class HomeController {
    static getName() {
        return 'HomeCtrl';
    }

    static getDependencies() {
        return ['$http', '$rootScope', HomeController];
    }

    constructor($http, $rootScope) {
        this.$http = $http;
        this.$rootScope = $rootScope;

        this.init();
    }

    init() {
        this.$rootScope.appData.smallScreenHeader = 'Admin Console';
    }
}

registerComponent('app.controllers').controller(HomeController.getName(), HomeController.getDependencies());