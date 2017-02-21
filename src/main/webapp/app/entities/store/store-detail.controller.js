(function() {
    'use strict';

    angular
        .module('foodAppetencyApp')
        .controller('StoreDetailController', StoreDetailController);

    StoreDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Store', 'Location', 'DiningTable', 'Organization', 'StoreGroup', 'Menu'];

    function StoreDetailController($scope, $rootScope, $stateParams, previousState, entity, Store, Location, DiningTable, Organization, StoreGroup, Menu) {
        var vm = this;

        vm.store = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('foodAppetencyApp:storeUpdate', function(event, result) {
            vm.store = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
