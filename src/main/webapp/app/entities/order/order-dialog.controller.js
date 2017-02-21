(function() {
    'use strict';

    angular
        .module('foodAppetencyApp')
        .controller('OrderDialogController', OrderDialogController);

    OrderDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Order', 'CommerceItem', 'Payment'];

    function OrderDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Order, CommerceItem, Payment) {
        var vm = this;

        vm.order = entity;
        vm.clear = clear;
        vm.save = save;
        vm.commerceitems = CommerceItem.query();
        vm.payments = Payment.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.order.id !== null) {
                Order.update(vm.order, onSaveSuccess, onSaveError);
            } else {
                Order.save(vm.order, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('foodAppetencyApp:orderUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
