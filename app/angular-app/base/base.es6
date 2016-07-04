/**
 * This is the base controller attached to the <body> tag
 */
class BaseController {
    static getName() {
        return 'BaseCtrl';
    }
    
    static getDependencies() {
        return ['$rootScope', '$scope', '$location', 'velocity', '_', '$sce', BaseController];
    }

    constructor($rootScope, $scope, $location, velocity, _, $sce) {
        this.$rootScope = $rootScope;
        this.$location = $location;
        this.velocity = velocity;
        this._ = _;

        this.$rootScope.appData = {
            smallScreenHeader: 'Cinescape',
            activeNavigationLink: 'home'
        };

        this.navLinks = [
            {label: 'Home', smallLabel: $sce.trustAsHtml('<i class="fa fa-circle-thin"></i><span>Home</span>'), href: '#/', isActive: false},
            {label: 'Commercial', smallLabel: $sce.trustAsHtml('<i class="fa fa-video-camera"></i><span>Commercial Productions</span>'), href: '#/commercial', isActive: false},
            {label: 'Real Estate', smallLabel: $sce.trustAsHtml('<i class="fa fa-home"></i><span>Real Estate Cinematography</span>'), href: '#/real-estate', isActive: false},
            //{label: 'Aerial Surveying', smallLabel: $sce.trustAsHtml('<i class="fa fa-phone"></i><span>Aerial Surveying</span>'), href: '#/aerial', isActive: false},
            {label: 'About Us', smallLabel: $sce.trustAsHtml('<i class="fa fa-user"></i><span>About Us</span>'), href: '#/about', isActive: false},
            {label: 'Contact Us', smallLabel: $sce.trustAsHtml('<i class="fa fa-phone"></i><span>Contact Us</span>'), href: '#/contact', isActive: false}
        ];

        this.init($scope);
    }

    init($scope) {
        //when the user navigates to a new page, clear the page messages/errors
        $scope.$on('$locationChangeStart', event => {
            let currentPath = this.$location.path();

            this.setLinksInactive();
            let activeLink = this._.find(this.navLinks, {href: '#' + currentPath});
            if (activeLink) {
                activeLink.isActive = true;
            }

            this.scrollToTop(0);
        });
    }

    setLinksInactive() {
        this._.forEach(this.navLinks, link => {link.isActive = false});
    }

    afterViewEnter() {
        $('#view').attr('style', '');
    }

    onScrollToTopClick() {
        this.scrollToTop(350);
    }

    scrollToTop(duration) {
        this.velocity($('html'), 'scroll', {duration: duration});
    }
}

registerComponent('app.controllers').controller(BaseController.getName(), BaseController.getDependencies());