/**
 * Created by Brandon on 6/2/2016.
 */

class ContactUsController {
    static getName() {
        return 'ContactCtrl';
    }

    static getDependencies() {
        return ['$http', '$rootScope', '$timeout', 'swal', 'velocity', 'ga', '$scope', ContactUsController];
    }

    constructor($http, $rootScope, $timeout, swal, velocity, ga, $scope) {
        this.$http = $http;
        this.$rootScope = $rootScope;
        this.swal = swal;
        this.velocity = velocity;
        this.$timeout = $timeout;
        this.ga = ga;

        this.contact = this.getEmptyContact();
        this.isSubmitting = false;
        this.formStarted = false;

        this.init($scope);
    }

    init($scope) {
        this.$rootScope.appData.smallScreenHeader = 'Contact Us';
        this.$rootScope.appData.isLight = false;

        this.$timeout(() => {
            let items = $('.callout, form');
            this.velocity(items, 'transition.slideUpIn', {duration: 500, stagger: 150});
        }, 0);

        $scope.$watchCollection(() => this.contact, () => {
            if (!(this.contact.name || this.contact.email || this.contact.phone || this.contact.subject || this.contact.message)) {
                return;
            }

            if (!this.formStarted) {
                this.formStarted = true;
                this.ga('send', 'event', 'contact-us', 'form-started');
            }
        });

        this.ga('send', 'event', 'contact-us', 'form-visited');
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
            this.ga('send', 'event', 'contact-us', 'form-submitted');
            this.isSubmitting = true;

            console.log(grecaptcha.getResponse());

            this.$http.post('/scripts/contact-us.php', {contact: this.contact, 'g-recaptcha-response': grecaptcha.getResponse()}).then(data => {
                this.swal('Success', 'Thank you for contacting us, someone will respond to you shortly.', 'success');
                this.contact = this.getEmptyContact();
                this.contactForm.$setPristine(true);
                this.isSubmitting = false;
            }, () => {
                this.isSubmitting = false;
                this.swal('Error', "Oops, we're sorry but something went wrong when trying to submit the form", 'error');
            });
        }
    }
}

registerComponent('app.controllers').controller(ContactUsController.getName(), ContactUsController.getDependencies());