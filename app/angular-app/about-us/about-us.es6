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
                phone: '818-732-0006',
                email: 'jeremy@cinescape.us'
            },
            {
                photoUrl: 'https://0.s3.envato.com/files/183626516/Image/Image_Profile.jpg',
                name: 'Sam Low',
                title: 'Cinematographer',
                phone: '818-732-0006',
                email: 'sam@cinescape.us'
            },
            {
                photoUrl: 'https://0.s3.envato.com/files/183626516/Image/Image_Profile.jpg',
                name: 'Darren Beasley',
                title: 'Cinematographer / Photographer',
                phone: '818-732-0006',
                email: 'darren@cinescape.us'
            },
            {
                photoUrl: 'https://0.s3.envato.com/files/183626516/Image/Image_Profile.jpg',
                name: 'Brandon Ayers',
                title: 'Cinematographer / Photographer',
                phone: '818-732-0006',
                email: 'brandon@cinescape.us'
            }
        ];

        $timeout(() => {
            this.runStartAnimation = true;
        }, 0);

        this.init();
    }

    init() {
        this.$rootScope.appData.smallScreenHeader = 'About Us';


        this.$timeout(() => {
            let getContactCardScene = (triggerSelector) => {
                return new this.ScrollMagic.Scene({triggerElement: triggerSelector})
                    .on("enter", function (e) {
                        $(triggerSelector).velocity("transition.slideLeftIn", { duration: 750, stagger: 150 });
                    })
                    .on("leave", function (e) {
                        $(triggerSelector).velocity({opacity: 0}, { duration: 750, stagger: 150 });
                    })
                    //.addIndicators() //uncomment this to see where the scroll triggers will be
                    .triggerHook(.75);
            };

            let getSectionScene = (triggerSelector) => {
                return new this.ScrollMagic.Scene({triggerElement: triggerSelector})
                    .on("enter", function (e) {
                        $(triggerSelector).find('h1,h1+p').velocity("transition.slideLeftIn", { duration: 750, stagger: 150 });
                    })
                    .on("leave", function (e) {
                        $(triggerSelector).find('h1,h1+p').velocity({opacity: 0}, { duration: 750, stagger: 150 });
                    })
                    //.addIndicators() //uncomment this to see where the scroll triggers will be
                    .triggerHook(.75);
            };

            let scrollMagicController = new this.ScrollMagic.Controller();
            scrollMagicController.addScene(getContactCardScene('.contact-card'));
            scrollMagicController.addScene(getSectionScene('.about-hero'));
            scrollMagicController.addScene(getSectionScene('.philosophy'));
            //scrollMagicController.addScene(getContactCardScene('#bright-bold-container'));
            //scrollMagicController.addScene(getContactCardScene('#human-centered-container'));
        }, 0);
    }
}

registerComponent('app.controllers').controller(AboutUsController.getName(), AboutUsController.getDependencies());