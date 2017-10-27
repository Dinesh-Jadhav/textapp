textApp.controller('dashboardCtrl', ['$scope', '$http', '$location', function($scope, $http, $location,$window) {
    var token = localStorage.getItem('token');
    $scope.userdetails = JSON.parse(localStorage.getItem("userdetails"));
  


}])