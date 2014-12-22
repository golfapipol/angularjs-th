angular.module('application', [])				
	.service('singletonService', function () {
		this.text = "First Text";
		this.setText = function (text) {
			this.text = text;
		};
		this.getText = function () {
			return this.text;
		};
	})
	.controller('testSingleton', function ($scope, singletonService) {
		$scope.showText = singletonService.getText();
		console.log(singletonService.getText());
		$scope.sendText = function (text) {
			singletonService.setText(text);
			$scope.showText = singletonService.getText();
			console.log(singletonService.getText());
		};
		
		$scope.receiveText = function () {
			$scope.showText = singletonService.getText();
		}
	});