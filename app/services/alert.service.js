/*global angular*/
module.exports = (function() {
    'use strict';

    angular
        .module('onboarding')
        .service('AlertService', AlertService);
      
    AlertService.$inject = ['$log', '_'];    

    function AlertService($log, _) {
        var alerts = [];
        this.lists = function() {
            return alerts;
        };
        this.remove = function(index) {
            alerts.splice(index, 1);
        };
        this.clear = function() {
            alerts = [];
        };
        this.add = function(alert) {
            alerts.push(alert);
        };
    }
})(); 