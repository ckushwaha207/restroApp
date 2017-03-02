(function() {
    'use strict';
    angular
        .module('foodAppetencyApp')
        .factory('StoreGroup', StoreGroup);

    StoreGroup.$inject = ['$resource'];

    function StoreGroup ($resource) {
        var resourceUrl =  'api/store-groups/:id';

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
