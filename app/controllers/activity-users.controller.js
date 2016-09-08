/*global angular*/
module.exports = (function() {
    'use strict';

    angular
        .module('onboarding')
        .controller('ActivityUsersController', ActivityUsersController);

    ActivityUsersController.$inject = ['$log', '_'];

    function ActivityUsersController($log, _) {
        var vm = this;

        $log.debug("ActivityUsersController: loading: ");
        activate();

        ////////////

        function activate() {
            $log.debug("ActivityUsersController: activate: ");
        }    
    }

})();