(function() {
    'use strict';

    angular
        .module('foodAppetencyApp')
        .factory('TransactionStatusSearch', TransactionStatusSearch);

    TransactionStatusSearch.$inject = ['$resource'];

    function TransactionStatusSearch($resource) {
        var resourceUrl =  'api/_search/transaction-statuses/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
