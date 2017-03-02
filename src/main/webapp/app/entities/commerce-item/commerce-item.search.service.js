(function() {
    'use strict';

    angular
        .module('foodAppetencyApp')
        .factory('CommerceItemSearch', CommerceItemSearch);

    CommerceItemSearch.$inject = ['$resource'];

    function CommerceItemSearch($resource) {
        var resourceUrl =  'api/_search/commerce-items/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
