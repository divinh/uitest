/*global angular*/
module.exports = (function() {
    'use strict';

    angular
        .module('onboarding')
        .controller('UsersServiceaccountsController', UsersServiceaccountsController);

    UsersServiceaccountsController.$inject = ['$log', '_'];

    function UsersServiceaccountsController($log, _) {
        var vm = this;

        $log.debug("UsersServiceaccountsController: loading: ");
        activate();

        ////////////

        function activate() {
            $log.debug("UsersServiceaccountsController: activate: ");
        }    
    }

})();