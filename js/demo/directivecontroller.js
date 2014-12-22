(function () {
	'use strict';
	
	var app = angular.module('application', ['application.test']);
	app.directive('demoDirective', function (){
		return {
			restrict: 'E',
			template: 
		'<div style="color:green">demo Directive'+
			'<input type="text" ng-model="test"/>'+
			'<p>test is {{test}}</p>'+
			   '<input type="text" ng-model="demo.test" />'+
			 '  <p>demo.test is {{demo2.test}}</p>'+
			'<test-directive></test-directive>'+
		'</div>',
			controller: function ($scope) {
				var test = '111';
				this.test = '222';
				$scope.test = '333';
			},
			controllerAs: 'demo'
		};
	});
	angular.module('application.test', []).directive('testDirective', function (){
		return {
			restrict: 'E',
			template: 
		'<div style="color:red">test Directive'+
			'<input type="text" ng-model="test"/>'+
			'<p>test is {{test}}</p>'+
			   '<input type="text" ng-model="demo.test" />'+
			 '  <p>demo.test is {{demo.test}}</p>'+
		'</div>',
			controller: function ($scope) {
				var test = '444';
				this.test = '555';
				$scope.test = '666';
			},
			controllerAs: 'demo2'
		};
	})
	
})();