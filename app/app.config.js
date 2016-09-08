/*global angular*/
module.exports = (function() {
    'use strict';
    
    angular
        .module('onboarding')
        .config(Config);
        
    Config.$inject = ['$logProvider'];  

    function Config($logProvider) {
        $logProvider.debugEnabled(true);
    }            
})();