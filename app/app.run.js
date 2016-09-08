/*global angular*/
module.exports = (function() {
    'use strict';
    
    angular
        .module('onboarding')
        .run(StateRef);
        
    StateRef.$inject = ['$rootScope', '$state', '$stateParams']; 

    function StateRef($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;        
    }            
})();
