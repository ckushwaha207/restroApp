(function() {
    'use strict';

    angular
        .module('foodAppetencyApp')
        .controller('DiningTableDialogController', DiningTableDialogController);

    DiningTableDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'DiningTable', 'Store'];

    function DiningTableDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, DiningTable, Store) {
        var vm = this;

        vm.diningTable = entity;
        vm.clear = clear;
        vm.save = save;
        vm.stores = Store.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.diningTable.id !== null) {
                DiningTable.update(vm.diningTable, onSaveSuccess, onSaveError);
            } else {
                DiningTable.save(vm.diningTable, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('foodAppetencyApp:diningTableUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
