angular.module('application', ['ui.router'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('one', {
                url: '/one',
                template: '<p>this is state one</p><p ui-view></p>',
				onEnter: function () {
					console.log("[onEnter]State One onEnter");
				},
				onExit: function () {
					console.log("[onExit]State One onExit");
				},
				controller: function () {
					console.log("[controller]State One Controller");
				}
			
            })
			.state('one.two', {
                url: '/two',
                template: '<p>this is state one-two</p>',
				onEnter: function () {
					console.log("[onEnter] State One.Two onEnter");
				},
				onExit: function () {
					console.log("[onExit] State One.Two onExit");
				}
            })
			.state('three', {
                url: '/three',
                template: '<p>this is state three</p>',
				onEnter: function () {
					console.log("[onEnter] State Three onEnter");
				},
				onExit: function () {
					console.log("[onExit] State Three onExit");
				},
				controller: function () {
					console.log("[controller] State Three Controller");
				}
            });
    })
	.run(function ($state, $rootScope) {
		// State Change Event
		$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
			console.log("[$stateChangeStart] From: ", (fromState.name) ? fromState.name: "No State", "To: ", toState.name);
		});
		$rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
			console.log("[$stateChangeSuccess] From: ", (fromState.name) ? fromState.name: "No State", "To: ", toState.name);
		});
		// View Loading Event
		$rootScope.$on('$viewContentLoading', function (event, viewConfig) { 
    		console.log("[$viewContentLoading] View Loading...");
		});
		$rootScope.$on('$viewContentLoaded', function (event) { 
    		console.log("[$viewContentLoaded] Loaded Complete");
		});
		
		
	});