(function() {
    'use strict';

    angular
        .module('foodAppetencyApp')
        .controller('TableQRDialogController', TableQRDialogController);

    TableQRDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', '$q', 'entity', 'TableQR', 'DiningTable', 'Store'];

    function TableQRDialogController ($timeout, $scope, $stateParams, $uibModalInstance, $q, entity, TableQR, DiningTable, Store) {
        var vm = this;

        vm.tableQR = entity;
        vm.clear = clear;
        vm.save = save;
        vm.tables = DiningTable.query({filter: 'tableqr-is-null'});
        $q.all([vm.tableQR.$promise, vm.tables.$promise]).then(function() {
            if (!vm.tableQR.tableId) {
                return $q.reject();
            }
            return DiningTable.get({id : vm.tableQR.tableId}).$promise;
        }).then(function(table) {
            vm.tables.push(table);
        });
        vm.stores = Store.query({filter: 'tableqr-is-null'});
        $q.all([vm.tableQR.$promise, vm.stores.$promise]).then(function() {
            if (!vm.tableQR.storeId) {
                return $q.reject();
            }
            return Store.get({id : vm.tableQR.storeId}).$promise;
        }).then(function(store) {
            vm.stores.push(store);
        });

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.tableQR.id !== null) {
                TableQR.update(vm.tableQR, onSaveSuccess, onSaveError);
            } else {
                TableQR.save(vm.tableQR, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('foodAppetencyApp:tableQRUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
