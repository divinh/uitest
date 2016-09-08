/*global angular*/
module.exports = (function() {
    'use strict';

    angular
        .module('onboarding')
        .controller('ActivityController', ActivityController);

    ActivityController.$inject = ['$log', '_'];

    function ActivityController($log, _) {
        var vm = this;

        $log.debug("ActivityController: loading: ");
        activate();

        ////////////

        function activate() {
            $log.debug("ActivityController: activate: ");
        }    
    }

})();