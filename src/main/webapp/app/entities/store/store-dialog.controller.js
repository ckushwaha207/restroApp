(function() {
    'use strict';

    angular
        .module('foodAppetencyApp')
        .controller('StoreDialogController', StoreDialogController);

    StoreDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', '$q', 'entity', 'Store', 'Location', 'DiningTable', 'Organization', 'StoreGroup', 'Menu'];

    function StoreDialogController ($timeout, $scope, $stateParams, $uibModalInstance, $q, entity, Store, Location, DiningTable, Organization, StoreGroup, Menu) {
        var vm = this;

        vm.store = entity;
        vm.clear = clear;
        vm.save = save;
        vm.locations = Location.query({filter: 'store-is-null'});
        $q.all([vm.store.$promise, vm.locations.$promise]).then(function() {
            if (!vm.store.locationId) {
                return $q.reject();
            }
            return Location.get({id : vm.store.locationId}).$promise;
        }).then(function(location) {
            vm.locations.push(location);
        });
        vm.diningtables = DiningTable.query();
        vm.organizations = Organization.query();
        vm.storegroups = StoreGroup.query();
        vm.menus = Menu.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.store.id !== null) {
                Store.update(vm.store, onSaveSuccess, onSaveError);
            } else {
                Store.save(vm.store, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('foodAppetencyApp:storeUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
