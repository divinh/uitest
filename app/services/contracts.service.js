/*global angular*/
module.exports = (function() {
    'use strict';

    angular
        .module('onboarding')
        .service('ContractsService', ContractsService);
      
    ContractsService.$inject = ['$log', '_', 'ContractStateModel'];    

    function ContractsService($log, _, ContractStateModel) {
        var contracts = [];
        this.lists = function() {
            return contracts;
        };
        this.remove = function(index) {
            contracts.splice(index, 1);
        };
        this.clear = function() {
            contracts = [];
        };
        this.add = function(contract) {
            var found = false;
            _.forEach(contracts, function(c) {
                if(c.id === contract.id) {
                    found = true;
                    return false;
                }
            });
            if (!found) {
                contracts.push(contract);
            }    
        };
        this.get = function(id) {
            return _.find(contracts, 'id', id);
        };
        this.select = function(id) {
            _.forEach(contracts, function(c) {
                if(c.id === id) {
                    c.selected = true;
                }
                else {
                    c.selected = false;
                }
            });            
        };
        this.getSelected = function() {
            return _.find(contracts, 'selected', true);
        };

    }
})(); 