/*global angular Block Service*/
module.exports = (function() {
    'use strict';

    angular
        .module('onboarding')
        .factory('DataServices', DataServices);
      
    DataServices.$inject = ['$log', '$q', '_', 'AlertService', 'ContractsService', 'ContractService', '$cacheFactory', 'ContractStateModel'];    
    
    function DataServices($log, $q, _, AlertService, ContractsService, ContractService, $cacheFactory, ContractStateModel) {
        $log.debug("DataServices: constructed: ");
        var contractServiceCache = $cacheFactory("contractServiceCache");

        var factory = {
            loadContracts: loadContracts,
            getContract: getContract,
            getApprovedContract: getApprovedContract,
            getServices: getServices,
            getApprovedServices: getApprovedServices,
            getContractsByCustomer: getContractsByCustomer,
            getCustomersByAccount: getCustomersByAccount,
            getCustomersAccounts: getCustomersAccounts,
            getCustomersContract: getCustomersContract,
            getCustomers: getCustomers,
            getApprovedCustomers: getApprovedCustomers,
            getAccounts: getAccounts,
            getApprovedAccounts: getApprovedAccounts,
            getAssignedServices: getAssignedServices,
            getApprovedAssignedServices: getApprovedAssignedServices,
            getServicesAccounts: getServicesAccounts,
            getApprovedServicesAccounts: getApprovedServicesAccounts,
            create: create                        
        };
    
        return factory;

        function loadContracts(id) {    
            var deferred = $q.defer();
            AlertService.clear();

            ContractService.getContracts(id).then(
                function(result) {
                    var contract = new ContractStateModel();
                    contract.id = id;
                    contract.setContracts(result.data); 
                    ContractsService.add(contract);
                    ContractsService.select(contract.id);
                    deferred.resolve(contract);                          
                },
                function(error) {
                    AlertService.add({type: 'danger', msg: error.data.message});
                    deferred.reject(error);
                }
            );                      
            return deferred.promise;
        }

        function getContract(id) {    
            var deferred = $q.defer();
            AlertService.clear();

            ContractService.get(id).then(
                function(result) {
                    deferred.resolve(result.data);                          
                },
                function(error) {
                    AlertService.add({type: 'danger', msg: error.data.message});
                    deferred.reject(error.data);
                }
            );                      
            return deferred.promise;
        } 

        function getApprovedContract(id) {    
            var deferred = $q.defer();
            AlertService.clear();

            ContractService.getApproved(id).then(
                function(result) {
                    deferred.resolve(result.data);                          
                },
                function(error) {
                    AlertService.add({type: 'danger', msg: error.data.message});
                    deferred.reject(error.data);
                }
            );                      
            return deferred.promise;
        }  

        function getServices(id) {    
            var deferred = $q.defer();
            AlertService.clear();

            ContractService.getServices(id).then(
                function(result) {
                    deferred.resolve(result.data);                          
                },
                function(error) {
                    AlertService.add({type: 'danger', msg: error.data.message});
                    deferred.reject(error.data);
                }
            );                      
            return deferred.promise;
        } 

        function getApprovedServices(id) {    
            var deferred = $q.defer();
            AlertService.clear();

            ContractService.getApprovedServices(id).then(
                function(result) {
                    deferred.resolve(result.data);                          
                },
                function(error) {
                    AlertService.add({type: 'danger', msg: error.data.message});
                    deferred.reject(error.data);
                }
            );                      
            return deferred.promise;
        }         

        function getContractsByCustomer(id) {    
            var deferred = $q.defer();
            AlertService.clear();

            ContractService.getContractsByCustomer(id).then(
                function(result) {
                    deferred.resolve(result);                          
                },
                function(error) {
                    AlertService.add({type: 'danger', msg: error.data.message});
                    deferred.reject(error.data);
                }
            );                      
            return deferred.promise;
        }      

        function getCustomersByAccount(account) {    
            var deferred = $q.defer();
            AlertService.clear();

            ContractService.getCustomersByAccount(account).then(
                function(result) {
                    deferred.resolve(result);                          
                },
                function(error) {
                    AlertService.add({type: 'danger', msg: error.data.message});
                    deferred.reject(error.data);
                }
            );                      
            return deferred.promise;
        } 

        function getCustomersAccounts(id) {    
            var deferred = $q.defer();
            AlertService.clear();

            ContractService.getCustomersAccounts(id).then(
                function(result) {
                    deferred.resolve(result);                          
                },
                function(error) {
                    AlertService.add({type: 'danger', msg: error.data.message});
                    deferred.reject(error.data);
                }
            );                      
            return deferred.promise;
        }

        function getCustomersContract(id) {    
            var deferred = $q.defer();
            AlertService.clear();

            ContractService.getCustomersContract(id).then(
                function(result) {
                    deferred.resolve(result);                          
                },
                function(error) {
                    AlertService.add({type: 'danger', msg: error.data.message});
                    deferred.reject(error.data);
                }
            );                      
            return deferred.promise;
        }

        function getCustomers(id) {    
            var deferred = $q.defer();
            AlertService.clear();

            ContractService.getCustomers(id).then(
                function(result) {
                    deferred.resolve(result.data);                          
                },
                function(error) {
                    AlertService.add({type: 'danger', msg: error.data.message});
                    deferred.reject(error.data);
                }
            );                      
            return deferred.promise;
        } 

        function getApprovedCustomers(id) {    
            var deferred = $q.defer();
            AlertService.clear();

            ContractService.getApprovedCustomers(id).then(
                function(result) {
                    deferred.resolve(result.data);                          
                },
                function(error) {
                    AlertService.add({type: 'danger', msg: error.data.message});
                    deferred.reject(error.data);
                }
            );                      
            return deferred.promise;
        }    

        function getAccounts(id) {    
            var deferred = $q.defer();
            AlertService.clear();

            ContractService.getAccounts(id).then(
                function(result) {
                    deferred.resolve(result.data);                          
                },
                function(error) {
                    AlertService.add({type: 'danger', msg: error.data.message});
                    deferred.reject(error.data);
                }
            );                      
            return deferred.promise;
        } 

        function getApprovedAccounts(id) {    
            var deferred = $q.defer();
            AlertService.clear();

            ContractService.getApprovedAccounts(id).then(
                function(result) {
                    deferred.resolve(result.data);                          
                },
                function(error) {
                    AlertService.add({type: 'danger', msg: error.data.message});
                    deferred.reject(error.data);
                }
            );                      
            return deferred.promise;
        }     


        function create(contract) {
            AlertService.clear();
            var deferred = $q.defer();
            ContractService.create(contract).then(
                function (result) {
                    contract.contract = result.data.contract;
                    AlertService.add({type: 'success', msg: 'Create was successful'})                 
                    deferred.resolve(result);    
                },
                function(error) {
                    AlertService.add({type: 'danger', msg: error.data.message});
                    deferred.reject(error);
                }
            );          
            return deferred.promise;
        }


        function getAssignedServices(id) {    
            var deferred = $q.defer();
            AlertService.clear();

            ContractService.getAssignedServices(id).then(
                function(result) {
                    deferred.resolve(result.data);                          
                },
                function(error) {
                    AlertService.add({type: 'danger', msg: error.data.message});
                    deferred.reject(error.data);
                }
            );                      
            return deferred.promise;
        } 

        function getApprovedAssignedServices(id) {    
            var deferred = $q.defer();
            AlertService.clear();

            ContractService.getApprovedAssignedServices(id).then(
                function(result) {
                    deferred.resolve(result.data);                          
                },
                function(error) {
                    AlertService.add({type: 'danger', msg: error.data.message});
                    deferred.reject(error.data);
                }
            );                      
            return deferred.promise;
        }     


        function getServicesAccounts(id, serviceId) {    
            var deferred = $q.defer();
            AlertService.clear();

            ContractService.getServicesAccounts(id, serviceId).then(
                function(result) {
                    deferred.resolve(result.data);                          
                },
                function(error) {
                    AlertService.add({type: 'danger', msg: error.data.message});
                    deferred.reject(error.data);
                }
            );                      
            return deferred.promise;
        } 

        function getApprovedServicesAccounts(id, serviceId) {    
            var deferred = $q.defer();
            AlertService.clear();

            ContractService.getApprovedServicesAccounts(id, serviceId).then(
                function(result) {
                    deferred.resolve(result.data);                          
                },
                function(error) {
                    AlertService.add({type: 'danger', msg: error.data.message});
                    deferred.reject(error.data);
                }
            );                      
            return deferred.promise;
        }  
    }    
})();