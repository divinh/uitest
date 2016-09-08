/*global angular*/
module.exports = (function() {
    'use strict';

    angular
        .module('onboarding')
        .controller('UsersMfaController', UsersMfaController);

    UsersMfaController.$inject = ['$log', '_'];

    function UsersMfaController($log, _) {
        var vm = this;

        $log.debug("UsersMfaController: loading: ");
        activate();

        ////////////

        function activate() {
            $log.debug("UsersMfaController: activate: ");
        }    
    }

})();