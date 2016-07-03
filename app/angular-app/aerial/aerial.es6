/**
 * Created by Brandon on 6/2/2016.
 */

class AerialController {
    static getName() {
        return 'AerialCtrl';
    }

    static getDependencies() {
        return ['$rootScope', AerialController];
    }

    constructor($rootScope) {
         this.$rootScope = $rootScope;

        this.init();
    }

    init() {
        this.$rootScope.appData.smallScreenHeader = 'Aerial Surveying';
        this.$rootScope.appData.isLight = false;
    }
}

registerComponent('app.controllers').controller(AerialController.getName(), AerialController.getDependencies());