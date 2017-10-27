textApp.controller('contactCtrl', ['$scope', '$http', '$location', '$timeout', '$window', function($scope, $http, $location, $timeout, $window) {
    var token = localStorage.getItem('token');
  $scope.userdetails = JSON.parse(localStorage.getItem("userdetails"));
    $scope.contactList = {};
    $scope.data = {
        availableOptions: [
            { id: '0', name: 'Enable' },
            { id: '1', name: 'Disable' }
        ],
        selectedOption: { id: '1', name: 'Disable' } //This sets the default value of the select in the ui
    }
     $scope.$emit('LOAD');
    $http.get("/api/v1/contact", { params: { token: token } }).success(function(response) {
        if (response.error == true) {
            $scope.noError = false;
            $scope.ErrorMessage = response.error;
        } else {
            $scope.count = response.data.length;
            $scope.contactList = response.data;
             $scope.$emit('UNLOAD');
        }
    });

    $scope.deletecontact = function(id) {
        if (confirm("Do you want to delete it!") == true) {
            $http.delete('/api/v1/contact/' + id, { params: { token: token } }).success(function(response) {
                if (response.error == true) {
                    $scope.Error = false;
                    $scope.ErrorMessage = response.data;
                } else {
                    $scope.Success = false;
                    $scope.successMessage = "Contact deleted sucessfully";
                    $timeout(function() {
                        $window.location.reload()
                    }, 2000)
                }
            })
        } else {

        }

    }

}])


textApp.controller('addcontactCtrl', ['$scope', '$http', '$location', '$timeout', function($scope, $http, $location, $timeout) {
    var token = localStorage.getItem('token');
      $scope.userdetails = JSON.parse(localStorage.getItem("userdetails"));
$scope.new_image_path="";
    $scope.contact = {};
    $scope.addcontact = function() {
        var adddata = {
            token: token,
            first_name: $scope.contact.first_name,
            last_name: $scope.contact.last_name,
            email: $scope.contact.email,
            mobile_number: $scope.contact.phone_number,
            status: $scope.contact.status,
            image_path: $scope.new_image_path
        }
        $http.post('/api/v1/contact', adddata).success(function(response) {
            if (response.error == true) {
                $scope.Error = false;
                $scope.ErrorMessage = response.data;
            } else {
                $scope.Success = false;
                $scope.successMessage = "Contact added sucessfully";
                $timeout(function() {
                    $location.path('/contactlist')
                }, 2000)
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
                 $scope.new_image_path=response.data;
                 console.log($scope.image_path);
             }
         })
   }

}])


