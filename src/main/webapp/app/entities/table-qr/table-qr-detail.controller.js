(function() {
    'use strict';

    angular
        .module('foodAppetencyApp')
        .controller('TableQRDetailController', TableQRDetailController);

    TableQRDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'TableQR', 'DiningTable', 'Store'];

    function TableQRDetailController($scope, $rootScope, $stateParams, previousState, entity, TableQR, DiningTable, Store) {
        var vm = this;

        vm.tableQR = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('foodAppetencyApp:tableQRUpdate', function(event, result) {
            vm.tableQR = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
