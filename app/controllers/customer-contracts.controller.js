/*global angular*/
module.exports = (function() {
    'use strict';

    angular
        .module('onboarding')
        .controller('CustomerContractsController', CustomerContractsController);

    CustomerContractsController.$inject = ['$log', '_', '$scope', '$modalInstance', 'DataServices', 'uiGridConstants', 'parselinkheader'];

    function CustomerContractsController($log, _, $scope, $modalInstance, DataServices, uiGridConstants, parselinkheader) {
        var vm = this;
        vm.ok = ok;
        vm.cancel = cancel;
        vm.submit = submit;
        vm.selectedContract = "";
        vm.contractSelected = false;
        vm.id = "";
        vm.totalItems = 50;
        vm.currentPage = 4;

        $log.debug("CustomerContractsController: loading: ");
        activate();

        ////////////

        function activate() {
            $log.debug("CustomerContractsController: activate: ");
            vm.gridOptions = {
              enableSorting: false,
              enableColumnMenus: false,
              enableRowSelection: true,
              multiSelect: false,
              noUnselect: true,
              enableRowHeaderSelection: false, 
              enableSelectAll: false,
              enableFullRowSelection: true,
              showGridFooter: false,
              enableHorizontalScrollbar:  uiGridConstants.scrollbars.NEVER
            };
            
            vm.gridOptions.columnDefs = [
              { name: 'contract', displayName: 'Contract', field: 'contract', width: '10%'},
              { name: 'contractNm', displayName: 'Name', field: 'contractNm', width: '30%'},
              { name: 'status', displayName: 'Status', field: 'status', cellFilter: 'ContractStatusFilter', width: '30%'},
              { name: 'lastChangedBy', displayName: 'Changed By', field: 'lastChangedBy', width: '15%'},
              { name: 'dateCreated', displayName: 'Create Date', field: 'dateCreated', cellTemplate: '<span am-time-ago="row.entity.dateCreated"></span>', width: '15%'}
            ];        

            vm.gridOptions.onRegisterApi = function(gridApi) {
              vm.gridApi = gridApi;
              gridApi.selection.on.rowSelectionChanged($scope,
                function(row) {
                  if (row.isSelected) {
                    vm.selectedContract = row.entity.contract;
                    vm.contractSelected = true;
                  }
                }
              );
            }            
        } 

        function ok() {
            $modalInstance.close(vm.selectedContract);
        };

        function cancel() {
            $modalInstance.dismiss('cancel');
        };        

        function submit() {
            DataServices.getContractsByCustomer(vm.id).then(
                function(result) {
                    var link = parselinkheader(result.headers('Link'))
                    $log.debug("link header: " + result.headers('link'));
                    $log.debug("link header: " + parselinkheader(result.headers('Link')));
                    $log.debug("link header: " + link.next.pagination);
                    vm.gridOptions.data = result.data;
                }
            );
        }
    }
})();