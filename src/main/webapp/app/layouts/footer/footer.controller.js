(function() {
    'use strict';

    angular
        .module('foodAppetencyApp')
        .controller('FooterController', FooterController);

    FooterController.$inject = ['$state', 'Auth', 'Principal', 'ProfileService'];

    function FooterController ($state, Auth, Principal, ProfileService) {
        var vm = this;
        vm.isAuthenticated = Principal.isAuthenticated;
        vm.$state = $state;
    }
})();
