/*global angular*/
module.exports = (function() {
    'use strict';

    angular
        .module('onboarding')
        .factory('ContractStateModel', ContractStateModelFactory);
      
    ContractStateModelFactory.$inject = ['$log', '_', 'ContractModel'];    
    
    function ContractStateModelFactory($log, _, ContractModel) {
       
        function ContractStateModel() {
            this.id = "";
            this.contracts = [];
            this.selected = false;
        }
        
        ContractStateModel.prototype = {
            setData: function(data) {
                if (data && data.id) {
                    angular.extend(this, data);
                }    
            },
            getName: function() {
                if(this.hasContracts()) {
                    if(this.isIncomplete()) {
                        return this.getIncomplete().contractNm;
                    } else if(this.isApproved()) {
                        return this.getApproved().contractNm;
                    } else {
                        return "";
                    }
                }
                else {
                    return "";
                }

            },
            isIncomplete: function() {
                var contracts = _.filter(this.getContracts(), function(c) { return (c.status === "PI-") || (c.status === "PV-") || (c.status === "PV-IN") || (c.status === "PV-RE") || (c.status === "PV-RO"); });
                return _.size(contracts) > 0 ? true : false;
            },
            isApproved: function() {
                var contracts = _.filter(this.getContracts(), function(c) { return (c.status === "PA-") || (c.status === "A1-") || (c.status === "B1-"); });
                return _.size(contracts) > 0 ? true : false;
            },
            hasContracts: function() {
                if (_.isUndefined(this.contracts)) {
                    return false;
                }    
                else {
                    return !_.isEmpty(this.getContracts());  
                }    
            },
            setContracts: function(data) {
                if (_.isUndefined(this.contracts)) {
                    this.contracts = [];
                }                  
                this.contracts = _.map(data, ContractModel.build);
            },
            getContracts: function() {
                if (_.isUndefined(this.contracts)) {
                    this.contracts = [];
                }                 
                return this.contracts;
            }, 
            clearContracts: function() {
                this.contracts = [];
            },   
            getIncomplete: function() {
                return _.find(this.getContracts(), function(c) { return (c.status === "PI-") || (c.status === "PV-") || (c.status === "PV-IN") || (c.status === "PV-RE") || (c.status === "PV-RO"); });
            },
            getApproved: function() {
                return _.find(this.getContracts(), function(c) { return (c.status === "PA-") || (c.status === "A1-") || (c.status === "B1-"); });
            },

        };
        
        ContractStateModel.validate = function(data) {
            return (data && data.id);
        }
        
        ContractStateModel.build = function(data) {
            return new ContractStateModel();
        };       
        
        return ContractStateModel;
    }    
})();   