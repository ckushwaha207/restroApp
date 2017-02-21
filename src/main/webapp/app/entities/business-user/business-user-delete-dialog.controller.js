(function() {
    'use strict';

    angular
        .module('foodAppetencyApp')
        .controller('BusinessUserDeleteController',BusinessUserDeleteController);

    BusinessUserDeleteController.$inject = ['$uibModalInstance', 'entity', 'BusinessUser'];

    function BusinessUserDeleteController($uibModalInstance, entity, BusinessUser) {
        var vm = this;

        vm.businessUser = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            BusinessUser.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
