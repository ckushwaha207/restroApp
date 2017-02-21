(function() {
    'use strict';

    angular
        .module('foodAppetencyApp')
        .controller('BusinessUserDialogController', BusinessUserDialogController);

    BusinessUserDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', '$q', 'entity', 'BusinessUser', 'User', 'StoreGroup', 'Store'];

    function BusinessUserDialogController ($timeout, $scope, $stateParams, $uibModalInstance, $q, entity, BusinessUser, User, StoreGroup, Store) {
        var vm = this;

        vm.businessUser = entity;
        vm.clear = clear;
        vm.save = save;
        vm.users = User.query();
        vm.storegroups = StoreGroup.query({filter: 'user-is-null'});
        $q.all([vm.businessUser.$promise, vm.storegroups.$promise]).then(function() {
            if (!vm.businessUser.storeGroupId) {
                return $q.reject();
            }
            return StoreGroup.get({id : vm.businessUser.storeGroupId}).$promise;
        }).then(function(storeGroup) {
            vm.storegroups.push(storeGroup);
        });
        vm.stores = Store.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.businessUser.id !== null) {
                BusinessUser.update(vm.businessUser, onSaveSuccess, onSaveError);
            } else {
                BusinessUser.save(vm.businessUser, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('foodAppetencyApp:businessUserUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
