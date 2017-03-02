(function() {
    'use strict';

    angular
        .module('foodAppetencyApp')
        .controller('StoreGroupDialogController', StoreGroupDialogController);

    StoreGroupDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'StoreGroup', 'Store', 'Organization', 'BusinessUser'];

    function StoreGroupDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, StoreGroup, Store, Organization, BusinessUser) {
        var vm = this;

        vm.storeGroup = entity;
        vm.clear = clear;
        vm.save = save;
        vm.stores = Store.query();
        vm.organizations = Organization.query();
        vm.businessusers = BusinessUser.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.storeGroup.id !== null) {
                StoreGroup.update(vm.storeGroup, onSaveSuccess, onSaveError);
            } else {
                StoreGroup.save(vm.storeGroup, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('foodAppetencyApp:storeGroupUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
