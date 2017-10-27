textApp.controller('login_ctrl', ['$scope', '$http', '$location', function($scope, $http, $location) {
    localStorage.removeItem("userdetails");
    $scope.login = function() {
        $http.post("/userlogin", { username: $scope.email, password: $scope.password }).success(function(response) {
            if (response.error == true) {
                $scope.noError = false;
                $scope.ErrorMessage = response.data;
            } else {
                $http.post("/api/v1/authenticate").success(function(responsedata, status, headers, config) {
                    if (response.error == false) {
                        localStorage.setItem("token", responsedata.data.token);
                        console.log(localStorage.getItem('token'));
                    } else {
                        $location.path("/admin-login");
                    }
                });
                localStorage.setItem("userdetails", JSON.stringify(response.data));
                $location.path("/AdminDashboard");
            }
        });
    }
}])