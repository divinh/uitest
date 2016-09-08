/*global angular*/
module.exports = (function() {
    'use strict';

    angular
        .module('onboarding')
        .service('ContractService', ContractService);
      
    ContractService.$inject = ['$log', '$q', '_', '$http'];    

    function ContractService($log, $q, _, $http) {
        this.getApproved = function(contract) {
            var req = {
             method: 'GET',
             url: '../OnboardingAPI/api/v1/approved/contracts/' + contract,
             timeout: 5000

            }

            return $http(req);
        };   

        this.get = function(contract) {
            var req = {
             method: 'GET',
             url: '../OnboardingAPI/api/v1/contracts/' + contract,
             timeout: 5000

            }

            return $http(req);
        };  

        this.getApprovedServices = function(contract) {
            var req = {
             method: 'GET',
             url: '../OnboardingAPI/api/v1/approved/contracts/' + contract + '/services',
             timeout: 5000

            }

            return $http(req);
        };   

        this.getServices = function(contract) {
            var req = {
             method: 'GET',
             url: '../OnboardingAPI/api/v1/contracts/' + contract + '/services',
             timeout: 5000

            }

            return $http(req);
        };  

        this.getApprovedCustomers = function(contract) {
            var req = {
             method: 'GET',
             url: '../OnboardingAPI/api/v1/approved/contracts/' + contract + '/customers',
             timeout: 5000

            }

            return $http(req);
        };   

        this.getCustomers = function(contract) {
            var req = {
             method: 'GET',
             url: '../OnboardingAPI/api/v1/contracts/' + contract + '/customers',
             timeout: 5000

            }

            return $http(req);
        }; 

        this.getApprovedAccounts = function(contract) {
            var req = {
             method: 'GET',
             url: '../OnboardingAPI/api/v1/approved/contracts/' + contract + '/accounts',
             timeout: 5000

            }

            return $http(req);
        };   

        this.getAccounts = function(contract) {
            var req = {
             method: 'GET',
             url: '../OnboardingAPI/api/v1/contracts/' + contract + '/accounts',
             timeout: 5000

            }

            return $http(req);
        }; 

        this.changeServices = function(contract, marketingSegment, additionalServices) {
            var req = {
             method: 'GET',
             url: '../OnboardingAPI/api/v1/contracts/' + contract + '/services/' + marketingSegment + '/' + additionalServices,
             timeout: 5000

            }

            return $http(req);
        }; 

        this.createServices = function(contract) {
            var req = {
             method: 'POST',
             url: '../OnboardingAPI/api/v1/approved/contracts/' + contract + '/services',
             timeout: 5000

            }

            return $http(req);
        }; 

        this.updateServices = function(contract, data) {
            var req = {
             method: 'PUT',
             data: data,
             url: '../OnboardingAPI/api/v1/contracts/' + contract + '/services',
             timeout: 5000

            }

            return $http(req);
        }; 

        this.updateAllServices = function(contract, marketingSegment, additionalServices) {
            var req = {
             method: 'PUT',
             url: '../OnboardingAPI/api/v1/contracts/' + contract + '/services/' + marketingSegment + '/' + additionalServices,
             timeout: 5000

            }

            return $http(req);
        }; 

        this.deleteServices = function(contract) {
            var req = {
             method: 'DELETE',
             url: '../OnboardingAPI/api/v1/contracts/' + contract,
             timeout: 5000

            }

            return $http(req);
        }; 

        this.getMenu = function(menu) {
            var req = {
             method: 'GET',
             url: '../OnboardingAPI/api/v1/menus/' + menu,
             timeout: 5000

            }

            return $http(req);
        };  

        this.getContracts = function(contract) {
            var req = {
             method: 'GET',
             url: '../OnboardingAPI/api/v1/contracts/by_contract/' + contract,
             timeout: 5000

            }

            return $http(req);
        }; 

        this.getContractsByCustomer = function(customer) {
            var req = {
             method: 'GET',
             url: '../OnboardingAPI/api/v1/contracts/by_customer/' + customer,
             timeout: 5000

            }

            return $http(req);
        };         

        this.getCustomersByAccount = function(account) {
            var req = {
             method: 'GET',
             url: '../OnboardingAPI/api/v1/customers/by_account/' + account,
             timeout: 5000

            }

            return $http(req);
        };    

        this.getCustomersAccounts = function(customer) {
            var req = {
             method: 'GET',
             url: '../OnboardingAPI/api/v1/customers/' + customer + '/accounts' ,
             timeout: 5000

            }

            return $http(req);
        };     

        this.getCustomersContract = function(customer) {
            var req = {
             method: 'GET',
             url: '../OnboardingAPI/api/v1/customers/' + customer + '/contract' ,
             timeout: 5000

            }

            return $http(req);
        }; 

        this.create = function(contract) {
            var req = {
             method: 'POST',
             data: contract,
             url: '../OnboardingAPI/api/v1/contracts',
             timeout: 5000

            }

            return $http(req);
        };        

        this.getApprovedAssignedServices = function(contract) {
            var req = {
             method: 'GET',
             url: '../OnboardingAPI/api/v1/approved/contracts/' + contract + '/services/assigned',
             timeout: 5000

            }

            return $http(req);
        };   

        this.getAssignedServices = function(contract) {
            var req = {
             method: 'GET',
             url: '../OnboardingAPI/api/v1/contracts/' + contract + '/services/assigned',
             timeout: 5000

            }

            return $http(req);
        };   

        this.getApprovedServicesAccounts = function(contract, serviceId) {
            var req = {
             method: 'GET',
             url: '../OnboardingAPI/api/v1/approved/contracts/' + contract + '/services/' + serviceId + '/accounts',
             timeout: 5000

            }

            return $http(req);
        };   

        this.getServicesAccounts = function(contract, serviceId) {
            var req = {
             method: 'GET',
             url: '../OnboardingAPI/api/v1/contracts/' + contract + '/services/' + serviceId + '/accounts',
             timeout: 5000

            }

            return $http(req);
        };   
    }
})(); 