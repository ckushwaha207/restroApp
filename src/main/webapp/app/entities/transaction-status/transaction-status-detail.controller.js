(function() {
    'use strict';

    angular
        .module('foodAppetencyApp')
        .controller('TransactionStatusDetailController', TransactionStatusDetailController);

    TransactionStatusDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'TransactionStatus', 'Payment'];

    function TransactionStatusDetailController($scope, $rootScope, $stateParams, previousState, entity, TransactionStatus, Payment) {
        var vm = this;

        vm.transactionStatus = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('foodAppetencyApp:transactionStatusUpdate', function(event, result) {
            vm.transactionStatus = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
