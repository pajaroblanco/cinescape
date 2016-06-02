/**
 * This is the base controller attached to the <body> tag
 */
class BaseController {
    static getName() {
        return 'BaseCtrl';
    }
    
    static getDependencies() {
        return ['$rootScope', BaseController];
    }

    constructor($rootScope) {
        this.$rootScope = $rootScope;

        this.$rootScope.appData = {
            smallScreenHeader: 'Cinescape'
        };

        this.init();
    }

    init() {

    }

    afterViewEnter() {
        $('#view').attr('style', '');
    }
}

registerComponent('app.controllers').controller(BaseController.getName(), BaseController.getDependencies());