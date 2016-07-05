'use strict';

// Declare app level module which depends on views, and components

var angularApp = angular.module('app', ['ngRoute', 'app.controllers', 'app.directives', 'app.services', 'angular-velocity', 'ngAnimate']);

angularApp.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    //Setup URL routes.
    $routeProvider.when('/', {
        templateUrl: 'angular-app/home/home.html',
        controller: 'HomeCtrl',
        controllerAs: 'vm',
        label: 'Home'
    }).when('/about', {
        templateUrl: 'angular-app/about-us/about-us.html',
        controller: 'AboutCtrl',
        controllerAs: 'vm',
        label: 'About Us'
    }).when('/contact', {
        templateUrl: 'angular-app/contact-us/contact-us.html',
        controller: 'ContactCtrl',
        controllerAs: 'vm',
        label: 'Contact Us'
    }).when('/portfolio', {
        templateUrl: 'angular-app/portfolio/portfolio.html',
        controller: 'PortfolioCtrl',
        controllerAs: 'vm',
        label: 'Portfolio'
    }).when('/pricing', {
        templateUrl: 'angular-app/pricing/pricing.html',
        controller: 'PricingCtrl',
        controllerAs: 'vm',
        label: 'Pricing'
    }).when('/real-estate', {
        templateUrl: 'angular-app/real-estate/real-estate.html',
        controller: 'RealEstateCtrl',
        controllerAs: 'vm',
        label: 'Real Estate Cinematography'
    }).when('/commercial', {
        templateUrl: 'angular-app/commercial/commercial.html',
        controller: 'CommercialCtrl',
        controllerAs: 'vm',
        label: 'Commercial Productions'
    }).when('/aerial', {
        templateUrl: 'angular-app/aerial/aerial.html',
        controller: 'AerialCtrl',
        controllerAs: 'vm',
        label: 'Aerial Surveying'
    }).otherwise({ redirectTo: '/' });
}]);

angularApp.run([function () {
    $(document).foundation();
}]);

/**
 * Here we declare some empty modules for our application where we will put the app's controllers, directives, and services
 */
angular.module('app.controllers', []);
angular.module('app.directives', []);
angular.module('app.services', []);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by Brandon on 6/2/2016.
 */

var AerialController = function () {
    _createClass(AerialController, null, [{
        key: 'getName',
        value: function getName() {
            return 'AerialCtrl';
        }
    }, {
        key: 'getDependencies',
        value: function getDependencies() {
            return ['$rootScope', AerialController];
        }
    }]);

    function AerialController($rootScope) {
        _classCallCheck(this, AerialController);

        this.$rootScope = $rootScope;

        this.init();
    }

    _createClass(AerialController, [{
        key: 'init',
        value: function init() {
            this.$rootScope.appData.smallScreenHeader = 'Aerial Surveying';
            this.$rootScope.appData.isLight = false;
        }
    }]);

    return AerialController;
}();

registerComponent('app.controllers').controller(AerialController.getName(), AerialController.getDependencies());
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by Brandon on 6/2/2016.
 */

