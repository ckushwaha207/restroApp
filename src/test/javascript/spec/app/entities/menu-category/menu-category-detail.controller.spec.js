'use strict';

describe('Controller Tests', function() {

    describe('MenuCategory Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockMenuCategory, MockMenuItem, MockMenu;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockMenuCategory = jasmine.createSpy('MockMenuCategory');
            MockMenuItem = jasmine.createSpy('MockMenuItem');
            MockMenu = jasmine.createSpy('MockMenu');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'MenuCategory': MockMenuCategory,
                'MenuItem': MockMenuItem,
                'Menu': MockMenu
            };
            createController = function() {
                $injector.get('$controller')("MenuCategoryDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'foodAppetencyApp:menuCategoryUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
