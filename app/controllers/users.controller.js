/*global angular*/
module.exports = (function() {
    'use strict';

    angular
        .module('onboarding')
        .controller('UsersController', UsersController);

    UsersController.$inject = ['$log', '_', '$state', '$modal', 'ContractsService'];

    function UsersController($log, _, $state, $modal, ContractsService) {
        var vm = this;
        vm.contractsService = ContractsService;
        vm.id = "";
        vm.openCustomerContractsModal = openCustomerContractsModal;

        $log.debug("UsersController: loading: ");
        activate();

        ////////////

        function activate() {
            $log.debug("UsersController: activate: ");
            if (!_.isEmpty(ContractsService.lists())) {
                vm.id = ContractsService.getSelected().id;
                $state.go("users.list", {id: vm.id});
            }
        }  

        function openCustomerContractsModal() {
            $log.debug("UsersController: openCustomerContractsModal: ");
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
                    $state.go("users.list", {id: vm.id});
                }, 
                function () {
                    $log.info('Modal dismissed at: ' + new Date());
                }
            );             
        }
    }
})();