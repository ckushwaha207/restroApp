(function() {
    'use strict';

    angular
        .module('foodAppetencyApp')
        .controller('StoreGroupDeleteController',StoreGroupDeleteController);

    StoreGroupDeleteController.$inject = ['$uibModalInstance', 'entity', 'StoreGroup'];

    function StoreGroupDeleteController($uibModalInstance, entity, StoreGroup) {
        var vm = this;

        vm.storeGroup = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            StoreGroup.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
