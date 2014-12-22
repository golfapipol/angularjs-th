(function (){
	var app = angular.module('application', []);
	app.controller('example1Controller', function ($scope, demoService) {
		$scope.data = demoService.getText();
		$scope.get = function () {
			$scope.data = demoService.getText();
		};
		$scope.set = function (data) {
			demoService.setText(data);
		};
	}).
	controller('example2Controller', function ($scope, demoService) {
		$scope.data = demoService.getText();
		$scope.get = function () {
			$scope.data = demoService.getText();
		};
		$scope.set = function (data) {
			demoService.setText(data);
		};
	}). 
	factory('demoService', function () {
		return {
			text: 'Hello AngularJS Service',
			getText: function () {
				return this.text;
			},
			setText: function (value) {
				this.text = value;
			}
		};
	});
})();