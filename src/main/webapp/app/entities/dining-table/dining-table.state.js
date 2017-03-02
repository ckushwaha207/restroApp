(function() {
    'use strict';

    angular
        .module('foodAppetencyApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('dining-table', {
            parent: 'entity',
            url: '/dining-table?page&sort&search',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'foodAppetencyApp.diningTable.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/dining-table/dining-tables.html',
                    controller: 'DiningTableController',
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
                    $translatePartialLoader.addPart('diningTable');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('dining-table-detail', {
            parent: 'dining-table',
            url: '/dining-table/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'foodAppetencyApp.diningTable.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/dining-table/dining-table-detail.html',
                    controller: 'DiningTableDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('diningTable');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'DiningTable', function($stateParams, DiningTable) {
                    return DiningTable.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'dining-table',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('dining-table-detail.edit', {
            parent: 'dining-table-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/dining-table/dining-table-dialog.html',
                    controller: 'DiningTableDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['DiningTable', function(DiningTable) {
                            return DiningTable.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('dining-table.new', {
            parent: 'dining-table',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/dining-table/dining-table-dialog.html',
                    controller: 'DiningTableDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                number: null,
                                code: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('dining-table', null, { reload: 'dining-table' });
                }, function() {
                    $state.go('dining-table');
                });
            }]
        })
        .state('dining-table.edit', {
            parent: 'dining-table',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/dining-table/dining-table-dialog.html',
                    controller: 'DiningTableDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['DiningTable', function(DiningTable) {
                            return DiningTable.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('dining-table', null, { reload: 'dining-table' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('dining-table.delete', {
            parent: 'dining-table',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/dining-table/dining-table-delete-dialog.html',
                    controller: 'DiningTableDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['DiningTable', function(DiningTable) {
                            return DiningTable.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('dining-table', null, { reload: 'dining-table' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
