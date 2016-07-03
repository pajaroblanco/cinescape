/**
 * Created by Brandon on 6/2/2016.
 */

class RealEstateController {
    static getName() {
        return 'RealEstateCtrl';
    }

    static getDependencies() {
        return ['$rootScope', RealEstateController];
    }

    constructor($rootScope) {
         this.$rootScope = $rootScope;

        this.init();
    }

    init() {
        this.$rootScope.appData.smallScreenHeader = 'Real Estate Cinematography';
        this.$rootScope.appData.isLight = false;
    }
}

registerComponent('app.controllers').controller(RealEstateController.getName(), RealEstateController.getDependencies());