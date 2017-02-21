(function() {
    'use strict';
    angular
        .module('foodAppetencyApp')
        .factory('CommerceItem', CommerceItem);

    CommerceItem.$inject = ['$resource'];

    function CommerceItem ($resource) {
        var resourceUrl =  'api/commerce-items/:id';

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
