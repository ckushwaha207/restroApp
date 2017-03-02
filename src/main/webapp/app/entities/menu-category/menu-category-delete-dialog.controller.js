(function() {
    'use strict';

    angular
        .module('foodAppetencyApp')
        .controller('MenuCategoryDeleteController',MenuCategoryDeleteController);

    MenuCategoryDeleteController.$inject = ['$uibModalInstance', 'entity', 'MenuCategory'];

    function MenuCategoryDeleteController($uibModalInstance, entity, MenuCategory) {
        var vm = this;

        vm.menuCategory = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            MenuCategory.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
