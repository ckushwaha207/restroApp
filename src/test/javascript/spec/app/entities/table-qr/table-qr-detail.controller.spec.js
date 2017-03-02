'use strict';

describe('Controller Tests', function() {

    describe('TableQR Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockTableQR, MockDiningTable, MockStore;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockTableQR = jasmine.createSpy('MockTableQR');
            MockDiningTable = jasmine.createSpy('MockDiningTable');
            MockStore = jasmine.createSpy('MockStore');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'TableQR': MockTableQR,
                'DiningTable': MockDiningTable,
                'Store': MockStore
            };
            createController = function() {
                $injector.get('$controller')("TableQRDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'foodAppetencyApp:tableQRUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
