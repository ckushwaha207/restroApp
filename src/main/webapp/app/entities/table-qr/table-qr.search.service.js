(function() {
    'use strict';

    angular
        .module('foodAppetencyApp')
        .factory('TableQRSearch', TableQRSearch);

    TableQRSearch.$inject = ['$resource'];

    function TableQRSearch($resource) {
        var resourceUrl =  'api/_search/table-qrs/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
