/*global angular*/
module.exports = (function() {
    'use strict';

    angular
        .module('onboarding')
        .controller('AccountsController', AccountsController);

    AccountsController.$inject = ['$log', '_', 'stateContractId', 'accounts', 'approvedAccounts'];

    function AccountsController($log, _, stateContractId, accounts, approvedAccounts) {
        var vm = this;

        $log.debug("AccountsController: loading: ");
        activate();

        ////////////

        function activate() {
            $log.debug("AccountsController: activate: ");
            vm.accounts = accounts;
            vm.approvedAccounts = approvedAccounts;
        }    
    }

})();