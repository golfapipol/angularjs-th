angular.module('application', ['ui.router'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
			.state('abstract', {
				url: '/home',
				abstract: true,
				template: '<div style="background-color:green"><h2 ui-view="firstView"></h2></div>' +
				'<div style="background-color:red"><p ui-view="secondView"></p></div>'
			})
            .state('abstract.home', {
				views: {
					firstView: {
						template: '<u>{{text}}</u>',
						controller: function ($scope) {
							$scope.text = "firstView in Home1";
						}
					},
					secondView: {
						template: '<strong>{{text}}</strong>',
						controller: function ($scope) {
							$scope.text = "secondView in Home1";
						}
					}
				}
			})
			.state('abstract.home2', {
				url: '/home2',
				views: {
					firstView: {
						template: '<u>{{text}}</u>',
						controller: function ($scope) {
							$scope.text = "firstView in Home2";
						}
					},
					secondView: {
						template: '<strong>{{text}}</strong>',
						controller: function ($scope) {
							$scope.text = "secondView in Home2";
						}
					}
				}
			})
            .state('contact', {
                url: '/contact',
                template: '<h3>This is Contact</h3>' +
                    '<ul>' + '<li ng-repeat="contact in contacts">' +
                    '<a ui-sref="contact.detail({ id : contact.name})">{{contact.name}}</a>' + '</li></ul>' +
                    '<div ui-view></div>',
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
			.state('contact.detail', {
                url: '/detail/:id',
                template: '<p>{{contact.name}} (age: {{contact.age}}) e-mail: {{contact.email}}</p>',
                resolve: {
                    contact: function ($http, $stateParams) {
                        return $http({method: 'GET', url: 'contacts.json'})
                            .then(function (response) {
                                for (i = 0; i  < response.data.length; i++) {
									if (response.data[i]["name"] === $stateParams.id) {
										return response.data[i];
                                    }
                                }
                            });
                    }
                },
                controller: function ($scope, contact) {
                    $scope.contact = contact;
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