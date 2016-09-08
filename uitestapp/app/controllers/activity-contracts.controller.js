/*global angular*/
module.exports = (function() {
    'use strict';

    angular
        .module('onboarding')
        .controller('ActivityContractsController', ActivityContractsController);

    ActivityContractsController.$inject = ['$log', '_'];

    function ActivityContractsController($log, _) {
        var vm = this;

        $log.debug("ActivityContractsController: loading: ");
        activate();

        ////////////

        function activate() {
            $log.debug("ActivityContractsController: activate: ");
        }    
    }

})();