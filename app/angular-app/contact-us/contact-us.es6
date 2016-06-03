/**
 * Created by Brandon on 6/2/2016.
 */

class ContactUsController {
    static getName() {
        return 'ContactCtrl';
    }

    static getDependencies() {
        return ['$http', '$rootScope', ContactUsController];
    }

    constructor($http, $rootScope) {
        this.$http = $http;
        this.$rootScope = $rootScope;

        this.contacts = [
            {
                photoUrl: '',
                name: 'Jeremy Ayers',
                title: 'Pilot',
                phone: '818-732-0006',
                email: 'jeremy@cinescape.us'
            }
        ];

        this.init();
    }

    init() {
        this.$rootScope.appData.smallScreenHeader = 'Contact Us';
    }
}

registerComponent('app.controllers').controller(ContactUsController.getName(), ContactUsController.getDependencies());