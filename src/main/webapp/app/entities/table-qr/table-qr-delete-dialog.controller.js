(function() {
    'use strict';

    angular
        .module('foodAppetencyApp')
        .controller('TableQRDeleteController',TableQRDeleteController);

    TableQRDeleteController.$inject = ['$uibModalInstance', 'entity', 'TableQR'];

    function TableQRDeleteController($uibModalInstance, entity, TableQR) {
        var vm = this;

        vm.tableQR = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            TableQR.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
