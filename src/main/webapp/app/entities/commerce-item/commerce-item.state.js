(function() {
    'use strict';

    angular
        .module('foodAppetencyApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('commerce-item', {
            parent: 'entity',
            url: '/commerce-item?page&sort&search',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'foodAppetencyApp.commerceItem.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/commerce-item/commerce-items.html',
                    controller: 'CommerceItemController',
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
                    $translatePartialLoader.addPart('commerceItem');
                    $translatePartialLoader.addPart('itemState');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('commerce-item-detail', {
            parent: 'commerce-item',
            url: '/commerce-item/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'foodAppetencyApp.commerceItem.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/commerce-item/commerce-item-detail.html',
                    controller: 'CommerceItemDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('commerceItem');
                    $translatePartialLoader.addPart('itemState');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'CommerceItem', function($stateParams, CommerceItem) {
                    return CommerceItem.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'commerce-item',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('commerce-item-detail.edit', {
            parent: 'commerce-item-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/commerce-item/commerce-item-dialog.html',
                    controller: 'CommerceItemDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['CommerceItem', function(CommerceItem) {
                            return CommerceItem.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('commerce-item.new', {
            parent: 'commerce-item',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/commerce-item/commerce-item-dialog.html',
                    controller: 'CommerceItemDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                quantity: null,
                                state: null,
                                stateDetail: null,
                                totalPrice: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('commerce-item', null, { reload: 'commerce-item' });
                }, function() {
                    $state.go('commerce-item');
                });
            }]
        })
        .state('commerce-item.edit', {
            parent: 'commerce-item',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/commerce-item/commerce-item-dialog.html',
                    controller: 'CommerceItemDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['CommerceItem', function(CommerceItem) {
                            return CommerceItem.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('commerce-item', null, { reload: 'commerce-item' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('commerce-item.delete', {
            parent: 'commerce-item',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/commerce-item/commerce-item-delete-dialog.html',
                    controller: 'CommerceItemDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['CommerceItem', function(CommerceItem) {
                            return CommerceItem.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('commerce-item', null, { reload: 'commerce-item' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
