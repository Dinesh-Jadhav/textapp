textApp.controller('privatechatCtrl',['$scope','$http','$location',function($scope,$http,$location,$timeout){
	 var token = localStorage.getItem('token');
           $scope.userdetails = JSON.parse(localStorage.getItem("userdetails"))
            console.log(token);
/*user list get request*/
    $scope.users;
    $http.get("/api/v1/user/", {params: {token: token}}).success(function(response) {
        console.log(response);
        if (response.error == true) {
            $scope.noError = false;
            $scope.ErrorMessage = response.error;
        } else {
            //console.log($scope.users);
            $scope.users = response.data
        }
    });
/*user list get request*/

/*refresh group list*/
$scope.refreshGroupList=function(){
  $scope.$emit('LOAD');
    $http.get("/api/v1/privategroups/", {params: {token: token,createdby:$scope.userdetails.id}}).success(function(response) {
        console.log(response);
        if (response.error == true) {
            $scope.noError = false;
            $scope.ErrorMessage = response.error;
        } else {
            $scope.privateGroupList = response.data
        $scope.$emit('UNLOAD');
        }
    });

}

$scope.refreshGroupList();
/*refresh group list*/

/*get user online status*/
$scope.onlineStatus=function(_id){

     $http.get('/api/v1/user/'+_id, {headers: {token: token}}).success(function(response) {
            if (response.error == true) {
                $scope.Error = false;
                $scope.ErrorMessage = response.data;

            } else {
                $scope.friendInfo=response.data;
           console.log(response.data);
                $scope.successMessage = "User added sucessfully";
            }
        });

}

/*get user online status*/


             var socket = io.connect('https://textingapp.herokuapp.com');
              
            var contact = {};
            $scope.privategroup = function(userdata){
                $scope.privatedata = userdata;  
          
                if($scope.privatedata.createdby==$scope.userdetails.id){
               $scope.FreindOnlineStatus=$scope.onlineStatus($scope.privatedata.userLists[0]._id); 
                  $scope.groupsName=$scope.privatedata.group_name;
                }else{
               $scope.FreindOnlineStatus=$scope.onlineStatus($scope.privatedata.createdby); 

                  $scope.groupsName=$scope.privatedata.friend_name;
                }
              var blockId = $scope.privatedata._id;
             
               socket.emit('addUser', blockId); 


            }
            socket.on('connect', function() {
                           socket.emit('addUser', "59f073f54b72d948e3ff1961");
                        }); 

             $scope.messages = [];
             socket.on('updatechat', function(history) {
                          $scope.messagess = history;
                           $scope.$apply();
                           
                        });

              $scope.residentchat = {};
              
               $scope.send = function() {
                                        
                            var message = $scope.residentchat.message;
                            var message_type = "text"; 
                            var userID = $scope.privatedata.userLists[0]._id;
                            var blockId = $scope.privatedata._id;
                            var message_by = $scope.userdetails.id;
                           if(message!=""){
                            if($scope.friendInfo.online){
                            socket.emit('sendchat', message,message_type, userID, blockId, message_by);
                          }else{
                            socket.emit('sendchat', message,message_type, userID, blockId, message_by);
                            var params = {
                                       'src': '18552828641', // Sender's phone number with country code
                                       'dst' : $scope.friendInfo.mobile,
                                       //'dst' : '+919522211120', // Receiver's phone Number with country code
                                       'text' : message, // Your SMS Text Message - English
                                       //'text' : "こんにちは、元気ですか？", // Your SMS Text Message - Japanese
                                       //'text' : "Ce est texte généré aléatoirement", // Your SMS Text Message - French
                                       'url' : "http://example.com/report/", // The URL to which with the status of the message is sent
                                       'method' : "GET" // The method used to call the url
                                    };
                             $http.post('/messagesent',params ).success(function(response) {
                                       if (response.error == true) {
                                           $scope.Errordata = false;
                                           $scope.ErrorMessage = response.data;
                                       } else {
                                           console.log(response);
                                       }
                                   })

                            }
                          }
                            $scope.residentchat.message = '';
                        }  




                $scope.addPrivateChat=function(data){
                      $scope.privateUser=JSON.parse(data);
                       var reqData={};
                       var userlistObj={"_id":$scope.privateUser._id};
                       reqData.userLists=[];
                       reqData.group_name=$scope.privateUser.first_name+" "+$scope.privateUser.last_name;
                       reqData.is_group=false;
                        reqData.friend_name=$scope.userdetails.first_name+" "+$scope.userdetails.last_name;
                       reqData.created_by= $scope.userdetails.id;
                      reqData.userLists.push(userlistObj);
                       reqData.status=1;
                       reqData.token=token;
                               $http.post('/api/v1/creategroup', reqData).success(function(response) {
                        if (response.error == true) {
                            $scope.Error = false;
                            $scope.ErrorMessage = response.data;
                        } else {
                            //$scope.Success = false;
                            $scope.successMessage = "User Added to Private Chat sucessfully";
                            
                             $('#myModal').modal('toggle');
                            $scope.refreshGroupList();
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
                          var message =response.data;
                            var message_type = "image"; 
                            var userID = $scope.privatedata.userLists[0]._id;
                            var blockId = $scope.privatedata._id;
                            var message_by = $scope.userdetails.id;

                        socket.emit('sendchat', message,message_type, userID, blockId, message_by);
                 $scope.Successdata = false;
                 $scope.image_path=response.data;
                 console.log($scope.image_path);
             }
         })
   }


}])