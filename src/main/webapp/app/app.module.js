(function() {
    'use strict';

    angular
        .module('foodAppetencyApp', [
            'ngStorage',
            'tmh.dynamicLocale',
            'pascalprecht.translate',
            'ngResource',
            'ngCookies',
            'ngAria',
            'ngCacheBuster',
            'ngFileUpload',
            'ui.bootstrap',
            'ui.bootstrap.datetimepicker',
            'ui.router',
            'infinite-scroll',
            // jhipster-needle-angularjs-add-module JHipster will add new module here
            'angular-loading-bar',
            'ngAnimate',
            'ngMaterial',
            'ngMdIcons',
            'ngMaterialSidemenu'
        ])
        .config(config)
        .run(run);

    config.$inject = ['$mdIconProvider', '$mdThemingProvider'];

    run.$inject = ['stateHandler', 'translationHandler'];

    function config($mdIconProvider, $mdThemingProvider) {
        $mdIconProvider
            .defaultIconSet('./content/icons/avatars.svg',  128)
            .icon('menu', 'content/icons/menu.svg', 24)
            .icon('dashboard', 'content/icons/dashboard.svg', 18)
            .icon('close', 'content/icons/close.svg', 18)
            .icon('keyboard_arrow_down', 'content/icons/keyboard_arrow_down.svg', 18)
            .icon('chevron_right', 'content/icons/chevron_right.svg', 18);

        $mdThemingProvider.theme('default')
            .primaryPalette('red')
            .accentPalette('green')
            .backgroundPalette('grey');
    }

    function run(stateHandler, translationHandler) {
        stateHandler.initialize();
        translationHandler.initialize();
    }
})();
