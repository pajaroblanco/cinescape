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
                title: 'Commercial Productions',
                learnMoreText: 'Learn More About Commercial Productions',
                detailUrl: '/pricing'
            },
            {
                section: 2,
                backgroundImage: 'home.jpg',
                slogan: 'AERIAL CINEMATOGRAPHY FOR REAL ESTATE PROFESSIONALS',
                title: 'Real Estate Cinematography',
                learnMoreText: 'Learn More About Real Estate Cinematography',
                detailUrl: '/pricing'
            },
            {
                section: 3,
                backgroundImage: 'aerial-river.jpg',
                slogan: 'SOME OTHER SLOGAN HERE 2',
                title: 'Aerial Surveying',
                learnMoreText: 'Learn More About Aerial Surveying',
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

        let transitionInterval = 1000;
        let sectionProgress = $('.sectionProgress');
        this.velocity(sectionProgress, 'stop');
        // sectionProgress.velocity('stop');
        this.velocity(sectionProgress, {scaleX: 1}, {duration: transitionInterval, easing: 'easeOutQuart', complete: () => {
            this.velocity(sectionProgress, {scaleX: 0}, {duration: this.sectionChangeInterval - transitionInterval});
        }});
    }

    onLearnMore() {
        this.velocity($('.home-content > .row:first'), 'scroll', {duration: 1000, easing: 'easeOutExpo'});
    }
}

registerComponent('app.controllers').controller(HomeController.getName(), HomeController.getDependencies());