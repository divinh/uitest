/*global angular*/
module.exports = (function() {
    'use strict';

    angular
        .module('onboarding')
        .factory('ContractModel', ContractModelFactory);
      
    ContractModelFactory.$inject = ['$log', '_'];    
    
    function ContractModelFactory($log, _) {
       

        function ContractModel(status, channel, contract, customerNr, billingAccount, contractNm, dateCreated, customerNm, lastChangedBy) {
            this.status = status;
            this.channel = channel;
            this.contract = contract;
            this.customerNr = customerNr;
            this.billingAccount = billingAccount;
            this.contractNm = contractNm;
            this.dateCreated = dateCreated;
            this.customerNm = customerNm;
            this.lastChangedBy = lastChangedBy;              
            this.editable = false;
        }
        
        ContractModel.prototype = {
            setData: function(data) {
                if (data && data.status && data.channel && data.contract && data.customerNr && data.billingAccount && data.contractNm && data.dateCreated && data.customerNm && data.lastChangedBy) {
                    angular.extend(this, data);
                }    
            }
        };
       
        ContractModel.validate = function(data) {
            return (data && data.status && data.channel && data.contract && data.customerNr && data.billingAccount && data.contractNm && data.dateCreated && data.customerNm && data.lastChangedBy);
        }
        
        ContractModel.build = function(data) {
            var model = new ContractModel(data.status, data.channel, data.contract, data.customerNr, data.billingAccount, data.contractNm, data.dateCreated, data.customerNm, data.lastChangedBy);
            return model;
        };       
        
        return ContractModel;
    }    
})();    