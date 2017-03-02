(function() {
    'use strict';

    angular
        .module('foodAppetencyApp')
        .controller('TransactionStatusDialogController', TransactionStatusDialogController);

    TransactionStatusDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'TransactionStatus', 'Payment'];

    function TransactionStatusDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, TransactionStatus, Payment) {
        var vm = this;

        vm.transactionStatus = entity;
        vm.clear = clear;
        vm.save = save;
        vm.payments = Payment.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.transactionStatus.id !== null) {
                TransactionStatus.update(vm.transactionStatus, onSaveSuccess, onSaveError);
            } else {
                TransactionStatus.save(vm.transactionStatus, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('foodAppetencyApp:transactionStatusUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
