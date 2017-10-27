textApp.controller('userCtrl', ['$scope', '$http', '$location', function($scope, $http, $location,$window) {
    var token = localStorage.getItem('token');
    $scope.userdetails = JSON.parse(localStorage.getItem("userdetails"));
    var addduser = {};
    $scope.users;
     $scope.$emit('LOAD');
    $http.get("/api/v1/user/", {params: {token: token}}).success(function(response) {
        console.log(response);
        if (response.error == true) {
            $scope.noError = false;
            $scope.ErrorMessage = response.error;
        } else {
            //console.log($scope.users);
            $scope.users = response.data
             $scope.$emit('UNLOAD');
            console.log($scope.users);
        }
    });



$scope.refresh = function(){
       $scope.$emit('LOAD');
       $http.get("/api/v1/user/", {params: {token: token}}).success(function(response) {
        console.log(response);
        if (response.error == true) {
            $scope.noError = false;
            $scope.ErrorMessage = response.error;
        } else {
            //console.log($scope.users);
           
            $scope.users = response.data
             $scope.$emit('UNLOAD');
        }
    });

}

    $scope.deleteUser = function(_id) {
       var data={};
          token = localStorage.getItem('token')
         data.token = token
      $http.delete('/api/v1/user/'+_id, {params: {token: token}}).success(function(response) {
            if (response.error == true) {
                $scope.Error = false;
                $scope.ErrorMessage = response.data;
            } else {
                $scope.Success = false;
                $scope.successMessage = "User Delete sucessfully";

                $scope.singleUser=response.data;
                console.log(response.data);
                $scope.refresh();
                
            }
        })

    }
 

}]);


textApp.controller('userEditCtrl', ['$scope', '$http', '$location','$timeout', function($scope, $http, $location,$window,$timeout) {
        var token = localStorage.getItem('token');
        $scope.userdetails = JSON.parse(localStorage.getItem("userdetails"));
        var urlPath=$location.path();
        var _id = /[^/]*$/.exec(urlPath)[0];

     $http.get('/api/v1/user/'+_id, {headers: {token: token}}).success(function(response) {
            if (response.error == true) {
                $scope.Error = false;
                $scope.ErrorMessage = response.data;
            } else {
                $scope.editUser=response.data;
                $scope.editUser.mobile_number=$scope.editUser.mobile;   
                $scope.editUser.oldPassword=$scope.editUser.password;
                $scope.editUser.cpassword=$scope.editUser.password;
                $scope.old_image = $scope.editUser.image_path;
                console.log(response.data);
              //  $scope.Success = false;
                $scope.successMessage = "User added sucessfully";
            }
        });


$scope.updateUser=function(data){
      var data = data;
        token = localStorage.getItem('token')
        console.log($scope.editUser);
        if(data.image_path){
            data.image_path = $scope.old_image;
        }else{
        data.image_path = $scope.image_path;    
        }
       data.token = token
       data.online = $scope.editUser.online;
                if(data.password.length < 20){
                        data.is_updated=1;
                    }else{
                data.is_updated=0;
                        }
                        console.log(data);

     $http.put('/api/v1/user/'+_id, data).success(function(response) {
            if (response.error == true) {
                $scope.Error = false;
                $scope.ErrorMessage = response.data;
            } else {
                $scope.Success = false;
                $scope.successMessage = "User Updated sucessfully";
                 $timeout(function() {
                                    $location.path('/list')
                                }, 2000);
            }
        })

}


 var vm=this;
   $scope.submit = function(file){ 

       if (file) { //check if from is valid
           $scope.upload(file); //call upload function
       }
   }
   
   $scope.upload = function (file) {
     var param ={
       "image":file
     }
        $http.post('/upload', param).success(function(response) {
             if (response.error == true) {
                 $scope.Errordata = false;
                 $scope.ErrorMessage = response.data;
             } else {
                 $scope.Successdata = false;
                 $scope.image_path=response.data;
                 console.log($scope.image_path);
             }
         })
   }

}]);



textApp.controller('addUserCtrl', ['$scope', '$http', '$location','$timeout', function($scope, $http, $location,$window,$timeout) {
        var token = localStorage.getItem('token');
       $scope.userdetails = JSON.parse(localStorage.getItem("userdetails"));
    $scope.createUser = function(data) {
        var data = data;
        token = localStorage.getItem('token')
        data.image_path = $scope.image_path;
        data.token = token

        $http.post('/api/v1/user', data).success(function(response) {
            if (response.error == true) {
                $scope.Error = false;
                $scope.ErrorMessage = response.data;
            } else {
                $scope.Success = false;
                $scope.successMessage = "User added sucessfully";
                 $timeout(function() {
                                    $location.path('/list')
                                }, 2000);

            }
        })

    }

/*image preview*/
  $scope.data = 'none';
  $scope.dataimg = 'none';
  $scope.add = function() {
      

      if (document.contains(document.getElementById("imageView")) ){
            document.getElementById("imageView").remove();
        }
  
    var f = document.getElementById('file').files[0],
      r = new FileReader();
    r.onloadend = function(e) {
      $scope.data = e.target.result;
      var img = document.createElement('img');
      img.src = 'data:image/jpeg;base64,' + btoa(e.target.result);
      
    img.setAttribute("width", "304");
    img.setAttribute("id", "imageView");
    img.setAttribute("height", "228");
     //document.body.appendChild(img);
    var ImgPreviewDiv=document.getElementById('imgPreview');
     ImgPreviewDiv.appendChild(img);
//$scope.imgsrrc='data:image/jpeg;base64,' + btoa(e.target.result);
    }
    r.readAsBinaryString(f);
  }
/*image Preview*/



 var vm=this;
   $scope.submit = function(file){ 

       if (file) { //check if from is valid
           $scope.upload(file); //call upload function
       }
   }
   
   $scope.upload = function (file) {
     var param ={
       "image":file
     }
        $http.post('/upload', param).success(function(response) {
             if (response.error == true) {
                 $scope.Errordata = false;
                 $scope.ErrorMessage = response.data;
             } else {
                 $scope.Successdata = false;
                 $scope.image_path=response.data;
                 console.log($scope.image_path);
             }
         })
   }


}]);