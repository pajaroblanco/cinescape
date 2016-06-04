/**
 * Created by Brandon on 6/2/2016.
 */

class HomeController {
    static getName() {
        return 'HomeCtrl';
    }

    static getDependencies() {
        return ['$http', '$rootScope', '$timeout', 'velocity', HomeController];
    }

    constructor($http, $rootScope, $timeout, velocity) {
        this.$http = $http;
        this.$rootScope = $rootScope;
        this.$timeout = $timeout;
        this.velocity = velocity;

        this.init();
    }

    init() {
        this.$rootScope.appData.smallScreenHeader = 'Cinescape';

        this.$timeout(() => {
            this.velocity($('h1 > small'), 'transition.slideRightIn', {duration: 1000});
            this.velocity($('h1 > span'), 'transition.expandIn', {duration: 2000});
        }, 0);
    }
}

registerComponent('app.controllers').controller(HomeController.getName(), HomeController.getDependencies());