/**
 * Created by Brandon on 6/2/2016.
 */

class ContactUsController {
    static getName() {
        return 'ContactCtrl';
    }

    static getDependencies() {
        return ['$http', '$rootScope', '$timeout', ContactUsController];
    }

    constructor($http, $rootScope, $timeout) {
        this.$http = $http;
        this.$rootScope = $rootScope;

        let contacts = [
            {
                photoUrl: '',
                name: 'Jeremy Ayers',
                title: 'Pilot',
                phone: '818-732-0006',
                email: 'jeremy@cinescape.us'
            },
            {
                photoUrl: '',
                name: 'Sam Low',
                title: 'Cinematographer',
                phone: '818-732-0006',
                email: 'sam@cinescape.us'
            },
            {
                photoUrl: '',
                name: 'Darren Beasley',
                title: 'Cinematographer / Photographer',
                phone: '818-732-0006',
                email: 'darren@cinescape.us'
            },
            {
                photoUrl: '',
                name: 'Brandon Ayers',
                title: 'Cinematographer / Photographer',
                phone: '818-732-0006',
                email: 'brandon@cinescape.us'
            }
        ];

        $timeout(() => {
            this.contacts = contacts;
        }, 600);

        this.init();
    }

    init() {
        this.$rootScope.appData.smallScreenHeader = 'Contact Us';
    }
}

registerComponent('app.controllers').controller(ContactUsController.getName(), ContactUsController.getDependencies());