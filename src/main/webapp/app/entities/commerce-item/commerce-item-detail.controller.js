(function() {
    'use strict';

    angular
        .module('foodAppetencyApp')
        .controller('CommerceItemDetailController', CommerceItemDetailController);

    CommerceItemDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'CommerceItem', 'MenuItem', 'Order'];

    function CommerceItemDetailController($scope, $rootScope, $stateParams, previousState, entity, CommerceItem, MenuItem, Order) {
        var vm = this;

        vm.commerceItem = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('foodAppetencyApp:commerceItemUpdate', function(event, result) {
            vm.commerceItem = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
