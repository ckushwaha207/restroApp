(function() {
    'use strict';

    angular
        .module('foodAppetencyApp')
        .controller('MenuItemDetailController', MenuItemDetailController);

    MenuItemDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'MenuItem', 'MenuCategory'];

    function MenuItemDetailController($scope, $rootScope, $stateParams, previousState, entity, MenuItem, MenuCategory) {
        var vm = this;

        vm.menuItem = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('foodAppetencyApp:menuItemUpdate', function(event, result) {
            vm.menuItem = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
