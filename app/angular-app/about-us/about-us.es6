/**
 * Created by Brandon on 6/2/2016.
 */

class AboutUsController {
    static getName() {
        return 'AboutCtrl';
    }

    static getDependencies() {
        return ['$http', '$rootScope', AboutUsController];
    }

    constructor($http, $rootScope) {
        this.$http = $http;
        this.$rootScope = $rootScope;

        this.init();
    }

    init() {
        this.$rootScope.appData.smallScreenHeader = 'About Us';
    }
}

registerComponent('app.controllers').controller(AboutUsController.getName(), AboutUsController.getDependencies());