// import admin
angular.module('product').controller('productListCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route, $filter) {

  $('.index').removeClass("active");
  $('#menuproductintex').addClass("active");
  $('#productintex').addClass("active");
  
    $scope.product_com_name = localStorage.getItem("com_name");
    $scope.product_com_id = localStorage.getItem("com_id");
    $scope.filteredTodos = [];
    $scope.currentPage = 1;
    $scope.maxSize = 5;
    $scope.entryLimit = 5;
    $scope.filterUser = 0;
    $scope.filterUserend = 1;
    $scope.numPerPage = 10;
    $scope.obj_Main = [];
    $scope.productListcount = 0;
    $scope.limit = {};
    $scope.loading1 = 0;

    $scope.pm_copies = 1;

    $scope.apiURL = $rootScope.baseURL+'/product/total';
   $scope.getAll = function () {
        
      if ($('#searchtext').val() == undefined || $('#searchtext').val() == "") {
        $scope.limit.search = "";
        $scope.limit.com_id = localStorage.getItem("com_id");
      }
      else{
        $scope.limit.search = $scope.searchtext;
        $scope.limit.com_id = localStorage.getItem("com_id");
      }
        
      $http({
        method: 'POST',
        url: $scope.apiURL,
        data: $scope.limit,
	      headers: {'Content-Type': 'application/json'}
	    })
	    .success(function(product)
	    {
	      product.forEach(function (value, key) {
                  $scope.productListcount = value.total;
              });
              $scope.$watch("currentPage + numPerPage",
                  function () {
                      
                      $scope.resetpagination();
                  });

	    })
	    .error(function(data) 
	    {   
                         
	    });
    };

    //Pagination Function
    

   //Pagination Function
    $scope.resetpagination = function () {
        var begin = (($scope.currentPage - 1) * $scope.numPerPage);
        var end = begin + $scope.numPerPage;
        $scope.filterUserend = begin + 1;
        $scope.filterUser = end;
        if ($scope.filterUser >= $scope.productListcount)
            $scope.filterUser = $scope.productListcount;

              $scope.filteredTodos = [];
              $scope.limit.number = $scope.numPerPage;
              $scope.limit.begin = begin;
              $scope.limit.end = end;
              $http({
                method: 'POST',
                url: $rootScope.baseURL+'/product/limit',
                data: $scope.limit,
                headers: {'Content-Type': 'application/json',}
              })
              .success(function(product)
              {
                $scope.filteredTodos = [];
                if (product.length > 0) {
                  $('#addrecord').hide();
                  $('#checkrecord').show();
                  product.forEach(function (value, key) {
                        $scope.filteredTodos.push(value);
                  });
                }
                else{
                  $('#checkrecord').hide();
                  $('#addrecord').show();
                }
                
                      $scope.loading1 = 1;
              })
              .error(function(data) 
              {   
                  $scope.loading1 = 1;
                    var dialog = bootbox.dialog({
                    message: '<p class="text-center">Oops, Something Went Wrong! Please Refresh the Page.</p>',
                        closeButton: false
                    });
                    setTimeout(function(){
                        dialog.modal('hide'); 
                    }, 3001);             
              });
    };
    $scope.getSearch = function () {

      $scope.getAll();

    };
    $scope.editProd = function (pro_id) {
      $('#con_edit').modal('show');
      $scope.pro_id=pro_id;
      $scope.product = $scope.filteredTodos.find(item => item.p_id === pro_id);
    }  

     $scope.submitForm = function(isValid) {
            if (isValid) { 
               $scope.editProduct();
            }
    };
     $scope.editProduct = function () {
        $('#btnsave').attr('disabled');
        
        $http({
            method: 'POST',
            url: $rootScope.baseURL+"/product/update",
            data: $scope.product,
            headers: {'Content-Type': 'application/json'}
        })
        .success(function(helo)
        {
            alert('Product Updated Successfully');
            location.reload();

            $('#btnsave').removeAttr('disabled');

        })
        .error(function(data, status, headers, config)
        {
            alert("Please Refresh the Page");
            $('#btnsave').removeAttr('disabled');
         });
  };

    $scope.deleteProd = function (p_id) {
      
      $('#confirm-delete').modal('show');
      $scope.p_id=p_id;
    }  

    $scope.deleteConfirm = function () {
      $('#del').attr('disabled','true');
      $('#del').text("please wait...");
	     $http({
	      method: 'POST',
	      url: $rootScope.baseURL+'/product/delete/'+$scope.p_id,
	      headers: {'Content-Type': 'application/json'}
	    })
	    .success(function(customerObj)
	    {
                $('#del').text("Delete");
                $('#del').removeAttr('disabled');
                $scope.getAll();
                $('#confirm-delete').modal('hide');
	    })
	    .error(function(data) 
	    {   
	                 
	    });
	};


});