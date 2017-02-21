(function() {
    'use strict';
    angular
        .module('foodAppetencyApp')
        .factory('TableQR', TableQR);

    TableQR.$inject = ['$resource'];

    function TableQR ($resource) {
        var resourceUrl =  'api/table-qrs/:id';

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
