/*global angular*/
module.exports = (function() {
    'use strict';

    angular
        .module('onboarding')
        .controller('CustomersController', CustomersController);

    CustomersController.$inject = ['$log', '_', 'stateContractId', 'customers', 'approvedCustomers'];

    function CustomersController($log, _, stateContractId, customers, approvedCustomers) {
        var vm = this;

        $log.debug("CustomersController: loading: ");
        activate();

        ////////////

        function activate() {
            $log.debug("CustomersController: activate: ");
            vm.customers = customers;
            vm.approvedCustomers = approvedCustomers;
        }    
    }

})();