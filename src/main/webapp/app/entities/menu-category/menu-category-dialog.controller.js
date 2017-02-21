(function() {
    'use strict';

    angular
        .module('foodAppetencyApp')
        .controller('MenuCategoryDialogController', MenuCategoryDialogController);

    MenuCategoryDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'MenuCategory', 'MenuItem', 'Menu'];

    function MenuCategoryDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, MenuCategory, MenuItem, Menu) {
        var vm = this;

        vm.menuCategory = entity;
        vm.clear = clear;
        vm.save = save;
        vm.menuitems = MenuItem.query();
        vm.menus = Menu.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.menuCategory.id !== null) {
                MenuCategory.update(vm.menuCategory, onSaveSuccess, onSaveError);
            } else {
                MenuCategory.save(vm.menuCategory, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('foodAppetencyApp:menuCategoryUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
