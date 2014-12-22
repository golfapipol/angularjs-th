angular.module('application', [])
	.service('helloWorldService', function () {
		this.sayHello = function () {
			return "Hello, World From service()";
		};
	})
	.factory('helloWorldFactory', function () {
		return {
			sayHello: function () {
				return "Hello, World From factory()"; 
			}
		};
	})
	.provider('helloWorld', function () {
		this.name = "";
		this.$get = function () {
			var name = this.name;
			return {
				sayHello: function () {
					return "Hello, " + name + " From provider()";
				}
			};
		};
		this.setName = function (name) {
			this.name = name;
		};
	})
	.config(function (helloWorldProvider) {
		helloWorldProvider.setName("World");
	})
	.controller('serviceDemo', function ($scope, helloWorldService, helloWorldFactory, helloWorld) {
		$scope.hellos = [
			helloWorldService.sayHello(),
			helloWorldFactory.sayHello(),
			helloWorld.sayHello()
		];
	});