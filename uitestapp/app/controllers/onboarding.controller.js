/*global angular*/
module.exports = (function() {
    'use strict';

    angular
        .module('onboarding')
        .controller('OnboardingController', OnboardingController);

    OnboardingController.$inject = ['$log', '_'];

    function OnboardingController($log, _) {
        var vm = this;

        $log.debug("OnboardingController: loading: ");
        activate();

        ////////////

        function activate() {
            $log.debug("OnboardingController: activate: ");
        }    
    }

})();
