/**
 * Created by Brandon on 6/2/2016.
 */

class CommercialController {
    static getName() {
        return 'CommercialCtrl';
    }

    static getDependencies() {
        return ['$rootScope', CommercialController];
    }

    constructor($rootScope) {
         this.$rootScope = $rootScope;

        this.init();
    }

    init() {
        this.$rootScope.appData.smallScreenHeader = 'Commercial Productions';
        this.$rootScope.appData.isLight = false;
    }
}

registerComponent('app.controllers').controller(CommercialController.getName(), CommercialController.getDependencies());