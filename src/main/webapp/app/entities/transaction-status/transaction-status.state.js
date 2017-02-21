(function() {
    'use strict';

    angular
        .module('foodAppetencyApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('transaction-status', {
            parent: 'entity',
            url: '/transaction-status?page&sort&search',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'foodAppetencyApp.transactionStatus.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/transaction-status/transaction-statuses.html',
                    controller: 'TransactionStatusController',
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
                    $translatePartialLoader.addPart('transactionStatus');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('transaction-status-detail', {
            parent: 'transaction-status',
            url: '/transaction-status/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'foodAppetencyApp.transactionStatus.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/transaction-status/transaction-status-detail.html',
                    controller: 'TransactionStatusDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('transactionStatus');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'TransactionStatus', function($stateParams, TransactionStatus) {
                    return TransactionStatus.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'transaction-status',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('transaction-status-detail.edit', {
            parent: 'transaction-status-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/transaction-status/transaction-status-dialog.html',
                    controller: 'TransactionStatusDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['TransactionStatus', function(TransactionStatus) {
                            return TransactionStatus.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('transaction-status.new', {
            parent: 'transaction-status',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/transaction-status/transaction-status-dialog.html',
                    controller: 'TransactionStatusDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                transactionId: null,
                                transactionSuccess: null,
                                amount: null,
                                errorCode: null,
                                errorMessage: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('transaction-status', null, { reload: 'transaction-status' });
                }, function() {
                    $state.go('transaction-status');
                });
            }]
        })
        .state('transaction-status.edit', {
            parent: 'transaction-status',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/transaction-status/transaction-status-dialog.html',
                    controller: 'TransactionStatusDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['TransactionStatus', function(TransactionStatus) {
                            return TransactionStatus.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('transaction-status', null, { reload: 'transaction-status' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('transaction-status.delete', {
            parent: 'transaction-status',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/transaction-status/transaction-status-delete-dialog.html',
                    controller: 'TransactionStatusDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['TransactionStatus', function(TransactionStatus) {
                            return TransactionStatus.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('transaction-status', null, { reload: 'transaction-status' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
