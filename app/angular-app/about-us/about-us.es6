/**
 * Created by Brandon on 6/2/2016.
 */

class AboutUsController {
    static getName() {
        return 'AboutCtrl';
    }

    static getDependencies() {
        return ['$http', '$rootScope', '$timeout', 'ScrollMagic', AboutUsController];
    }

    constructor($http, $rootScope, $timeout, ScrollMagic) {
        this.$http = $http;
        this.$rootScope = $rootScope;
        this.ScrollMagic = ScrollMagic;
        this.$timeout = $timeout;
        this.runStartAnimation = false;

        this.contacts = [
            {
                photoUrl: 'dist/images/jeremy.jpg',
                name: 'Jeremy Ayers',
                title: 'Pilot (FAA Licensed)',
                email: 'jeremy@cinescape.us'
            },
            {
                photoUrl: 'dist/images/sam.jpg',
                name: 'Sam Low',
                title: 'Director / Compositor',
                email: 'sam@cinescape.us',
                style: {'background-position': '50% 100%'}
            },
            {
                photoUrl: 'dist/images/darren.jpg',
                name: 'Darren Beasley',
                title: 'Cinematographer / Photographer',
                email: 'darren@cinescape.us',
                style: {'background-position': '50% 40%'}
            },
            {
                photoUrl: 'dist/images/brandon.jpg',
                name: 'Brandon Ayers',
                title: 'Cinematographer / Photographer',
                email: 'brandon@cinescape.us'
            }
        ];

        // $timeout(() => {
        //     this.runStartAnimation = true;
        // }, 0);

        this.init();
    }

    init() {
        this.$rootScope.appData.smallScreenHeader = 'About Us';
        this.$rootScope.appData.isLight = true;

        let firstContactEnter = true;
        let firstContactLeave = true;

        this.$timeout(() => {
            let getContactCardScene = (triggerSelector) => {
                return new this.ScrollMagic.Scene({triggerElement: triggerSelector})
                    .on("enter", function (e) {
                        let duration = 750;
                        let stagger = 150;
                        $(triggerSelector).velocity("transition.slideLeftIn", { duration: duration, stagger: stagger });
                    })
                    .on("leave", function (e) {
                        let duration = 300;
                        $(triggerSelector).velocity({opacity: 0}, { duration: duration, stagger: 0 });
                    })
                    //.addIndicators() //uncomment this to see where the scroll triggers will be
                    .triggerHook(.75);
            };

            let getSectionScene = (triggerSelector) => {
                return new this.ScrollMagic.Scene({triggerElement: triggerSelector})
                    .on("enter", function (e) {
                        $(triggerSelector).find('h1,h1+p').velocity("transition.slideLeftIn", { duration: 1000, stagger: 200 });
                    })
                    .on("leave", function (e) {
                        $(triggerSelector).find('h1,h1+p').velocity({opacity: 0}, { duration: 300, stagger: 200 });
                    })
                    //.addIndicators() //uncomment this to see where the scroll triggers will be
                    .triggerHook(.75);
            };

            let scrollMagicController = new this.ScrollMagic.Controller();
            scrollMagicController.addScene(getContactCardScene('.contact-card'));
            scrollMagicController.addScene(getSectionScene('.about-hero'));
            // scrollMagicController.addScene(getSectionScene('.philosophy'));
            // scrollMagicController.addScene(getContactCardScene('#bright-bold-container'));
            //scrollMagicController.addScene(getContactCardScene('#human-centered-container'));
        }, 0);
    }
}

registerComponent('app.controllers').controller(AboutUsController.getName(), AboutUsController.getDependencies());