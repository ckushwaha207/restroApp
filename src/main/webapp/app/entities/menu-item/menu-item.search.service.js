(function() {
    'use strict';

    angular
        .module('foodAppetencyApp')
        .factory('MenuItemSearch', MenuItemSearch);

    MenuItemSearch.$inject = ['$resource'];

    function MenuItemSearch($resource) {
        var resourceUrl =  'api/_search/menu-items/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
