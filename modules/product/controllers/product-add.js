// import admin
angular.module('product').controller('productAddCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route, hotkeys) {

  
  $('.index').removeClass("active");
  $('#menuproductintex').addClass("active");
  $('#newproductintex').addClass("active");
  
    $scope.product = {};

    $("#pm_name").focus();

	$scope.apiURL = $rootScope.baseURL+'/product/add';
  
    $scope.submitForm = function(isValid) {
            if (isValid) { 
               $scope.addProduct();
            }
    };
    $scope.addProduct = function () {
        $('#btnsave').attr('disabled');
        $http({
            method: 'POST',
            url: $rootScope.baseURL+"/product/checkname",
            data: $scope.product,
            headers: {'Content-Type': 'application/json'}
        })
        .success(function(checkname)
        {
            if(checkname.length > 0)
            {
                 alert("Product Already Exits");
                $('#btnsave').removeAttr('disabled');
            }
            else{
                    $http({
                        method: 'POST',
                        url: $rootScope.baseURL+"/product/create",
                        data: $scope.product,
                        headers: {'Content-Type': 'application/json'}
                    })
                    .success(function(helo)
                    {
                        alert('Product Added Successfully');
                        location.reload();

                        $('#btnsave').removeAttr('disabled');

                    })
                    .error(function(data, status, headers, config)
                    {
                        alert("Please Refresh the Page");
                        $('#btnsave').removeAttr('disabled');
                     });
            }
        })
        .error(function(data, status, headers, config)
        {
            alert("Please Refresh the Page");
            $('#btnsave').removeAttr('disabled');
         });
	};

});