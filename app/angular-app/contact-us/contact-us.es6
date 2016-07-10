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
        this.recaptchaSiteKey = '6LdLdiQTAAAAAKKPFi8gEFpWEnZwgOKkkzLRbsbZ';
        this.submitEmail = 'info@cinescape.us';

        this.init($scope);
    }

    init($scope) {
        this.$rootScope.appData.smallScreenHeader = 'Contact Us';
        this.$rootScope.appData.isLight = false;

        this.$timeout(() => {
            let items = $('.callout, form');
            this.velocity(items, 'transition.slideUpIn', {duration: 500, stagger: 150});
        }, 0);

        let initRecaptcha = () => {
            if (grecaptcha) {
                grecaptcha.render('recaptcha', {"sitekey": this.recaptchaSiteKey});
            }
            else {
                this.$timeout(() => {initRecaptcha()}, 500);
            }
        };
        this.$timeout(() => {initRecaptcha()}, 500);

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
            this.recaptchaErrorStyle = null;
            if (!grecaptcha.getResponse()) {
                this.recaptchaErrorStyle = {'display': 'block', 'margin-top': '0'};
                return;
            }

            this.ga('send', 'event', 'contact-us', 'form-submitted');
            this.isSubmitting = true;

            this.$http.post('/scripts/contact-us.php', {contact: this.contact, 'g-recaptcha-response': grecaptcha.getResponse()}).then(response => {
                $.ajax({
                    url: "https://formspree.io/you@email.com",
                    method: "POST",
                    data: {message: "hello!"},
                    dataType: "json"
                });

                this.contact['_replyto'] = this.contact.email;
                this.contact['_subject'] = this.contact.subject;

                this.$http.post('https://formspree.io/' + this.submitEmail, this.contact).then(response => {
                    this.swal('Success', 'Thank you for contacting us, someone will respond to you shortly.', 'success');
                    this.contact = this.getEmptyContact();
                    this.contactForm.$setPristine(true);
                    this.isSubmitting = false;
                    grecaptcha.reset();
                }, () => {
                    this.isSubmitting = false;
                    this.swal('Error', "Oops, we're sorry but something went wrong when trying to submit the form", 'error');
                });

            }, (response) => {
                this.isSubmitting = false;

                if (response.status == 400) {
                    this.swal('Are you a robot?', 'Please check the "I\'m not a robot" checkbox', 'warning');
                }
                else {
                    this.swal('Error', "Oops, we're sorry but something went wrong when trying to submit the form", 'error');
                }
            });
        }
    }
}

registerComponent('app.controllers').controller(ContactUsController.getName(), ContactUsController.getDependencies());