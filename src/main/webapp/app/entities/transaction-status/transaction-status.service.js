(function() {
    'use strict';
    angular
        .module('foodAppetencyApp')
        .factory('TransactionStatus', TransactionStatus);

    TransactionStatus.$inject = ['$resource'];

    function TransactionStatus ($resource) {
        var resourceUrl =  'api/transaction-statuses/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
