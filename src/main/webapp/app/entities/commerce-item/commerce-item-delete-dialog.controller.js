(function() {
    'use strict';

    angular
        .module('foodAppetencyApp')
        .controller('CommerceItemDeleteController',CommerceItemDeleteController);

    CommerceItemDeleteController.$inject = ['$uibModalInstance', 'entity', 'CommerceItem'];

    function CommerceItemDeleteController($uibModalInstance, entity, CommerceItem) {
        var vm = this;

        vm.commerceItem = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            CommerceItem.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
