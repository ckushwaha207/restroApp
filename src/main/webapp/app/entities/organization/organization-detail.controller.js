(function() {
    'use strict';

    angular
        .module('foodAppetencyApp')
        .controller('OrganizationDetailController', OrganizationDetailController);

    OrganizationDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Organization'];

    function OrganizationDetailController($scope, $rootScope, $stateParams, previousState, entity, Organization) {
        var vm = this;

        vm.organization = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('foodAppetencyApp:organizationUpdate', function(event, result) {
            vm.organization = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
