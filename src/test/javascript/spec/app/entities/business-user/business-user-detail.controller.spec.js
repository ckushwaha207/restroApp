'use strict';

describe('Controller Tests', function() {

    describe('BusinessUser Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockBusinessUser, MockUser, MockStoreGroup, MockStore;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockBusinessUser = jasmine.createSpy('MockBusinessUser');
            MockUser = jasmine.createSpy('MockUser');
            MockStoreGroup = jasmine.createSpy('MockStoreGroup');
            MockStore = jasmine.createSpy('MockStore');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'BusinessUser': MockBusinessUser,
                'User': MockUser,
                'StoreGroup': MockStoreGroup,
                'Store': MockStore
            };
            createController = function() {
                $injector.get('$controller')("BusinessUserDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'foodAppetencyApp:businessUserUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
