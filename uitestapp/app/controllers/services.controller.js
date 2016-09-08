/*global angular*/
module.exports = (function() {
    'use strict';

    angular
        .module('onboarding')
        .controller('ServicesController', ServicesController);

    ServicesController.$inject = ['$log', '_', 'stateContractId', 'services', 'approvedServices'];

    function ServicesController($log, _, stateContractId, services, approvedServices) {
        var vm = this;

        $log.debug("ServicesController: loading: ");
        activate();

        ////////////

        function activate() {
            $log.debug("ServicesController: activate: " + stateContractId);
            vm.services = services.blocks;
            vm.approvedServices = approvedServices.blocks;
        }    
    }

})();