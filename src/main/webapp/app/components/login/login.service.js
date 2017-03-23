(function() {
    'use strict';

    angular
        .module('foodAppetencyApp')
        .factory('LoginService', LoginService);

    LoginService.$inject = ['$mdDialog', '$mdMedia'];

    function LoginService ($mdDialog, $mdMedia) {
        var service = {
            open: open
        };

        var customFullscreen = $mdMedia('xs') || $mdMedia('sm');
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && customFullscreen;
        var dialogInstance = null;
        var resetDialog = function () {
            dialogInstance = null;
        };

        return service;

        function open () {
            $mdDialog.show({
                templateUrl: 'app/components/login/login.html',
                bindToController: true,
                controller: 'LoginController',
                controllerAs: 'vm',
                parent: angular.element(document.body),
                clickOutsideToClose:true,
                fullscreen: useFullScreen,
                disableParentScroll: true,
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('login');
                        return $translate.refresh();
                    }]
                }
            })
            .then(function(result) {
                console.log('Login Success');
            }), function() {
                console.log("Cancelled");
            };
        }
    }
})();
