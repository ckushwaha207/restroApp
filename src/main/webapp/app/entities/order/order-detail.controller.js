(function() {
    'use strict';

    angular
        .module('foodAppetencyApp')
        .controller('OrderDetailController', OrderDetailController);

    OrderDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Order', 'CommerceItem', 'Payment'];

    function OrderDetailController($scope, $rootScope, $stateParams, previousState, entity, Order, CommerceItem, Payment) {
        var vm = this;

        vm.order = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('foodAppetencyApp:orderUpdate', function(event, result) {
            vm.order = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
