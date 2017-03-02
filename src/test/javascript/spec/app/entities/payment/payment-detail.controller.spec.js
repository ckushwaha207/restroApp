'use strict';

describe('Controller Tests', function() {

    describe('Payment Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockPayment, MockTransactionStatus, MockOrder;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockPayment = jasmine.createSpy('MockPayment');
            MockTransactionStatus = jasmine.createSpy('MockTransactionStatus');
            MockOrder = jasmine.createSpy('MockOrder');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'Payment': MockPayment,
                'TransactionStatus': MockTransactionStatus,
                'Order': MockOrder
            };
            createController = function() {
                $injector.get('$controller')("PaymentDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'foodAppetencyApp:paymentUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
