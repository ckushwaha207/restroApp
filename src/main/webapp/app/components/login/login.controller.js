(function() {
    'use strict';

    angular
        .module('foodAppetencyApp')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$rootScope', '$state', '$timeout', 'Auth', '$mdDialog'];

    function LoginController ($rootScope, $state, $timeout, Auth, $mdDialog) {
        var vm = this;

        vm.authenticationError = false;
        vm.credentials = {};
        vm.password = null;
        vm.rememberMe = true;
        vm.username = null;
        vm.cancel = cancel;
        vm.login = login;
        vm.register = register;
        vm.hide = hide;
        vm.close = close;
        vm.requestResetPassword = requestResetPassword;

        $timeout(function (){angular.element('#username').focus();});

        function cancel () {
            vm.credentials = {
                username: null,
                password: null,
                rememberMe: true
            };
            vm.authenticationError = false;
            $mdDialog.cancel();
        }

        function hide() {
            $mdDialog.hide();
        }

        function login () {
            Auth.login({
                username: vm.username,
                password: vm.password,
                rememberMe: vm.rememberMe
            }).then(function () {
                vm.authenticationError = false;
                vm.hide();

                if ($state.current.name === 'register' || $state.current.name === 'activate' ||
                    $state.current.name === 'finishReset' || $state.current.name === 'requestReset') {
                    $state.go('home');
                }

                $rootScope.$broadcast('authenticationSuccess');

                // previousState was set in the authExpiredInterceptor before being redirected to login modal.
                // since login is successful, go to stored previousState and clear previousState
                if (Auth.getPreviousState()) {
                    var previousState = Auth.getPreviousState();
                    Auth.resetPreviousState();
                    $state.go(previousState.name, previousState.params);
                }
            }).catch(function () {
                vm.authenticationError = true;
            });
        }

        function register () {
           $mdDialog.cancel();
            $state.go('register');
        }

        function requestResetPassword () {
            $mdDialog.cancel();
            $state.go('requestReset');
        }
    }
})();
