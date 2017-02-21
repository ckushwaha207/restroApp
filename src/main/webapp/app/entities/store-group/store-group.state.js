(function() {
    'use strict';

    angular
        .module('foodAppetencyApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('store-group', {
            parent: 'entity',
            url: '/store-group?page&sort&search',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'foodAppetencyApp.storeGroup.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/store-group/store-groups.html',
                    controller: 'StoreGroupController',
                    controllerAs: 'vm'
                }
            },
            params: {
                page: {
                    value: '1',
                    squash: true
                },
                sort: {
                    value: 'id,asc',
                    squash: true
                },
                search: null
            },
            resolve: {
                pagingParams: ['$stateParams', 'PaginationUtil', function ($stateParams, PaginationUtil) {
                    return {
                        page: PaginationUtil.parsePage($stateParams.page),
                        sort: $stateParams.sort,
                        predicate: PaginationUtil.parsePredicate($stateParams.sort),
                        ascending: PaginationUtil.parseAscending($stateParams.sort),
                        search: $stateParams.search
                    };
                }],
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('storeGroup');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('store-group-detail', {
            parent: 'store-group',
            url: '/store-group/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'foodAppetencyApp.storeGroup.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/store-group/store-group-detail.html',
                    controller: 'StoreGroupDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('storeGroup');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'StoreGroup', function($stateParams, StoreGroup) {
                    return StoreGroup.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'store-group',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('store-group-detail.edit', {
            parent: 'store-group-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/store-group/store-group-dialog.html',
                    controller: 'StoreGroupDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['StoreGroup', function(StoreGroup) {
                            return StoreGroup.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('store-group.new', {
            parent: 'store-group',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/store-group/store-group-dialog.html',
                    controller: 'StoreGroupDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                name: null,
                                siteUrl: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('store-group', null, { reload: 'store-group' });
                }, function() {
                    $state.go('store-group');
                });
            }]
        })
        .state('store-group.edit', {
            parent: 'store-group',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/store-group/store-group-dialog.html',
                    controller: 'StoreGroupDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['StoreGroup', function(StoreGroup) {
                            return StoreGroup.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('store-group', null, { reload: 'store-group' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('store-group.delete', {
            parent: 'store-group',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/store-group/store-group-delete-dialog.html',
                    controller: 'StoreGroupDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['StoreGroup', function(StoreGroup) {
                            return StoreGroup.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('store-group', null, { reload: 'store-group' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
