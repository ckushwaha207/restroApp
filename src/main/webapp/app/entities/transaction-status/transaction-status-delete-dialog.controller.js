(function() {
    'use strict';

    angular
        .module('foodAppetencyApp')
        .controller('TransactionStatusDeleteController',TransactionStatusDeleteController);

    TransactionStatusDeleteController.$inject = ['$uibModalInstance', 'entity', 'TransactionStatus'];

    function TransactionStatusDeleteController($uibModalInstance, entity, TransactionStatus) {
        var vm = this;

        vm.transactionStatus = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            TransactionStatus.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
