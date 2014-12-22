angular.module('application', ['ui.router'])
	.config(function ($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('home', {
				url: '/home',
				template: '<p>this is part of home</p>'
			})
			.state('about', {
				url: '/about',
				template: '<p>this is part of about</p>'
			});
	});