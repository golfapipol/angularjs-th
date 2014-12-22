angular.module('application', [])
    .controller('demoController', function ($scope) {
        $scope.foo = 0;
        $scope.bar = 0;
		$scope.addCount = function () {
			$scope.foo++;	
			$scope.bar++;	
		};
    })
    .directive('clickable', function () {
        return {
            restrict:'E',
            template: '<ul style="background-color: lightblue"><li>{{foo}}</li><li>{{bar}}</li></ul>',
            link: function (scope,element,attr) {
                element.bind('click', function () {
                    scope.foo++;
                    scope.bar++;
				});
            }
        };
    })
	.directive('clickableApply', function () {
        return {
            restrict:'E',
            template: '<ul style="background-color: lightgreen"><li>{{foo}}</li><li>{{bar}}</li></ul>',
            link: function (scope,element,attr) {
                element.bind('click', function () {
                    scope.$apply(function () {
						scope.foo++;
						scope.bar++;
					});
                });
            }
        };
    });