(function() {
    'use strict';

    angular
        .module('foodAppetencyApp')
        .controller('StoreGroupDetailController', StoreGroupDetailController);

    StoreGroupDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'StoreGroup', 'Store', 'Organization', 'BusinessUser'];

    function StoreGroupDetailController($scope, $rootScope, $stateParams, previousState, entity, StoreGroup, Store, Organization, BusinessUser) {
        var vm = this;

        vm.storeGroup = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('foodAppetencyApp:storeGroupUpdate', function(event, result) {
            vm.storeGroup = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
