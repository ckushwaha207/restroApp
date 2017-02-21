(function() {
    'use strict';
    angular
        .module('foodAppetencyApp')
        .factory('MenuCategory', MenuCategory);

    MenuCategory.$inject = ['$resource'];

    function MenuCategory ($resource) {
        var resourceUrl =  'api/menu-categories/:id';

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
