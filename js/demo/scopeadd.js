(function () {
    var app = angular.module("application", []);
     
    app.controller("demoController", function ($scope) {
     	$scope.doIt = function (data) {
			alert(data);
		};
    });
    app.directive("developer", function () {
        return {
            restrict: 'E',
			scope: {
                task: '&',
				name: '@'
            },
            template: '<div><p>{{name}}</p><input type="text" ng-model="work" /><button ng-click="task({message:work})">Go to Work</button></div>'
        };
    });
     
})(); 