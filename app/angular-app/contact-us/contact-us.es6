/**
 * Created by Brandon on 6/2/2016.
 */

class ContactUsController {
    static getName() {
        return 'ContactCtrl';
    }

    static getDependencies() {
        return ['$http', '$rootScope', '$timeout', 'swal', ContactUsController];
    }

    constructor($http, $rootScope, $timeout, swal) {
        this.$http = $http;
        this.$rootScope = $rootScope;
        this.swal = swal;

        this.contact = this.getEmptyContact();
        this.isSubmitting = false;

        this.init();
    }

    init() {
        this.$rootScope.appData.smallScreenHeader = 'Contact Us';
    }

    getEmptyContact() {
        return {
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: ''
        };
    }

    onSubmit(contactForm) {
        if (contactForm.$valid) {
            this.isSubmitting = true;
            this.swal('Success', 'Thank you for contacting us, someone will respond to you shortly.', 'success');
            this.contact = this.getEmptyContact();
            this.contactForm.$setPristine(true);
            this.isSubmitting = false;
        }
    }
}

registerComponent('app.controllers').controller(ContactUsController.getName(), ContactUsController.getDependencies());