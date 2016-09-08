/*global angular*/
module.exports = (function() {
    'use strict';

    angular
        .module('onboarding')
        .controller('ContractsNewBillingaccountController', ContractsNewBillingaccountController);

    ContractsNewBillingaccountController.$inject = ['$log', '_', '$scope', '$state', 'DataServices', 'uiGridConstants', 'parselinkheader', 'newContractModel', 'billingAccounts', 'defaultContractModel'];

    function ContractsNewBillingaccountController($log, _, $scope, $state, DataServices, uiGridConstants, parselinkheader, newContractModel, billingAccounts, defaultContractModel) {
        var vm = this;
        vm.totalItems = 50;
        vm.currentPage = 4;

        $log.debug("ContractsNewBillingaccountController: loading: ");
        activate();

        ////////////

        function activate() {
            $log.debug("ContractsNewBillingaccountController: activate: ");
            angular.extend(newContractModel, defaultContractModel.data);

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
              { name: 'accountNr', displayName: 'Account', field: 'accountNr', width: '20%'},
              { name: 'accountNm', displayName: 'Name', field: 'accountNm', width: '50%'},
              { name: 'accountTyp', displayName: 'Type', field: 'accountTyp', width: '10%'},
              { name: 'productTyp', displayName: 'Product', field: 'productTyp', width: '10%'},
              { name: 'subProductTyp', displayName: 'Sub Product', field: 'subProductTyp', width: '10%'}
            ];        

            vm.gridOptions.onRegisterApi = function(gridApi) {
              vm.gridApi = gridApi;
              gridApi.selection.on.rowSelectionChanged($scope,
                function(row) {
                  if (row.isSelected) {
                    newContractModel.billingAccount = row.entity.accountNr;
                    vm.accountSelected = true;
                  }
                }
              );
            } 

            vm.gridOptions.data = billingAccounts.data;
        }
    }
})();