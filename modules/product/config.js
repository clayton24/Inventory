'use strict';
/* Account Module */
angular.module('product', [])
    .config(['$routeProvider', function config($routeProvider) {
        $routeProvider
            
            .when('/product/list',
                {
                    templateUrl: 'modules/product/partials/product-list.html',
                    controller: 'productListCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/product/controllers/product-list.js']
                            }]);
                        }]
                    }
                })

            .when('/product/add',
                {
                    templateUrl: 'modules/product/partials/product-add.html',
                    controller: 'productAddCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/product/controllers/product-add.js']
                            }]);
                        }]
                    }
                });
                
        }]);