(function() {
    'use strict';

    angular
        .module('foodAppetencyApp')
        .controller('MenuDetailController', MenuDetailController);

    MenuDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Menu', 'MenuCategory', 'Store'];

    function MenuDetailController($scope, $rootScope, $stateParams, previousState, entity, Menu, MenuCategory, Store) {
        var vm = this;

        vm.menu = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('foodAppetencyApp:menuUpdate', function(event, result) {
            vm.menu = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
