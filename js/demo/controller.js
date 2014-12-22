angular.module('application', ['application.son'])
	.directive('dadDirective', function () {
		return {
			restrict: 'E',
			template: '<div>'+
				'<ul><li>son.message is {{son.message}}</li>' +
				'<li>scope.message is {{message}} </li>'+
				'<li><son-directive></son-directive></li>'+
				'</ul></div>',
			controller: function ($scope) {
				$scope.message = "[ScopeDad Data]";
				this.message = "[Dad Data]";
			},
			controllerAs: 'dad'
		};
	});
angular.module('application.son', [])
	.directive('sonDirective', function () {
		return {
			restrict: 'E',
			template: 
				'<ul><li>dad.message is {{dad.message}}</li>' +
				'<li>scope.message is {{message}} </li></ul>',
			controller: function ($scope) {
				$scope.message = "[ScopeSon Data]";
				this.message = "[Son Data]";
			},
			controllerAs: 'son'
		};
	});