(function() {
    'use strict';
    angular
        .module('foodAppetencyApp')
        .factory('BusinessUser', BusinessUser);

    BusinessUser.$inject = ['$resource'];

    function BusinessUser ($resource) {
        var resourceUrl =  'api/business-users/:id';

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
