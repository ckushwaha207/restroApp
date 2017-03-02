(function() {
    'use strict';

    angular
        .module('foodAppetencyApp')
        .controller('CommerceItemDialogController', CommerceItemDialogController);

    CommerceItemDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', '$q', 'entity', 'CommerceItem', 'MenuItem', 'Order'];

    function CommerceItemDialogController ($timeout, $scope, $stateParams, $uibModalInstance, $q, entity, CommerceItem, MenuItem, Order) {
        var vm = this;

        vm.commerceItem = entity;
        vm.clear = clear;
        vm.save = save;
        vm.products = MenuItem.query({filter: 'commerceitem-is-null'});
        $q.all([vm.commerceItem.$promise, vm.products.$promise]).then(function() {
            if (!vm.commerceItem.productId) {
                return $q.reject();
            }
            return MenuItem.get({id : vm.commerceItem.productId}).$promise;
        }).then(function(product) {
            vm.products.push(product);
        });
        vm.orders = Order.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.commerceItem.id !== null) {
                CommerceItem.update(vm.commerceItem, onSaveSuccess, onSaveError);
            } else {
                CommerceItem.save(vm.commerceItem, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('foodAppetencyApp:commerceItemUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
