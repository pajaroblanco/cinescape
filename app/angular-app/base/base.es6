/**
 * This is the base controller attached to the <body> tag
 */
class BaseController {
    static getName() {
        return 'BaseCtrl';
    }
    
    static getDependencies() {
        return ['$rootScope', '$scope', '$location', 'velocity', '_', BaseController];
    }

    constructor($rootScope, $scope, $location, velocity, _) {
        this.$rootScope = $rootScope;
        this.$location = $location;
        this.velocity = velocity;
        this._ = _;

        this.$rootScope.appData = {
            smallScreenHeader: 'Cinescape',
            activeNavigationLink: 'home'
        };

        this.navLinks = [
            {label: 'Home', href: '#/', isActive: false},
            {label: 'Portfolio', href: '#/portfolio', isActive: false},
            {label: 'Pricing', href: '#/pricing', isActive: false},
            {label: 'About Us', href: '#/about', isActive: false},
            {label: 'Contact Us', href: '#/contact', isActive: false}
        ];

        this.init($scope);
    }

    init($scope) {
        //when the user navigates to a new page, clear the page messages/errors
        $scope.$on('$locationChangeStart', event => {
            let currentPath = this.$location.path();
            switch (currentPath) {
                case '/':
                    this.setLinksInactive();
                    this._.find(this.navLinks, {label: 'Home'}).isActive = true;
                    break;
                case '/about':
                    this.setLinksInactive();
                    this._.find(this.navLinks, {label: 'About Us'}).isActive = true;
                    break;
                case '/contact':
                    this.setLinksInactive();
                    this._.find(this.navLinks, {label: 'Contact Us'}).isActive = true;
                    break;
                case '/portfolio':
                    this.setLinksInactive();
                    this._.find(this.navLinks, {label: 'Portfolio'}).isActive = true;
                    break;
                case '/pricing':
                    this.setLinksInactive();
                    this._.find(this.navLinks, {label: 'Pricing'}).isActive = true;
                    break;
            }
        });
    }

    setLinksInactive() {
        this._.forEach(this.navLinks, link => {link.isActive = false});
        console.log(this.navLinks);
    }

    afterViewEnter() {
        $('#view').attr('style', '');
    }

    onScrollToTopClick() {
        this.velocity($('html'), 'scroll');
    }
}

registerComponent('app.controllers').controller(BaseController.getName(), BaseController.getDependencies());