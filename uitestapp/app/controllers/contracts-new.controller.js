/*global angular*/
module.exports = (function() {
    'use strict';

    angular
        .module('onboarding')
        .controller('ContractsNewController', ContractsNewController);

    ContractsNewController.$inject = ['$log', '_', '$state', 'DataServices', 'newContractModel'];

    function ContractsNewController($log, _, $state, DataServices, newContractModel) {
        var vm = this;
        vm.contract = newContractModel;
        vm.processForm = processForm;

        $log.debug("ContractsNewController: loading: ");
        activate();

        ////////////

        function activate() {
            $log.debug("ContractsNewController: activate: ");
            $state.go("contracts.new.customer");
        }

        function processForm() {
            $log.debug("ContractsNewController: processForm: ");
            DataServices.create(vm.contract).then(
                function(result) {
                    $state.go("contracts.detail", {id: vm.contract.contract});
                }
            );            
            
        }  
    }
})();