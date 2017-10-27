'use strict';
var textApp = angular.module('textApp', ['ngRoute', 'ui.select2', 'datatables', 'ngSanitize','ngFileUpload']);
textApp.value('socketUrl', 'http://localhost:8080');
textApp.config(['$routeProvider', function($routeProvider) {
    //admin login
    $routeProvider
        .when('/login', {
            templateUrl: '../html/admin/login.html',
            controller: 'login_ctrl',
        }).when('/AdminDashboard', {
            templateUrl: '../html/admin/dashboard.html',
            controller: 'dashboardCtrl',
            activetab: 'dashboard'
        }).when('/add_competition', {
            templateUrl: '../html/competition/add_compitation.html',
            controller: 'competition_add',
            activetab: 'ticker'
        }).when('/list', {
            templateUrl: '../html/user/userList.html',
            controller: 'userCtrl',
            activetab: 'user'
        }).when('/editUser/:any', {
            templateUrl: '../html/user/editUser.html',
            controller: 'userEditCtrl',
            activetab: 'user'
        }).when('/addUser', {
            templateUrl: '../html/user/addUser.html',
            controller: 'addUserCtrl',
            activetab: 'user'
        }).when('/contactlist', {
            templateUrl: '../html/contact/contact.html',
            controller: 'contactCtrl',
            activetab: 'contact'
        }).when('/groups', {
            templateUrl: '../html/contact/contactgroup.html',
            controller: 'chatGroupCtrl',
            activetab: 'contact'
        }).when('/addgroup', {
            templateUrl: '../html/contact/addgroup.html',
            controller: 'addgroupCtrl',
            activetab: 'contact'
        }).when('/editcontactgroup/:any', {
            templateUrl: '../html/contact/editGroup.html',
            controller: 'editGroupCtrl',
            activetab: 'contact'
        }).when('/addcontact', {
            templateUrl: '../html/contact/addcontact.html',
            controller: 'addcontactCtrl',
            activetab: 'contact'
        }).when('/editcontact/:any', {
            templateUrl: '../html/contact/editContact.html',
            controller: 'editcontactCtrl',
            activetab: 'contact'
        }).when('/groupchat', {
            templateUrl: '../html/chat/groupchat.html',
            controller: 'grpchatCtrl',
            activetab: 'chat'
        }).when('/privatechat', {
            templateUrl: '../html/chat/privateChat.html',
            controller: 'privatechatCtrl',
            activetab: 'chat'
        }).otherwise({ redirectTo: '/login' });
}]);

textApp.controller('headerController', function($scope, $route) {
    $scope.$route = $route;
});

textApp.directive('validPasswordC', function() {
  return {
    require: 'ngModel',
    scope: {

      reference: '=validPasswordC'

    },
    link: function(scope, elm, attrs, ctrl) {
      ctrl.$parsers.unshift(function(viewValue, $scope) {

        var noMatch = viewValue != scope.reference
        ctrl.$setValidity('noMatch', !noMatch);
        return (noMatch)?noMatch:!noMatch;
      });

      scope.$watch("reference", function(value) {;
        ctrl.$setValidity('noMatch', value === ctrl.$viewValue);

      });
    }
  }
});

textApp.directive('customOnChange', function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      var onChangeFunc = scope.$eval(attrs.customOnChange);
      element.bind('change', onChangeFunc);
    }
  };
});
/*textApp = angular.module('textApp', ['textApp.controllers','datatables']);
  
  angular.module('textApp.controllers', []).controller('testController', function($scope,DTOptionsBuilder, DTColumnBuilder, $compile) {
  });*/

textApp.controller('appController', ['$scope', function($scope) {
$scope.$on('LOAD', function() { $scope.loader = true; });
$scope.$on('UNLOAD', function() { $scope.loader = false; });
}]);