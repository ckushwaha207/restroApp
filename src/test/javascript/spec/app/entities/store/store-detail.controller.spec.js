'use strict';

describe('Controller Tests', function() {

    describe('Store Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockStore, MockLocation, MockDiningTable, MockOrganization, MockStoreGroup, MockMenu;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockStore = jasmine.createSpy('MockStore');
            MockLocation = jasmine.createSpy('MockLocation');
            MockDiningTable = jasmine.createSpy('MockDiningTable');
            MockOrganization = jasmine.createSpy('MockOrganization');
            MockStoreGroup = jasmine.createSpy('MockStoreGroup');
            MockMenu = jasmine.createSpy('MockMenu');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'Store': MockStore,
                'Location': MockLocation,
                'DiningTable': MockDiningTable,
                'Organization': MockOrganization,
                'StoreGroup': MockStoreGroup,
                'Menu': MockMenu
            };
            createController = function() {
                $injector.get('$controller')("StoreDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'foodAppetencyApp:storeUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
