/*global angular*/
module.exports = (function() {
    'use strict';

    angular
        .module('onboarding')
        .controller('MainController', MainController);

    MainController.$inject = ['$log', '_', 'AlertService'];

    function MainController($log, _, AlertService) {
        var vm = this;
        vm.alertService = AlertService;

        $log.debug("MainController: loading: ");
        activate();

        ////////////

        function activate() {
            $log.debug("MainController: activate: ");
        }    
    }

})();