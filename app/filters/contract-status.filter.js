/*global angular*/
module.exports = (function() {
    'use strict';

    angular
        .module('onboarding')
        .filter('ContractStatusFilter', ContractStatusFilter);

    function ContractStatusFilter() {
        var statusHash = {
            'PI-': 'Incomplete',
            'PV-': 'Send for Approval',
            'PV-IN': 'Sending for Approval',
            'PV-RE': 'Send for Approval Rejected',
            'PV-RO': 'Send for Approval Completed',
            'PA-': 'Approved',
            'A1-': 'In Use',
            'B1-': 'Blocked'
        };

        return function(input) {
            if (!input){
                return '';
            } else {
                return statusHash[input];
            }
        };      
    }
    
})();