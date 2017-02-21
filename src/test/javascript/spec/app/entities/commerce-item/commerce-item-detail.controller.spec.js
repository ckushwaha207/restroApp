'use strict';

describe('Controller Tests', function() {

    describe('CommerceItem Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockCommerceItem, MockMenuItem, MockOrder;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockCommerceItem = jasmine.createSpy('MockCommerceItem');
            MockMenuItem = jasmine.createSpy('MockMenuItem');
            MockOrder = jasmine.createSpy('MockOrder');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'CommerceItem': MockCommerceItem,
                'MenuItem': MockMenuItem,
                'Order': MockOrder
            };
            createController = function() {
                $injector.get('$controller')("CommerceItemDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'foodAppetencyApp:commerceItemUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
