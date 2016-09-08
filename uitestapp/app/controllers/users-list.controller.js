/*global angular*/
module.exports = (function() {
    'use strict';

    angular
        .module('onboarding')
        .controller('UsersListController', UsersListController);

    UsersListController.$inject = ['$log', '_', '$state', 'userContractState', 'usersList'];

    function UsersListController($log, _, $state, userContractState, usersList) {
        var vm = this;
        vm.stateContract = userContractState;
        vm.userList = usersList;

        $log.debug("UsersListController: loading: ");
        activate();

        ////////////

        function activate() {
            $log.debug("UsersListController: activate: ");
            // if (!_.isEmpty(ContractsService.lists())) {
            //     vm.id = ContractsService.getSelected().id;
            //     $state.go("contracts.detail", {id: vm.id});
            // }
        }  
    }
})();