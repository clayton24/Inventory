// import admin
angular.module('admin').controller('dashboardCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route, $filter) {

  $('.index').removeClass("active");
  $('#dashboardindex').addClass("active");

  $('#sidenav').show();

	$scope.getDashboardReport = function() {
        $http({
          method: 'POST',
          url: $rootScope.baseURL+'/dashboard/dashadmin',
          headers: {'Content-Type': 'application/json'}
        })
        .success(function(dashboardadmin)
        {
          $scope.proTotal = dashboardadmin[0].total;
        })
        .error(function(data) 
        {   
           
        });
    };

});