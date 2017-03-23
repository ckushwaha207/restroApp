(function() {
    'use strict';

    angular
        .module('foodAppetencyApp')
        .controller('SidebarController', SidebarController);

    SidebarController.$inject = ['$state', 'Auth', 'Principal', 'ProfileService'];

    function SidebarController ($state, Auth, Principal, ProfileService) {
        var vm = this;
        vm.isSideNavCollapsed = false;
        vm.isAuthenticated = Principal.isAuthenticated;
        vm.toggleSideNav = toggleSideNav;
        vm.$state = $state;

        function toggleSideNav() {
            vm.isSideNavCollapsed = !vm.isSideNavCollapsed;
        }
    }
})();
