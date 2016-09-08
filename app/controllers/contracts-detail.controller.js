/*global angular*/
module.exports = (function() {
    'use strict';

    angular
        .module('onboarding')
        .controller('ContractsDetailController', ContractsDetailController);

    ContractsDetailController.$inject = ['$log', '_', '$state', '$stateParams', 'ContractModel', 'stateContract', 'ContractDetailTabsService', 'contract', 'approvedContract'];

    function ContractsDetailController($log, _, $state, $stateParams, ContractModel, stateContract, ContractDetailTabsService, contract, approvedContract) {
        var vm = this;
        vm.tabsService = ContractDetailTabsService;

        $log.debug("ContractsDetailController: loading: ");
        activate();

        ////////////

        function activate() {
            $log.debug("ContractsDetailController: activate: " + $stateParams.id + " " + stateContract.id + " " + stateContract.isIncomplete());
            vm.contract = ContractModel.build(contract);
            vm.approvedContract = ContractModel.build(approvedContract);
        } 
    }

})();