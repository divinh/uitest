/*global angular*/
module.exports = (function() {
    'use strict';

    angular
        .module('onboarding')
        .controller('ServiceAccountsController', ServiceAccountsController);

    ServiceAccountsController.$inject = ['$log', '_', 'accounts', 'approvedAccounts'];

    function ServiceAccountsController($log, _, accounts, approvedAccounts) {
        var vm = this;

        $log.debug("ServiceAccountsController: loading: ");
        activate();

        ////////////

        function activate() {
            $log.debug("ServiceAccountsController: activate: ");
            vm.accounts = accounts.serviceAccounts;
            vm.approvedAccounts = approvedAccounts.serviceAccounts;
        }    
    }

})();