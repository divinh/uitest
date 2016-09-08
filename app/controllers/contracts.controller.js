/*global angular*/
module.exports = (function() {
    'use strict';

    angular
        .module('onboarding')
        .controller('ContractsController', ContractsController);

    ContractsController.$inject = ['$log', '_', '$state', '$modal', 'ContractsService'];

    function ContractsController($log, _, $state, $modal, ContractsService) {
        var vm = this;
        vm.contractsService = ContractsService;
        vm.id = "";
        vm.openCustomerContractsModal = openCustomerContractsModal;

        $log.debug("ContractsController: loading: ");
        activate();

        ////////////

        function activate() {
            $log.debug("ContractsController: activate: ");
            if (!_.isEmpty(ContractsService.lists())) {
                vm.id = ContractsService.getSelected().id;
                $state.go("contracts.detail", {id: vm.id});
            }
        }  

        function openCustomerContractsModal() {
            $log.debug("ContractsController: openCustomerContractsModal: ");
            var modalInstance = $modal.open(
                {
                    animation: true,
                    templateUrl: 'customer-contracts.html',
                    controller: 'CustomerContractsController',
                    controllerAs: 'customerContractsVm',
                    size: 'lg'    
                }
            );

            modalInstance.result.then(
                function (selectedItem) {
                    vm.id = selectedItem;
                    $state.go("contracts.detail", {id: vm.id});
                }, 
                function () {
                    $log.info('Modal dismissed at: ' + new Date());
                }
            );             
        }
    }
})();