textApp.controller('editcontactCtrl', ['$scope', '$http', '$location', '$timeout', function($scope, $http, $location, $timeout) {
    var token = localStorage.getItem('token');
    $scope.userdetails = JSON.parse(localStorage.getItem("userdetails"));
    $scope.contact = {};
     var urlPath=$location.path();
        var _id = /[^/]*$/.exec(urlPath)[0];

 $http.get('/api/v1/contact/'+_id, {headers: {token: token}}).success(function(response) {
            if (response.error == true) {
                $scope.Error = false;
                $scope.ErrorMessage = response.data;
            } else {
                $scope.contact=response.data;
                $scope.contact.phone_number=$scope.contact.mobile;
                  $scope.old_image = $scope.contact.image_path;
                console.log(response.data);
              //  $scope.Success = false;
                $scope.successMessage = "User added sucessfully";
            }
        });

  $scope.updateContact=function(){
        token = localStorage.getItem('token')
     
var updatedata = {
            token: token,
            first_name: $scope.contact.first_name,
            last_name: $scope.contact.last_name,
            email: $scope.contact.email,
            mobile_number: $scope.contact.phone_number,
            status: $scope.contact.status,
            //image_path: $scope.new_image_path,
        }
        console.log($scope.contact.image_path);
if($scope.contact.image_path){
            updatedata.image_path = $scope.old_image;
        }else{
        updatedata.image_path = $scope.new_image_path;    
        }


     $http.put('/api/v1/contact/'+_id, updatedata).success(function(response) {
            if (response.error == true) {
                $scope.Error = false;
                $scope.ErrorMessage = response.data;
            } else {
                $scope.Success = false;
                $scope.successMessage = "Contact Updated sucessfully";

                 $timeout(function() {
                                    $location.path('/contactlist')
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
                 $scope.new_image_path=response.data;
                 console.log($scope.new_image_path);
             }
         })
   }

}])


textApp.controller('addgroupCtrl', ['$scope', '$http', '$location', '$timeout', function($scope, $http, $location, $timeout) {
   var token = localStorage.getItem('token');
     $scope.userdetails = JSON.parse(localStorage.getItem("userdetails"))
    $scope.contactList = {};
  $http.get("/api/v1/contact", { params: { token: token } }).success(function(response) {
        if (response.error == true) {
            $scope.noError = false;
            $scope.ErrorMessage = response.error;
        } else {
            $scope.count = response.data.length;
            $scope.contactList = response.data;

            console.log($scope.contactList);
        }
    });

   $scope.group = {};
   $scope.image_path=   "";
   $scope.addgroup = function() {
    $scope.group.is_group=true;
    $scope.group.token=token;
    $scope.group.created_by= $scope.userdetails.id;
    $scope.group.group_icon=$scope.image_path;
      
         $http.post('/api/v1/creategroup', $scope.group).success(function(response) {
                        if (response.error == true) {
                            $scope.Error = false;
                            $scope.ErrorMessage = response.data;
                        } else {
                            $scope.Success = false;
                            $scope.successMessage = "Group Created Successfully";
                         //   $scope.refreshGroupList();
                             $timeout(function() {
                                    $location.path('/groups')
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



}])



/*Group manage controller*/
textApp.controller('chatGroupCtrl', ['$scope', '$http', '$location','$timeout', function($scope, $http, $location,$window,$timeout) {
    var token = localStorage.getItem('token');
    $scope.userdetails = JSON.parse(localStorage.getItem("userdetails"));
    var addduser = {};
    $scope.users;
    $http.get("/api/v1/groups/", {params: {token: token}}).success(function(response) {
        console.log(response);
        if (response.error == true) {
            $scope.noError = false;
            $scope.ErrorMessage = response.error;
        } else {
            //console.log($scope.users);
            $scope.users = response.data

            console.log($scope.users);
        }
    });



$scope.refresh = function(){
       $http.get("/api/v1/groups/", {params: {token: token}}).success(function(response) {
        console.log(response);
        if (response.error == true) {
            $scope.noError = false;
            $scope.ErrorMessage = response.error;
        } else {
            //console.log($scope.users);
            $scope.users = response.data

        }
    });

}

    $scope.deleteGroup = function(_id) {
       var data={};
          token = localStorage.getItem('token')
         data.token = token
      $http.delete('/api/v1/group/'+_id, {params: {token: token}}).success(function(response) {
            if (response.error == true) {
                $scope.Error = false;
                $scope.ErrorMessage = response.data;
            } else {
                $scope.Success = false;
                $scope.successMessage = "Group Deleted sucessfully";
               
                $scope.refresh();                
            }
        })

    }
 

}]);
/*Group manage controller*/




textApp.controller('editGroupCtrl', ['$scope', '$http', '$location', '$timeout', function($scope, $http, $location, $timeout) {
    var token = localStorage.getItem('token');
    $scope.userdetails = JSON.parse(localStorage.getItem("userdetails"));
     $scope.image_path="";
     $scope.group = {};
     var urlPath=$location.path();
        var _id = /[^/]*$/.exec(urlPath)[0];

  $http.get("/api/v1/contact", { params: { token: token } }).success(function(response) {
        if (response.error == true) {
            $scope.noError = false;
            $scope.ErrorMessage = response.error;
        } else {
            $scope.count = response.data.length;
            $scope.contactList = response.data;

            console.log($scope.contactList);
        }
    });



 $http.get('/api/v1/group/'+_id, {headers: {token: token}}).success(function(response) {
            if (response.error == true) {
                $scope.Error = false;
                $scope.ErrorMessage = response.data;
            } else {
                $scope.group=response.data;
            
                console.log(response.data);
              //  $scope.Success = false;
                $scope.successMessage = "User added sucessfully";
            }
        });

  $scope.updateGroup=function(){
        token = localStorage.getItem('token')
$scope.group.token=token;
$scope.group.created_by=$scope.group.createdby; 
$scope.group.myId=$scope.group._id;
$scope.group.group_icon= $scope.image_path;

     $http.put('/api/v1/groups/'+_id, $scope.group).success(function(response) {
            if (response.error == true) {
                $scope.Error = false;
                $scope.ErrorMessage = response.data;
            } else {
                $scope.Success = false;
                $scope.successMessage = "Group Updated sucessfully";

                 $timeout(function() {
                                    $location.path('/groups')
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






}])