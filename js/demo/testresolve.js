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
                    alert($state.current.data.message);
                }
            })
            .state('contact', {
                url: '/contact/:contactId',
                template: '<h3>This is Contact</h3>' +
                    '<ul>' + '<li ng-repeat="contact in contacts">' +
                    '<a ui-sref="contact.detail({ id : contact.name})">{{contact.name}}</a>' + '</li></ul>' +
                    '<div ui-view></div>',
                resolve: {
                    contacts: function ($http, $stateParams) {
                        return $http({method: 'GET', url: 'contacts.json'})
                            .then(function (response) {
								console.log("Resolve contacts $stateParams");
								console.log($stateParams);
                                return response.data;
                            });
                    }
                },
                controller: function ($scope, contacts, $stateParams) {
					console.log("Controller contacts $stateParams");
					console.log($stateParams);
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
								console.log("Resolve contact.detail $stateParams");
								console.log($stateParams);
                                for (i = 0; i  < response.data.length; i++) {
									if (response.data[i].name === $stateParams.id) {
										return response.data[i];
                                    }
                                }
                            });
                    }
                },
                controller: function ($scope, contact, $stateParams) {
					console.log("Controller contacts.detail $stateParams");
                    console.log($stateParams);
                    $scope.contact = contact;
                }
            })
            .state('about', {
                url: '/about',
                template: '<p>Creator is {{name}}</p>',
				resolve: {
					oldParams: function ($stateParams) {
						console.log("Resolve About $stateParams");
						console.log($stateParams);
						return $stateParams;
					}
				},
                controller: function ($scope, $stateParams, oldParams) {
					console.log("Controller About $stateParams");
					console.log($stateParams);
					console.log("Controller About from $stateParams in resolve");
					console.log(oldParams)
                    $scope.name = "Google!!";
                }
            });
    });