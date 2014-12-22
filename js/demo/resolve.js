angular.module('application', ['ui.router'])
	.config(function ($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('home', {
				url: '/home',
				template: '<p>this is part of home</p>',
				data: {
					message: "Welcome Home"
				},
				controller: function ($state) {
					console.log($state);
					alert($state.current.data.message);
				}
			})
			.state('contact', {
				url: '/contact',
				template: '<h3>This is Contact</h3>' +
					'<ul><li ng-repeat="contact in contacts">{{contact.name}}' +
					'(Age: {{contact.age}}) E-Mail: {{contact.email}}</li></ul>',
				resolve: {
					contacts: function ($http) {
						return $http({method: 'GET', url: 'contacts.json'})
							.then(function (response) {
								return response.data;
							});
					}
				},
				controller: function ($scope, contacts) {
					$scope.contacts = contacts;
				}
			})
			.state('about', {
				url: '/about',
				template: '<p>Creator is {{name}}</p>',
				controller: function ($scope) {
					$scope.name = "Google!!";
				}
			});
	});