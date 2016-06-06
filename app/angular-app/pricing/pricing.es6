/**
 * Created by Brandon on 6/2/2016.
 */

class PricingController {
    static getName() {
        return 'PricingCtrl';
    }

    static getDependencies() {
        return ['$rootScope', 'velocity', '$timeout', PricingController];
    }

    constructor($rootScope, velocity, $timeout) {
        this.$rootScope = $rootScope;
        this.velocity = velocity;
        this.$timeout = $timeout;

        this.pricingInfo = [
            {
                title: 'Standard Property',
                price: '$1499',
                description: 'An awesome description',
                houseSize: '0 - 2000 sqft house',
                lotSize: '0-8000 sqft lot',
                included: 'Professionally edited aerial footage'
            },
            {
                title: 'Large Property',
                price: '$2499',
                description: 'An awesome description',
                houseSize: '0 - 2000 sqft house',
                lotSize: '0-8000 sqft lot',
                included: 'Professionally edited aerial footage'
            },
            {
                title: 'Luxury Property',
                price: '$4999',
                description: 'An awesome description',
                houseSize: '0 - 2000 sqft house',
                lotSize: '0-8000 sqft lot',
                included: 'Professionally edited aerial footage'
            }
        ];

        this.init();
    }

    init() {
        this.$rootScope.appData.smallScreenHeader = 'Pricing';
        this.$rootScope.appData.isLight = false;

        this.$timeout(() => {
            let items = $('.pricing-wrapper');
            this.velocity(items, 'transition.slideLeftIn', {duration: 750, stagger: 75});
        }, 0);
    }
}

registerComponent('app.controllers').controller(PricingController.getName(), PricingController.getDependencies());