var ContactUsController = function () {
    _createClass(ContactUsController, null, [{
        key: 'getName',
        value: function getName() {
            return 'ContactCtrl';
        }
    }, {
        key: 'getDependencies',
        value: function getDependencies() {
            return ['$http', '$rootScope', '$timeout', 'swal', 'velocity', 'ga', '$scope', ContactUsController];
        }
    }]);

    function ContactUsController($http, $rootScope, $timeout, swal, velocity, ga, $scope) {
        _classCallCheck(this, ContactUsController);

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

    _createClass(ContactUsController, [{
        key: 'init',
        value: function init($scope) {
            var _this = this;

            this.$rootScope.appData.smallScreenHeader = 'Contact Us';
            this.$rootScope.appData.isLight = false;

            this.$timeout(function () {
                var items = $('.callout, form');
                _this.velocity(items, 'transition.slideUpIn', { duration: 500, stagger: 150 });
            }, 0);

            $scope.$watchCollection(function () {
                return _this.contact;
            }, function () {
                if (!(_this.contact.name || _this.contact.email || _this.contact.phone || _this.contact.subject || _this.contact.message)) {
                    return;
                }

                if (!_this.formStarted) {
                    _this.formStarted = true;
                    _this.ga('send', 'event', 'contact-us', 'form-started');
                }
            });

            this.ga('send', 'event', 'contact-us', 'form-visited');
        }
    }, {
        key: 'getEmptyContact',
        value: function getEmptyContact() {
            return {
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: ''
            };
        }
    }, {
        key: 'onSubmit',
        value: function onSubmit(contactForm) {
            if (contactForm.$valid) {
                this.ga('send', 'event', 'contact-us', 'form-submitted');
                this.isSubmitting = true;
                this.swal('Success', 'Thank you for contacting us, someone will respond to you shortly.', 'success');
                this.contact = this.getEmptyContact();
                this.contactForm.$setPristine(true);
                this.isSubmitting = false;
            }
        }
    }]);

    return ContactUsController;
}();

registerComponent('app.controllers').controller(ContactUsController.getName(), ContactUsController.getDependencies());
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * This is the base controller attached to the <body> tag
 */

var BaseController = function () {
    _createClass(BaseController, null, [{
        key: 'getName',
        value: function getName() {
            return 'BaseCtrl';
        }
    }, {
        key: 'getDependencies',
        value: function getDependencies() {
            return ['$rootScope', '$scope', '$location', 'velocity', '_', '$sce', '$window', BaseController];
        }
    }]);

    function BaseController($rootScope, $scope, $location, velocity, _, $sce, $window) {
        _classCallCheck(this, BaseController);

        this.$rootScope = $rootScope;
        this.$location = $location;
        this.velocity = velocity;
        this._ = _;
        this.$window = $window;

        this.$rootScope.appData = {
            smallScreenHeader: 'Cinescape',
            activeNavigationLink: 'home'
        };

        this.navLinks = [{ label: 'Home', smallLabel: $sce.trustAsHtml('<i class="fa fa-circle-thin"></i><span>Home</span>'), href: '#!/', isActive: false }, { label: 'Commercial', smallLabel: $sce.trustAsHtml('<i class="fa fa-video-camera"></i><span>Commercial Productions</span>'), href: '#!/commercial', isActive: false }, { label: 'Real Estate', smallLabel: $sce.trustAsHtml('<i class="fa fa-home"></i><span>Real Estate Cinematography</span>'), href: '#!/real-estate', isActive: false },
        //{label: 'Aerial Surveying', smallLabel: $sce.trustAsHtml('<i class="fa fa-phone"></i><span>Aerial Surveying</span>'), href: '#!/aerial', isActive: false},
        { label: 'About Us', smallLabel: $sce.trustAsHtml('<i class="fa fa-user"></i><span>About Us</span>'), href: '#!/about', isActive: false }, { label: 'Contact Us', smallLabel: $sce.trustAsHtml('<i class="fa fa-phone"></i><span>Contact Us</span>'), href: '#!/contact', isActive: false }];

        this.init($scope);
    }

    _createClass(BaseController, [{
        key: 'init',
        value: function init($scope) {
            var _this = this;

            //when the user navigates to a new page, clear the page messages/errors
            $scope.$on('$locationChangeStart', function (event) {
                var currentPath = _this.$location.path();

                _this.setLinksInactive();
                var activeLink = _this._.find(_this.navLinks, { href: '#!' + currentPath });
                if (activeLink) {
                    activeLink.isActive = true;
                }

                _this.scrollToTop(0);
            });

            //when the view changes, report to google analytics
            $scope.$on('$viewContentLoaded', function (event) {
                if (_this.$window.ga) {
                    _this.$window.ga('set', 'page', _this.$location.url());
                    _this.$window.ga('send', 'pageview');
                }
            });
        }
    }, {
        key: 'setLinksInactive',
        value: function setLinksInactive() {
            this._.forEach(this.navLinks, function (link) {
                link.isActive = false;
            });
        }
    }, {
        key: 'afterViewEnter',
        value: function afterViewEnter() {
            $('#view').attr('style', '');
        }
    }, {
        key: 'onScrollToTopClick',
        value: function onScrollToTopClick() {
            this.scrollToTop(350);
        }
    }, {
        key: 'scrollToTop',
        value: function scrollToTop(duration) {
            this.velocity($('html'), 'scroll', { duration: duration });
        }
    }]);

    return BaseController;
}();

registerComponent('app.controllers').controller(BaseController.getName(), BaseController.getDependencies());
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by Brandon on 6/2/2016.
 */

var HomeController = function () {
    _createClass(HomeController, null, [{
        key: 'getName',
        value: function getName() {
            return 'HomeCtrl';
        }
    }, {
        key: 'getDependencies',
        value: function getDependencies() {
            return ['$http', '$rootScope', '$timeout', 'velocity', '$interval', '_', '$scope', '$location', '$sce', 'ga', HomeController];
        }
    }]);

    function HomeController($http, $rootScope, $timeout, velocity, $interval, _, $scope, $location, $sce, ga) {
        _classCallCheck(this, HomeController);

        this.$http = $http;
        this.$rootScope = $rootScope;
        this.$timeout = $timeout;
        this.velocity = velocity;
        this.$interval = $interval;
        this._ = _;
        this.$location = $location;
        this.ga = ga;

        this.sectionChangeInterval = 9000;
        this.sections = [{
            section: 1,
            backgroundImage: 'camera.jpg',
            slogan: $sce.trustAsHtml('Professional <a href="#!/commercial" class="highlight">TV and Web Commercials</a> that will give your company an edge over the competition'),
            title: 'Commercial Productions',
            learnMoreText: 'Learn More About Commercial Productions',
            detailUrl: '/commercial'
        }, {
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

    _createClass(HomeController, [{
        key: 'init',
        value: function init($scope) {
            var _this = this;

            this.$rootScope.appData.smallScreenHeader = 'Cinescape';
            this.$rootScope.appData.isLight = true;

            this.$timeout(function () {
                var onComplete = function onComplete() {
                    _this.initialAnimationComplete = true;
                };

                _this.velocity($('.hero-text').find('.title-wrapper,h1,button'), 'transition.slideUpIn', { duration: 1000, stagger: 100, drag: true, complete: onComplete });
            }, 0);

            this.resetSectionInterval();
            this.goToSection(this.currentSection);

            $scope.$on('$destroy', function () {
                _this.$timeout.cancel(_this.sectionStartDelayTimeout);
                _this.$interval.cancel(_this.sectionInterval);
            });
        }
    }, {
        key: 'resetSectionInterval',
        value: function resetSectionInterval(startDelay) {
            var _this2 = this;

            if (!startDelay) {
                startDelay = 0;
            }

            var startProgressBarAnimation = function startProgressBarAnimation() {
                var sectionProgress = $('.section-progress');
                var transitionInterval = 1000;
                _this2.velocity(sectionProgress, 'stop');

                //return;

                _this2.velocity(sectionProgress, { scaleX: 1 }, { duration: transitionInterval, easing: 'easeOutQuart', complete: function complete() {
                        if (_this2.sectionInterval != null) {
                            _this2.velocity(sectionProgress, { scaleX: 0 }, { duration: _this2.sectionChangeInterval - transitionInterval });
                        }
                    } });
            };

            var resetInterval = function resetInterval() {
                _this2.sectionInterval = _this2.$interval(function () {
                    _this2.goToNextSection(1000);
                }, _this2.sectionChangeInterval);
            };

            if (startDelay > 0) {
                this.$interval.cancel(this.sectionInterval);
                this.sectionInterval = null;
                startProgressBarAnimation();
                this.$timeout.cancel(this.sectionStartDelayTimeout);
                this.sectionStartDelayTimeout = this.$timeout(function () {
                    startProgressBarAnimation();
                    resetInterval();
                }, startDelay);
            } else {
                startProgressBarAnimation();
                if (this.sectionInterval == null) {
                    resetInterval();
                }
            }
        }
    }, {
        key: 'goToNextSection',
        value: function goToNextSection(startDelay) {
            var index = this._.indexOf(this.sections, this.currentSection) + 1;
            if (index >= this.sections.length) {
                index = 0;
            }
            this.goToSection(this.sections[index], startDelay);
        }
    }, {
        key: 'goToSection',
        value: function goToSection(section, startDelay) {
            this.resetSectionInterval(startDelay);
            this.currentSection = section;

            if (this.initialAnimationComplete) {
                var slogan = $('.hero-text').find('h1');
                this.velocity(slogan, 'stop');
                this.velocity(slogan, 'transition.slideRightIn', { duration: 1500 });
            }

            section.translateStyle = { 'transform': 'translateY(0) scale(1)' };

            var translateY = 40;
            var topPadding = 35;
            var inactiveSections = this._.filter(this.sections, function (s) {
                return s != section;
            });
            this._.forEach(inactiveSections, function (inactiveSection, index) {
                inactiveSection.translateStyle = { 'transform': 'translateY(-' + (translateY * (index + 1) + topPadding) + 'px) scale(.5)' };
            });
        }
    }, {
        key: 'onLearnMore',
        value: function onLearnMore() {
            this.ga('send', 'event', 'learn-more-click', this.currentSection.title);
            this.$location.path(this.currentSection.detailUrl);
        }
    }]);

    return HomeController;
}();

registerComponent('app.controllers').controller(HomeController.getName(), HomeController.getDependencies());
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by Brandon on 6/2/2016.
 */

var CommercialController = function () {
    _createClass(CommercialController, null, [{
        key: 'getName',
        value: function getName() {
            return 'CommercialCtrl';
        }
    }, {
        key: 'getDependencies',
        value: function getDependencies() {
            return ['$rootScope', CommercialController];
        }
    }]);

    function CommercialController($rootScope) {
        _classCallCheck(this, CommercialController);

        this.$rootScope = $rootScope;

        this.init();
    }

    _createClass(CommercialController, [{
        key: 'init',
        value: function init() {
            this.$rootScope.appData.smallScreenHeader = 'Commercial Productions';
            this.$rootScope.appData.isLight = false;
        }
    }]);

    return CommercialController;
}();

registerComponent('app.controllers').controller(CommercialController.getName(), CommercialController.getDependencies());
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by Brandon on 6/2/2016.
 */

var RealEstateController = function () {
    _createClass(RealEstateController, null, [{
        key: 'getName',
        value: function getName() {
            return 'RealEstateCtrl';
        }
    }, {
        key: 'getDependencies',
        value: function getDependencies() {
            return ['$rootScope', RealEstateController];
        }
    }]);

    function RealEstateController($rootScope) {
        _classCallCheck(this, RealEstateController);

        this.$rootScope = $rootScope;

        this.init();
    }

    _createClass(RealEstateController, [{
        key: 'init',
        value: function init() {
            this.$rootScope.appData.smallScreenHeader = 'Real Estate Cinematography';
            this.$rootScope.appData.isLight = false;
        }
    }]);

    return RealEstateController;
}();

registerComponent('app.controllers').controller(RealEstateController.getName(), RealEstateController.getDependencies());
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by Brandon on 6/2/2016.
 */

var AboutUsController = function () {
    _createClass(AboutUsController, null, [{
        key: 'getName',
        value: function getName() {
            return 'AboutCtrl';
        }
    }, {
        key: 'getDependencies',
        value: function getDependencies() {
            return ['$http', '$rootScope', '$timeout', 'ScrollMagic', AboutUsController];
        }
    }]);

    function AboutUsController($http, $rootScope, $timeout, ScrollMagic) {
        _classCallCheck(this, AboutUsController);

        this.$http = $http;
        this.$rootScope = $rootScope;
        this.ScrollMagic = ScrollMagic;
        this.$timeout = $timeout;
        this.runStartAnimation = false;

        this.contacts = [{
            photoUrl: 'dist/images/jeremy.jpg',
            name: 'Jeremy Ayers',
            title: 'Pilot (FAA Licensed)',
            email: 'jeremy@cinescape.us'
        }, {
            photoUrl: 'dist/images/sam.jpg',
            name: 'Sam Low',
            title: 'Director / Compositor',
            email: 'sam@cinescape.us',
            style: { 'background-position': '50% 100%' }
        }, {
            photoUrl: 'https://0.s3.envato.com/files/183626516/Image/Image_Profile.jpg',
            name: 'Darren Beasley',
            title: 'Cinematographer / Photographer',
            email: 'darren@cinescape.us'
        }, {
            photoUrl: 'https://0.s3.envato.com/files/183626516/Image/Image_Profile.jpg',
            name: 'Brandon Ayers',
            title: 'Cinematographer / Photographer',
            email: 'brandon@cinescape.us'
        }];

        // $timeout(() => {
        //     this.runStartAnimation = true;
        // }, 0);

        this.init();
    }

    _createClass(AboutUsController, [{
        key: 'init',
        value: function init() {
            var _this = this;

            this.$rootScope.appData.smallScreenHeader = 'About Us';
            this.$rootScope.appData.isLight = true;

            var firstContactEnter = true;
            var firstContactLeave = true;

            this.$timeout(function () {
                var getContactCardScene = function getContactCardScene(triggerSelector) {
                    return new _this.ScrollMagic.Scene({ triggerElement: triggerSelector }).on("enter", function (e) {
                        var duration = 750;
                        var stagger = 150;

                        if (firstContactEnter) {
                            duration = 1;
                            stagger = 0;
                            firstContactEnter = false;
                        }

                        $(triggerSelector).velocity("transition.slideLeftIn", { duration: duration, stagger: stagger });
                    }).on("leave", function (e) {
                        var duration = 300;

                        if (firstContactLeave) {
                            duration = 0;
                            firstContactLeave = false;
                        }

                        $(triggerSelector).velocity({ opacity: 0 }, { duration: duration, stagger: 0 });
                    })
                    //.addIndicators() //uncomment this to see where the scroll triggers will be
                    .triggerHook(.75);
                };

                var getSectionScene = function getSectionScene(triggerSelector) {
                    return new _this.ScrollMagic.Scene({ triggerElement: triggerSelector }).on("enter", function (e) {
                        $(triggerSelector).find('h1,h1+p').velocity("transition.slideLeftIn", { duration: 1000, stagger: 200 });
                    }).on("leave", function (e) {
                        $(triggerSelector).find('h1,h1+p').velocity({ opacity: 0 }, { duration: 300, stagger: 200 });
                    })
                    //.addIndicators() //uncomment this to see where the scroll triggers will be
                    .triggerHook(.75);
                };

                var scrollMagicController = new _this.ScrollMagic.Controller();
                scrollMagicController.addScene(getContactCardScene('.contact-card'));
                scrollMagicController.addScene(getSectionScene('.about-hero'));
                // scrollMagicController.addScene(getSectionScene('.philosophy'));
                // scrollMagicController.addScene(getContactCardScene('#bright-bold-container'));
                //scrollMagicController.addScene(getContactCardScene('#human-centered-container'));
            }, 0);
        }
    }]);

    return AboutUsController;
}();

registerComponent('app.controllers').controller(AboutUsController.getName(), AboutUsController.getDependencies());
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by Brandon on 6/2/2016.
 */

var PricingController = function () {
    _createClass(PricingController, null, [{
        key: 'getName',
        value: function getName() {
            return 'PricingCtrl';
        }
    }, {
        key: 'getDependencies',
        value: function getDependencies() {
            return ['$rootScope', 'velocity', '$timeout', PricingController];
        }
    }]);

    function PricingController($rootScope, velocity, $timeout) {
        _classCallCheck(this, PricingController);

        this.$rootScope = $rootScope;
        this.velocity = velocity;
        this.$timeout = $timeout;

        this.pricingInfo = [{
            title: 'Standard Property',
            price: '$1499*',
            description: '* This is just an estimate. Pricing is subject to change based on each individual property.',
            houseSize: '< 2000 sqft house',
            lotSize: '< 8000 sqft lot',
            included: 'Professionally edited 4k footage'
        }, {
            title: 'Large Property',
            price: '$2499*',
            description: '* This is just an estimate. Pricing is subject to change based on each individual property.',
            houseSize: '2001 - 3500 sqft house',
            lotSize: '8001 - 16000 sqft lot',
            included: 'Professionally edited 4k footage'
        }, {
            title: 'Luxury Property',
            price: '$4999*',
            description: '* This is just an estimate. Pricing is subject to change based on each individual property.',
            houseSize: '> 3500 sqft house',
            lotSize: '> 16000 sqft lot',
            included: 'Professionally edited 4k footage'
        }];

        this.init();
    }

    _createClass(PricingController, [{
        key: 'init',
        value: function init() {
            var _this = this;

            this.$rootScope.appData.smallScreenHeader = 'Pricing';
            this.$rootScope.appData.isLight = false;

            this.$timeout(function () {
                var items = $('.pricing-wrapper');
                _this.velocity(items, 'transition.slideLeftIn', { duration: 750, stagger: 75 });
            }, 0);
        }
    }]);

    return PricingController;
}();

registerComponent('app.controllers').controller(PricingController.getName(), PricingController.getDependencies());
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by Brandon on 6/2/2016.
 */

var PortfolioController = function () {
    _createClass(PortfolioController, null, [{
        key: 'getName',
        value: function getName() {
            return 'PortfolioCtrl';
        }
    }, {
        key: 'getDependencies',
        value: function getDependencies() {
            return ['$rootScope', PortfolioController];
        }
    }]);

    function PortfolioController($rootScope) {
        _classCallCheck(this, PortfolioController);

        this.$rootScope = $rootScope;

        this.init();
    }

    _createClass(PortfolioController, [{
        key: 'init',
        value: function init() {
            this.$rootScope.appData.smallScreenHeader = 'Portfolio';
            this.$rootScope.appData.isLight = false;

            // this.$timeout(() => {
            //     let items = $('form');
            //     this.velocity(items, 'transition.slideUpIn', {duration: 500, delay: 50});
            // }, 0);
        }
    }]);

    return PortfolioController;
}();

registerComponent('app.controllers').controller(PortfolioController.getName(), PortfolioController.getDependencies());
'use strict';

/**
 * Created by Brandon on 10/29/2015.
 */

angular.module('app.directives').directive('appForm', ['$timeout', 'velocity', '_', function ($timeout, velocity, _) {
    return {
        restrict: 'A', //can only be attribute
        link: function link(scope, element, attrs) {
            if (!attrs.name) {
                throw 'Directive app-form requires "name" attribute.';
            }

            element.addClass('app-form');

            var addBlurHandlers = function addBlurHandlers() {
                var allInputs = element.find('input, textarea');
                allInputs.off('blur.appForm');
                allInputs.on('blur.appForm', function () {
                    $(this).addClass('has-visited');
                    showErrors();
                });
            };
            addBlurHandlers();

            var getInvalidElements = function getInvalidElements() {
                if (element.hasClass('ng-submitted')) {
                    return element.find('.ng-invalid');
                } else {
                    var inputs = element.find('input.ng-invalid.ng-dirty.has-visited');
                    var textareas = element.find('textarea.ng-invalid.ng-dirty.has-visited');
                    var selects = element.find('select.ng-invalid.ng-dirty');

                    return inputs.add(textareas).add(selects);
                }
            };

            var showErrors = function showErrors() {
                var errorEls = element.find('input.is-invalid-input,label.is-invalid-label,span.form-error');
                errorEls.removeClass('is-invalid-input').removeClass('is-invalid-label').removeClass('is-visible');

                var invalidFields = getInvalidElements();
                _.forEach(invalidFields, function (field) {
                    var parentDiv = $(field).parents('div:first');
                    //parentDiv.addClass('error');
                    parentDiv.find('label').addClass('is-invalid-label');
                    parentDiv.find('input').addClass('is-invalid-input');
                    parentDiv.find('span.form-error').addClass('is-visible');
                });
            };

            element.on('submit', function () {
                $timeout(function () {
                    var invalidFields = getInvalidElements();
                    var visibleInvalidFields = invalidFields.filter(':visible');
                    if (visibleInvalidFields.length > 0) {
                        velocity($(visibleInvalidFields[0]), 'scroll', { duration: 300, offset: -100, easing: 'spring' });
                    }

                    showErrors();
                }, 50);

                //if ng-submit wasn't set (which will prevent form submission), then we need to prevent form submission ourselves.
                if (!attrs.ngSubmit) {
                    scope.$eval('$parent.' + attrs.name).$setSubmitted();
                    event.preventDefault();
                    event.returnValue = false;
                    return false;
                }
            });

            scope.$parent.$watch(attrs.name + '.$error', function () {
                $timeout(function () {
                    showErrors();
                }, 200);
            }, true);

            scope.$parent.$watch(attrs.name + '.$pristine', function (isPristine) {
                if (isPristine === true) {
                    $timeout(function () {
                        showErrors();
                    }, 200);
                }
            });

            scope.$watch(function () {
                return element.find('input, select, textarea').length;
            }, function () {
                addBlurHandlers();
                setupFormElementWatches();
            });

            /////////////////auto save bindings/////////////////////
            var onChange = function onChange(trackLastActivity) {
                //console.log('auto-save-trigger onChange triggered');
                if (trackLastActivity === true) {
                    scope.lastActivity = Date.now();
                } else {
                    scope.isDirty = true;
                }

                if (!scope.$$phase && !scope.$root.$$phase) {
                    scope.$apply();
                }
            };

            var setupFormElementWatches = function setupFormElementWatches() {
                if (scope.enableAutoSave != 'true') {
                    return;
                }

                element.find('input, textarea, select').off('keyup.appForm change.appForm').not('[auto-save-ignore]').each(function () {
                    var input = this;
                    var isTextInput = input.tagName.toLowerCase() == 'textarea' || input.tagName.toLowerCase() == 'input' && ['radio', 'checkbox', 'hidden'].indexOf($(input).attr('type').toLowerCase()) < 0;

                    //if it's a ucr-select2 control then don't treat it like a text input
                    isTextInput = isTextInput && $(input).attr('ucr-select2') != '';

                    if (isTextInput) {
                        $(input).bind('keyup.appForm', function () {
                            onChange(true);
                        });
                    } else {
                        $(input).bind('change.appForm', onChange);
                    }
                });
            };

            setupFormElementWatches();
        },
        controller: ['$scope', function ($scope) {
            $scope.maxSaveInterval = $scope.maxSaveInterval ? $scope.maxSaveInterval : 3000; //The form won't save more often than this
            $scope.inactivityInterval = $scope.inactivityInterval ? $scope.inactivityInterval : 1000; //Amount of inactivity on text inputs necessary before triggering auto save

            $scope.lastActivity = 0;
            $scope.$watch('lastActivity', function (newValue, oldValue) {
                if (newValue === oldValue) {
                    return;
                }

                //console.log('lastActivity watch - oldValue: ' + oldValue + ', newValue: ' + newValue);
                if ($scope.isDirty || newValue == 0) {
                    //console.log('isDirty is already true or newValue is 0, returning');
                    return;
                }

                function setIsDirty() {
                    //console.log('setIsDirty() called in lastActivity watch');
                    $scope.isDirty = true;
                }

                var now = Date.now();

                var msSinceLastActivity = now - oldValue;
                //console.log('Time since last activity: ' + msSinceLastActivity);
                if (oldValue == 0 || msSinceLastActivity < $scope.inactivityInterval) {
                    //console.log('Not enough inactivity');
                    if ($scope.inactivityTimeout != null) {
                        $timeout.cancel($scope.inactivityTimeout);
                        $scope.inactivityTimeout = null;
                    }

                    $scope.inactivityTimeout = $timeout(setIsDirty, $scope.inactivityInterval);
                    return;
                }

                //console.log('Calling setIsDirty directly since last activity > inactivityInterval');
                setIsDirty();
            });

            $scope.inactivityTimeout = null;
            $scope.isDirty = false;
            $scope.$watch('isDirty', function (newValue, oldValue) {
                if (newValue === oldValue) {
                    return;
                }

                //console.log('isDirty watch: ' + newValue);
                if (newValue == false || $scope.maxSaveTimeout != null) {
                    return;
                }

                var now = Date.now();

                var msSinceLastSaved = now - $scope.lastSaved;
                if (msSinceLastSaved < $scope.maxSaveInterval) {
                    var nextSaveTime = $scope.maxSaveInterval - msSinceLastSaved;
                    $scope.maxSaveTimeout = $timeout($scope.triggerAutoSave, nextSaveTime);
                    return;
                }

                $scope.triggerAutoSave();
            });
            $scope.triggerAutoSave = function () {
                //console.log('AutoSave triggered');
                if ($scope.maxSaveTimeout != null) $timeout.cancel($scope.maxSaveTimeout);
                $scope.maxSaveTimeout = null;
                if ($scope.inactivityTimeout != null) $timeout.cancel($scope.inactivityTimeout);
                $scope.inactivityTimeout = null;
                $scope.lastActivity = 0;
                $scope.isDirty = false;
                $scope.lastSaved = Date.now();
                $scope.onAutoSave();
            };
            $scope.lastSaved = 0;
            $scope.maxSaveTimeout = null;
        }],
        scope: {
            'enableAutoSave': '@',
            'onAutoSave': '&',
            'maxSaveInterval': '@',
            'inactivityInterval': '@'
        }
    };
}]);
/**
 * Created by Brandon on 10/20/2015.
 */

'use strict';

/* 3rd Party Service Wrappers */

angular.module('app.services')

//velocity service
.factory('velocity', [function () {
    return $.Velocity;
}])

//lodash service
.factory('_', [function () {
    return window._;
}])

//magnific popup service
//     .factory('magnificPopup', [
//         function() {
//             return $.magnificPopup;
//         }])

//ScrollMagic
.factory('ScrollMagic', [function () {
    return window.ScrollMagic;
}])

//sweet alert service
.factory('swal', [function () {
    return window.swal;
}]).factory('ga', [function () {
    return window.ga;
}]);

//js-logger library
//     .factory('Logger', [
//         function() {
//             return Logger;
//         }])

//momentjs library
//     .factory('moment', [
//         function() {
//             return moment;
//         }]);