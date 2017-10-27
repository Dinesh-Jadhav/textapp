textApp.directive('header', ['$compile', '$http', '$location', '$route', function($compile, $http, $location, $route) {
    return {
        restrict: 'E',
        templateUrl: '../html/header.html',
        transclude: true,
        link: function(scope, element, attrs) {

            var userData = localStorage.getItem("userdetails");
            if (userData == null) {
                $location.path("/login");
            }
            scope.logout = function() {
                scope.$emit('LOAD');
                localStorage.removeItem("userdetails");
                $http.post("/logout").success(function(response, status, headers, config) {
                    scope.$emit('UNLOAD');
                    $location.path("/login");
                });
            };
        }
    }
}]);

textApp.directive("select2", function($timeout, $parse) {
    return {
        restrict: 'AC',
        link: function(scope, element, attrs) {


            $timeout(function() {
                $(element).select2({
                    placeholder: "Select Option"
                });
            }, 200);
        }
    };
});
