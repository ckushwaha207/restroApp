(function() {
    'use strict';
    angular
        .module('foodAppetencyApp')
        .factory('DiningTable', DiningTable);

    DiningTable.$inject = ['$resource'];

    function DiningTable ($resource) {
        var resourceUrl =  'api/dining-tables/:id';

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
