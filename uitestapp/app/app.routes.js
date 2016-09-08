 /*global angular*/
module.exports = (function() {
    'use strict';
    
    angular
        .module('onboarding')
        .config(Routes);
        
    Routes.$inject = ['$stateProvider', '$urlRouterProvider'];  

    function Routes($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/activity/contracts');
        
        $stateProvider
            .state('onboarding', {
                url: '/',
                templateUrl: 'onboarding.html',
                controller: 'OnboardingController',
                controllerAs: 'onboardingVm'    
            })   
            .state('activity', {
                url: '/activity',
                templateUrl: 'activity.html',
                controller: 'ActivityController',
                controllerAs: 'activityVm'    
            })    
            .state('activity.contracts', {
                url: '/contracts',
                templateUrl: 'activity-contracts.html',
                controller: 'ActivityContractsController',
                controllerAs: 'activityContractsVm'    
            })  
            .state('activity.users', {
                url: '/users',
                templateUrl: 'activity-users.html',
                controller: 'ActivityUsersController',
                controllerAs: 'activityUsersVm'    
            })                                    
            .state('contracts', {
                url: '/contracts',
                templateUrl: 'contracts.html',
                controller: 'ContractsController',
                controllerAs: 'contractsVm'    
            })
            .state('contracts.new', {
                url: '/new',
                templateUrl: 'contracts-new.html',
                controller: 'ContractsNewController',
                controllerAs: 'contractsNewVm',
                resolve: {
                    newContractModel: ['$stateParams', function($stateParams) {
                        return {};
                    }]
                }    
            })      
            .state('contracts.new.customer', {
                url: '/customer',
                templateUrl: 'contracts-new-customer.html',
                controller: 'ContractsNewCustomerController',
                controllerAs: 'contractsNewCustomerVm' 
            })      
            .state('contracts.new.billingaccount', {
                url: '/billing_account',
                templateUrl: 'contracts-new-billingaccount.html',
                controller: 'ContractsNewBillingaccountController',
                controllerAs: 'contractsNewBillingaccountVm',
                resolve: {
                    billingAccounts: ['$stateParams', 'newContractModel', 'DataServices', function($stateParams, newContractModel, DataServices) {
                        return DataServices.getCustomersAccounts(newContractModel.customerNr);
                    }],
                    defaultContractModel: ['$stateParams', 'newContractModel', 'DataServices', function($stateParams, newContractModel, DataServices) {
                        return DataServices.getCustomersContract(newContractModel.customerNr);
                    }]                    
                }
            }) 
            .state('contracts.new.profile', {
                url: '/profile',
                templateUrl: 'contracts-new-profile.html'
            })             
            .state('contracts.new.preference', {
                url: '/preference',
                templateUrl: 'contracts-new-preference.html'
            })
            .state('contracts.new.contacts', {
                url: '/contacts',
                templateUrl: 'contracts-new-contacts.html'
            }) 
            .state('contracts.new.review', {
                url: '/review',
                templateUrl: 'contracts-new-review.html'
            })             
            .state('contracts.detail', {
                url: '/:id',
                templateUrl: 'contracts-detail.html',
                controller: 'ContractsDetailController',
                controllerAs: 'contractsDetailVm',
                resolve: {
                    stateContractId: ['$stateParams', function($stateParams) {
                        return $stateParams.id;
                    }],
                    stateContract: ['$log', 'ContractsService', '$stateParams', 'DataServices', function($log, ContractsService, $stateParams, DataServices) {
                        var contractState = ContractsService.get($stateParams.id);
                        if (contractState) {
                            $log.debug("contracts detail: retrieve from contracts service: " + contractState.isIncomplete());
                            ContractsService.select($stateParams.id);
                            return contractState;
                        }
                        else {
                            //return ContractsService.get($stateParams.id);
                            return DataServices.loadContracts($stateParams.id);
                        }    
                    }], 
                    contract: ['$log', 'DataServices', 'stateContract', function($log, DataServices, stateContract) {
                        if (stateContract.isIncomplete()) {
                            return DataServices.getContract(stateContract.id);
                        }
                        else {
                            return {status: "  "};
                        }    
                    }],
                    approvedContract: ['DataServices', 'stateContract', function(DataServices, stateContract) {
                        if (stateContract.isApproved()) {
                            return DataServices.getApprovedContract(stateContract.id);
                        }
                        else {
                            return {status: "  "};
                        }    
                    }]
                }    
            })
            .state('contracts.detail.customers', {
                url: '/customers',
                views: {
                    "viewTab": {
                        templateUrl: 'customers.html',
                        controller: 'CustomersController',
                        controllerAs: 'customersVm'
                    }
                },
                resolve: {
                    customers: ['DataServices', 'stateContract', function(DataServices, stateContract) {
                        if (stateContract.isIncomplete()) {
                            return DataServices.getCustomers(stateContract.id);
                        }
                        else {
                            return {};
                        }    
                    }],
                    approvedCustomers: ['DataServices', 'stateContract', function(DataServices, stateContract) {
                        if (stateContract.isApproved()) {
                            return DataServices.getApprovedCustomers(stateContract.id);
                        }
                        else {
                            return {};
                        }    
                    }] 
                }                 
            })
            .state('contracts.detail.accounts', {
                url: '/accounts',
                views: {
                    "viewTab": {
                        templateUrl: 'accounts.html',
                        controller: 'AccountsController',
                        controllerAs: 'accountsVm'
                    }
                },
                resolve: {
                    accounts: ['DataServices', 'stateContract', function(DataServices, stateContract) {
                        if (stateContract.isIncomplete()) {
                            return DataServices.getAccounts(stateContract.id);
                        }
                        else {
                            return {};
                        }    
                    }],
                    approvedAccounts: ['DataServices', 'stateContract', function(DataServices, stateContract) {
                        if (stateContract.isApproved()) {
                            return DataServices.getApprovedAccounts(stateContract.id);
                        }
                        else {
                            return {};
                        }    
                    }] 
                } 
            })
            .state('contracts.detail.services', {
                url: '/services',
                views: {
                    "viewTab": {
                        templateUrl: 'services.html',
                        controller: 'ServicesController',
                        controllerAs: 'servicesVm'
                    }
                },
                resolve: {
                    services: ['DataServices', 'ContractDetailTabsService', 'stateContract', function(DataServices, ContractDetailTabsService, stateContract) {
                        if (stateContract.isIncomplete()) {
                            if (stateContract.isApproved()) {
                                ContractDetailTabsService.enable('4');
                            }
                            else {
                                ContractDetailTabsService.disable('4');
                            }                            
                            return DataServices.getServices(stateContract.id);
                        }
                        else {
                            return {};
                        }    
                    }],
                    approvedServices: ['DataServices', 'stateContract', function(DataServices, stateContract) {
                        if (stateContract.isApproved()) {
                            return DataServices.getApprovedServices(stateContract.id);
                        }
                        else {
                            return {};
                        }    
                    }] 
                }                   
            })             
            .state('contracts.detail.serviceaccounts', {
                url: '/serviceaccounts',
                views: {
                    "viewTab": {
                        templateUrl: 'serviceaccounts-services.html',
                        controller: 'ServiceAccountsServicesController',
                        controllerAs: 'serviceAccountsServicesVm'
                    }
                },
                resolve: {
                    services: ['DataServices', 'stateContract', function(DataServices, stateContract) {
                        if (stateContract.isIncomplete()) {
                            return DataServices.getAssignedServices(stateContract.id);
                        }
                        else {
                            return {};
                        }    
                    }],
                    approvedServices: ['DataServices', 'stateContract', function(DataServices, stateContract) {
                        if (stateContract.isApproved()) {
                            return DataServices.getApprovedAssignedServices(stateContract.id);
                        }
                        else {
                            return {};
                        }    
                    }] 
                }                    
            })      
            .state('contracts.detail.serviceaccounts.accounts', {
                url: '/:serviceId',
                templateUrl: 'serviceaccounts-accounts.html',
                controller: 'ServiceAccountsController',
                controllerAs: 'serviceAccountsVm',
                resolve: {
                    accounts: ['DataServices', 'stateContract', '$stateParams', function(DataServices, stateContract, $stateParams) {
                        if (stateContract.isIncomplete()) {
                            return DataServices.getServicesAccounts(stateContract.id, $stateParams.serviceId);
                        }
                        else {
                            return {};
                        }    
                    }],
                    approvedAccounts: ['DataServices', 'stateContract', '$stateParams', function(DataServices, stateContract, $stateParams) {
                        if (stateContract.isApproved()) {
                            return DataServices.getApprovedServicesAccounts(stateContract.id, $stateParams.serviceId);
                        }
                        else {
                            return {};
                        }    
                    }] 
                }                   
            })  
            .state('users', {
                url: '/users',
                templateUrl: 'users.html',
                controller: 'UsersController',
                controllerAs: 'usersVm'    
            })
            .state('users.list', {
                url: '/:id',
                templateUrl: 'users-list.html',
                controller: 'UsersListController',
                controllerAs: 'usersListVm',
                resolve: {
                    userContractState: ['$log', 'ContractsService', '$stateParams', 'DataServices', function($log, ContractsService, $stateParams, DataServices) {
                        var contractState = ContractsService.get($stateParams.id);
                        if (contractState) {
                            $log.debug("users.list: retrieve from contracts service: " + contractState.isIncomplete());
                            ContractsService.select($stateParams.id);
                            return contractState;
                        }
                        else {
                            //return ContractsService.get($stateParams.id);
                            return DataServices.loadContracts($stateParams.id);
                        }    
                    }],
                    usersList: ['$log', 'ContractsService', '$stateParams', 'DataServices', function($log, ContractsService, $stateParams, DataServices) {
                        return [
                            {id: $stateParams.id + "user1", name: "user1"},
                            {id: $stateParams.id + "user2", name: "user2"},
                            {id: $stateParams.id + "user3", name: "user3"},
                            {id: $stateParams.id + "user4", name: "user4"}
                        ];
                    }]    
                }                 
            })
            .state('users.list.detail', {
                url: '/:userid',
                views: {
                    "detail@users": {
                        templateUrl: 'users-detail.html',
                        controller: 'UsersDetailController',
                        controllerAs: 'usersDetailVm',
                        resolve: {
                            user: ['$log', 'userContractState', 'ContractsService', '$stateParams', 'DataServices', function($log, userContractState, ContractsService, $stateParams, DataServices) {
                                var contractState = ContractsService.getSelected();
                                $log.debug("user.list.detail: userContractState: " + userContractState.id);
                                $log.debug("user.list.detail: " + contractState.id + " " + $stateParams.userid);
                                return $stateParams.userid;
                            }] 
                        }                         
                    }
                }
            })
            .state('users.list.detail.mfa', {
                url: '/mfa',
                templateUrl: 'users-mfa.html',
                controller: 'UsersMfaController',
                controllerAs: 'usersMfaVm'
                // resolve: {
                //     mfa: ['DataServices', 'user', 'userContractState', function(DataServices, user, userContractState) {
                //         $log.debug("user.list.detail.mfa: user: " + user);
                //         $log.debug("user.list.detail.mfa: userContractState: " + userContractState.id);
                //         return {};  
                //     }]
                // }                 
            })   
            .state('users.list.detail.serviceaccounts', {
                url: '/serviceaccounts',
                templateUrl: 'users-serviceaccounts.html',
                controller: 'UsersServiceaccountsController',
                controllerAs: 'usersServiceAccountsVm'              
                // resolve: {
                //     userserviceaccounts: ['DataServices', 'user', 'userContractState', function(DataServices, user, userContractState) {
                //         $log.debug("user.list.detail.serviceaccounts: user: " + user);
                //         $log.debug("user.list.detail.serviceaccounts: userContractState: " + userContractState.id);
                //         return {};  
                //     }]
                // }                 
            })                      
            ;            
    }            
})();