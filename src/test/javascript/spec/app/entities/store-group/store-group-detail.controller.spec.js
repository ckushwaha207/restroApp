'use strict';

describe('Controller Tests', function() {

    describe('StoreGroup Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockStoreGroup, MockStore, MockOrganization, MockBusinessUser;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockStoreGroup = jasmine.createSpy('MockStoreGroup');
            MockStore = jasmine.createSpy('MockStore');
            MockOrganization = jasmine.createSpy('MockOrganization');
            MockBusinessUser = jasmine.createSpy('MockBusinessUser');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'StoreGroup': MockStoreGroup,
                'Store': MockStore,
                'Organization': MockOrganization,
                'BusinessUser': MockBusinessUser
            };
            createController = function() {
                $injector.get('$controller')("StoreGroupDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'foodAppetencyApp:storeGroupUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
