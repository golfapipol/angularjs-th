angular.module('application', ['ui.router'])
    .config(function ($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/one');
        $stateProvider
            .state('one', {
                url: '/one',
                template: '<p>this is state one</p><p ui-view></p>'
            })
			.state('one.two', {
                url: '/two',
                template: '<p>this is state one-two</p>'
            })
			.state('three', {
                url: '/three',
                template: '<p>this is state three</p>'
            });
    });