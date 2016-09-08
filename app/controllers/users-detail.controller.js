/*global angular*/
module.exports = (function() {
    'use strict';

    angular
        .module('onboarding')
        .controller('UsersDetailController', UsersDetailController);

    UsersDetailController.$inject = ['$log', '_', '$state', 'UserDetailTabsService', 'user'];

    function UsersDetailController($log, _, $state, UserDetailTabsService, user) {
        var vm = this;
        vm.tabsService = UserDetailTabsService;

        $log.debug("UsersDetailController: loading: ");
        activate();

        ////////////

        function activate() {
            $log.debug("UsersDetailController: activate: ");
            // if (!_.isEmpty(ContractsService.lists())) {
            //     vm.id = ContractsService.getSelected().id;
            //     $state.go("contracts.detail", {id: vm.id});
            // }
        }  
         
    }
})();