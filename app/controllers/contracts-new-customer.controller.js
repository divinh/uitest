/*global angular*/
module.exports = (function() {
    'use strict';

    angular
        .module('onboarding')
        .controller('ContractsNewCustomerController', ContractsNewCustomerController);

    ContractsNewCustomerController.$inject = ['$log', '_', '$scope', '$state', 'DataServices', 'uiGridConstants', 'parselinkheader', 'newContractModel'];

    function ContractsNewCustomerController($log, _, $scope, $state, DataServices, uiGridConstants, parselinkheader, newContractModel) {
        var vm = this;
        vm.searchInput = "";
        vm.submit = submit;
        vm.totalItems = 50;
        vm.currentPage = 4;

        $log.debug("ContractsNewCustomerController: loading: ");
        activate();

        ////////////

        function activate() {
            $log.debug("ContractsNewCustomerController: activate: ");

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
              { name: 'customerNr', displayName: 'Customer', field: 'customerNr', width: '15%'},
              { name: 'customerNm', displayName: 'Name', field: 'customerNm', width: '30%'},
              { name: 'customerTyp', displayName: 'Type', field: 'customerTyp', width: '10%'},
              { name: 'taxId', displayName: 'Tax Id', field: 'taxId', width: '10%'},
              { name: 'city', displayName: 'City', field: 'city', width: '25%'},
              { name: 'state', displayName: 'State', field: 'state', width: '10%'}
            ];        

            vm.gridOptions.onRegisterApi = function(gridApi) {
              vm.gridApi = gridApi;
              gridApi.selection.on.rowSelectionChanged($scope,
                function(row) {
                  if (row.isSelected) {
                    newContractModel.customerNr = row.entity.customerNr;
                    newContractModel.customerNm = row.entity.customerNm;
                    vm.customerSelected = true;
                  }
                }
              );
            }     
        }

        function submit() {
            DataServices.getCustomersByAccount(vm.searchInput).then(
                function(result) {
                    var link = parselinkheader(result.headers('Link'))
                    vm.gridOptions.data = result.data;
                }
            );
        }
    }
})();