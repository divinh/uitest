/*global angular*/
module.exports = (function() {
    'use strict';

    angular
        .module('onboarding')
        .service('ContractDetailTabsService', ContractDetailTabsService);
      
    ContractDetailTabsService.$inject = ['$log', '_'];    

    function ContractDetailTabsService($log, _) {
        var tabs = [
            {id: "1", description: "Services", state: "contracts.detail.services", disabled: false},
            {id: "2", description: "Customer Access", state: "contracts.detail.customers", disabled: false},
            {id: "3", description: "Account Access", state: "contracts.detail.accounts", disabled: false},
            {id: "4", description: "Entitilements", state: "contracts.detail.serviceaccounts", disabled: false},
        ];        
        this.lists = function() {
            return tabs;
        };
        this.remove = function(index) {
            tabs.splice(index, 1);
        };
        this.clear = function() {
            tabs = [];
        };
        this.add = function(tab) {
            var found = false;
            _.forEach(tabs, function(t) {
                if(t.id === tab.id) {
                    found = true;
                    return false;
                }
            });
            if (!found) {
                tabs.push(tab);
            }    
        };
        this.get = function(id) {
            return _.find(tabs, 'id', id);
        };
        this.select = function(id) {
            _.forEach(tabs, function(t) {
                if(t.id === id) {
                    t.selected = true;
                }
                else {
                    t.selected = false;
                }
            });            
        };
        this.getSelected = function() {
            return _.find(tabs, 'selected', true);
        };
        this.disable = function(id) {
            _.find(tabs, 'id', id).disabled = true;
        };        
        this.enable = function(id) {
            _.find(tabs, 'id', id).disabled = false;
        };        

    }
})(); 