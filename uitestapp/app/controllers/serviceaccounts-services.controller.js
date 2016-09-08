/*global angular*/
module.exports = (function() {
    'use strict';

    angular
        .module('onboarding')
        .controller('ServiceAccountsServicesController', ServiceAccountsServicesController);

    ServiceAccountsServicesController.$inject = ['$log', '_', 'services', 'approvedServices'];

    function ServiceAccountsServicesController($log, _, services, approvedServices) {
        var vm = this;

        $log.debug("ServiceAccountsServicesController: loading: ");
        activate();

        ////////////

        function activate() {
            $log.debug("ServiceAccountsServicesController: activate: ");
            vm.services = services.blocks;
            vm.approvedServices = approvedServices.blocks;
        }    
    }

})();