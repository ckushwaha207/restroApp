(function() {
    'use strict';

    angular
        .module('foodAppetencyApp')
        .controller('MenuCategoryDetailController', MenuCategoryDetailController);

    MenuCategoryDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'MenuCategory', 'MenuItem', 'Menu'];

    function MenuCategoryDetailController($scope, $rootScope, $stateParams, previousState, entity, MenuCategory, MenuItem, Menu) {
        var vm = this;

        vm.menuCategory = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('foodAppetencyApp:menuCategoryUpdate', function(event, result) {
            vm.menuCategory = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
