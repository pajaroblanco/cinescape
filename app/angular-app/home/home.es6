/**
 * Created by Brandon on 6/2/2016.
 */

class HomeController {
    static getName() {
        return 'HomeCtrl';
    }

    static getDependencies() {
        return ['$http', '$rootScope', '$timeout', 'velocity', '$interval', '_', HomeController];
    }

    constructor($http, $rootScope, $timeout, velocity, $interval, _) {
        this.$http = $http;
        this.$rootScope = $rootScope;
        this.$timeout = $timeout;
        this.velocity = velocity;
        this.$interval = $interval;
        this._ = _;

        this.sectionChangeInterval = 10000;
        this.sections = [
            {
                section: 1,
                backgroundImage: 'camera.jpg',
                slogan: 'SOME OTHER SLOGAN HERE 1',
                detailUrl: '/pricing'
            },
            {
                section: 2,
                backgroundImage: 'home.jpg',
                slogan: 'AERIAL CINEMATOGRAPHY FOR REAL ESTATE PROFESSIONALS',
                detailUrl: '/pricing'
            },
            {
                section: 3,
                backgroundImage: 'video-editing.jpg',
                slogan: 'SOME OTHER SLOGAN HERE 2',
                detailUrl: '/pricing'
            }
        ];
        this.currentSection = this.sections[0];
        this.initialAnimationComplete = false;

        this.init();
    }

    init() {
        this.$rootScope.appData.smallScreenHeader = 'Cinescape';
        this.$rootScope.appData.isLight = true;

        this.$timeout(() => {
            let onComplete = () => {
                this.initialAnimationComplete = true;
            };

            this.velocity($('.hero-text').find('p,h1,button'), 'transition.slideUpIn', {duration: 1000, stagger: 100, drag: true, complete: onComplete});
        }, 0);

        this.$interval(() => {
            this.goToNextSection();
        }, this.sectionChangeInterval);
        this.goToSection(this.currentSection);
    }

    goToNextSection() {
        let index = this._.indexOf(this.sections, this.currentSection) + 1;
        if (index >= this.sections.length) {
            index = 0;
        }
        this.goToSection(this.sections[index]);
    }

    goToSection(section) {
        this.currentSection = section;

        if (this.initialAnimationComplete)
            this.velocity($('.hero-text').find('h1'), 'transition.slideRightIn', {duration: 1500});
        //$('.home-hero').css('background-image', "url('../dist/images/" + section.backgroundImage + "')");
    }

    onLearnMore() {
        this.velocity($('.home-content > .row:first'), 'scroll', {duration: 1000, easing: 'easeOutExpo'});
    }
}

registerComponent('app.controllers').controller(HomeController.getName(), HomeController.getDependencies());