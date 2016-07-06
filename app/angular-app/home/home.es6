/**
 * Created by Brandon on 6/2/2016.
 */

class HomeController {
    static getName() {
        return 'HomeCtrl';
    }

    static getDependencies() {
        return ['$http', '$rootScope', '$timeout', 'velocity', '$interval', '_', '$scope', '$location', '$sce', 'ga', HomeController];
    }

    constructor($http, $rootScope, $timeout, velocity, $interval, _, $scope, $location, $sce, ga) {
        this.$http = $http;
        this.$rootScope = $rootScope;
        this.$timeout = $timeout;
        this.velocity = velocity;
        this.$interval = $interval;
        this._ = _;
        this.$location = $location;
        this.ga = ga;

        this.sectionChangeInterval = 9000;
        this.sections = [
            {
                section: 1,
                backgroundImage: 'camera.jpg',
                slogan: $sce.trustAsHtml('Professional <a href="#!/commercial" class="highlight">TV and Web Commercials</a> that will give your company an edge over the competition'),
                title: 'Commercial Productions',
                learnMoreText: 'Learn More About Commercial Productions',
                detailUrl: '/commercial'
            },
            {
                section: 2,
                backgroundImage: 'home.jpg',
                slogan: $sce.trustAsHtml('Aerial Cinematography for <a href="#!/real-estate" class="highlight">Real Estate</a> Professionals'),
                title: 'Real Estate Cinematography',
                learnMoreText: 'Learn More About Real Estate Cinematography',
                detailUrl: '/real-estate'
            }
            // {
            //     section: 3,
            //     backgroundImage: 'aerial-river.jpg',
            //     slogan: 'SOME OTHER SLOGAN HERE 2',
            //     title: 'Aerial Surveying',
            //     learnMoreText: 'Learn More About Aerial Surveying',
            //     detailUrl: '/aerial'
            // }
        ];
        this.currentSection = this.sections[0];
        this.initialAnimationComplete = false;
        this.sectionInterval = null;

        this.init($scope);
    }

    init($scope) {
        this.$rootScope.appData.smallScreenHeader = 'Cinescape';
        this.$rootScope.appData.isLight = true;

        this.$timeout(() => {
            let onComplete = () => {
                this.initialAnimationComplete = true;
            };

            this.velocity($('.hero-text').find('.title-wrapper,h1,button'), 'transition.slideUpIn', {duration: 1000, stagger: 100, drag: true, complete: onComplete});
        }, 0);

        this.resetSectionInterval();
        this.goToSection(this.currentSection);

        $scope.$on('$destroy', () => {
            this.$timeout.cancel(this.sectionStartDelayTimeout);
            this.$interval.cancel(this.sectionInterval);
        })
    }

    resetSectionInterval(startDelay) {
        if (!startDelay) {
            startDelay = 0;
        }

        let startProgressBarAnimation = () => {
            let sectionProgress = $('.section-progress');
            let transitionInterval = 1000;
            this.velocity(sectionProgress, 'stop');

            //return;

            this.velocity(sectionProgress, {scaleX: 1}, {duration: transitionInterval, easing: 'easeOutQuart', complete: () => {
                if (this.sectionInterval != null) {
                    this.velocity(sectionProgress, {scaleX: 0}, {duration: this.sectionChangeInterval - transitionInterval});
                }
            }});
        };

        let resetInterval = () => {
            this.sectionInterval = this.$interval(() => {
                this.goToNextSection(1000);
            }, this.sectionChangeInterval);
        };

        if (startDelay > 0) {
            this.$interval.cancel(this.sectionInterval);
            this.sectionInterval = null;
            startProgressBarAnimation();
            this.$timeout.cancel(this.sectionStartDelayTimeout);
            this.sectionStartDelayTimeout = this.$timeout(() => {
                startProgressBarAnimation();
                resetInterval();
            }, startDelay);
        }
        else {
            startProgressBarAnimation();
            if (this.sectionInterval == null) {
                resetInterval();
            }
        }
    }

    goToNextSection(startDelay) {
        let index = this._.indexOf(this.sections, this.currentSection) + 1;
        if (index >= this.sections.length) {
            index = 0;
        }
        this.goToSection(this.sections[index], startDelay);
    }

    goToSection(section, startDelay) {
        this.resetSectionInterval(startDelay);
        this.currentSection = section;

        let sloganTransition = 'transition.slideLeftIn';
        if (this._.first(this.sections) == section) {
            this.progressBarStyle = {'transform-origin': '0'}
        }
        else {
            this.progressBarStyle = {'transform-origin': '100%'};
            sloganTransition = 'transition.slideRightIn';
        }

        if (this.initialAnimationComplete) {
            let slogan = $('.hero-text').find('h1');
            this.velocity(slogan, 'stop');
            this.velocity(slogan, sloganTransition, {duration: 1500});
        }

        //section.translateStyle = {'transform': 'translateY(0) scale(1)'};

        // let translateY = 40;
        // let topPadding = 35;
        // let inactiveSections = this._.filter(this.sections, s => s != section);
        // this._.forEach(inactiveSections, (inactiveSection, index) => {
        //     inactiveSection.translateStyle = {'transform': 'translateY(-' + ((translateY * (index+1)) + topPadding) + 'px) scale(.5)'};
        // });
    }

    onLearnMore() {
        this.ga('send', 'event', 'learn-more-click', this.currentSection.title);
        this.$location.path(this.currentSection.detailUrl);
    }
}

registerComponent('app.controllers').controller(HomeController.getName(), HomeController.getDependencies());