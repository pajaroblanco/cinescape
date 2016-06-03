/**
 * This is the base controller attached to the <body> tag
 */
class BaseController {
    static getName() {
        return 'BaseCtrl';
    }
    
    static getDependencies() {
        return ['$rootScope', '$scope', '$location', 'velocity', BaseController];
    }

    constructor($rootScope, $scope, $location, velocity) {
        this.$rootScope = $rootScope;
        this.$location = $location;
        this.velocity = velocity;

        this.$rootScope.appData = {
            smallScreenHeader: 'Cinescape',
            activeNavigationLink: 'home'
        };

        this.viewAnimationLength = 0;

        this.init($scope);
    }

    init($scope) {
        //when the user navigates to a new page, clear the page messages/errors
        $scope.$on('$locationChangeStart', event => {
            let currentPath = this.$location.path();
            switch (currentPath) {
                case '/':
                    this.$rootScope.appData.activeNavigationLink = 'home';
                    break;
                case '/about':
                    this.$rootScope.appData.activeNavigationLink = 'about';
                    break;
                case '/contact':
                    this.$rootScope.appData.activeNavigationLink = 'contact';
                    break;
            }
        });
    }

    afterViewEnter() {
        $('#view').attr('style', '');
    }

    onScrollToTopClick() {
        this.velocity($('html'), 'scroll');
    }
}

registerComponent('app.controllers').controller(BaseController.getName(), BaseController.getDependencies());