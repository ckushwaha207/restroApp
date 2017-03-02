(function() {
    'use strict';

    angular
        .module('foodAppetencyApp')
        .controller('DiningTableDeleteController',DiningTableDeleteController);

    DiningTableDeleteController.$inject = ['$uibModalInstance', 'entity', 'DiningTable'];

    function DiningTableDeleteController($uibModalInstance, entity, DiningTable) {
        var vm = this;

        vm.diningTable = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            DiningTable.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
