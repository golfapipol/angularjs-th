angular.module('application', ['ui.router'])
    .config(function ($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/one');
	
        $stateProvider
            .state('one', {
                url: '/one',
                template: '<div style="background-color:lightblue"><p>this is state one</p><p ui-view></p>' +
				'<button class="btn btn-default" ng-click="linkTo(stateName)">State One.Two</button>' +
				'<button class="btn btn-default" ng-click="linkTo(stateName2)">State Three</button></div>',
				controller: function ($state, $scope) {
					$scope.stateName = "one.two";
					$scope.stateName2 = "three";
					$scope.linkTo = function (state) {
						console.log(state);
						$state.go(state);
					};
				}
            })
			.state('one.two', {
                url: '/two',
                template: '<p style="background-color:lightgreen">this is state one-two</p>'
            })
			.state('three', {
                url: '/three',
                template: '<p>this is state three</p>'
            });
    });