(function () {
    'use strict';
    
	var app = angular.module('dynamicForm', []);
	app.controller('formController', function ($scope, $compile) {
		$scope.sendedMessage = [];
        $scope.data = {
            wantDebit: false,
            wantMail: false,
            address: "",
            email: "",
            moneyvalue: "",
            cardtype: "",
            mailType: null
        };
        $scope.default_data = angular.copy($scope.data);
        $scope.submit = false;
        $scope.isSubmit = function () {
            return $scope.submit;
        };
        $scope.send = function (logic) {
            console.log("send");
            if (!logic) {
                $scope.sendedMessage.push($scope.data);
                $scope.data = angular.copy($scope.default_data);
                $scope.submit = false;
                $scope.form.$setPristine();
            }
        }
        $scope.reset = function () {
            $scope.data = angular.copy($scope.default_data);
            $scope.submit = false;
            $scope.form.$setPristine();
        }
        $scope.onSubmit = function (form) {
            console.log(form);
            $scope.submit = true;
            
        };
	});
    app.directive('ngClear', function ($compile) {
       return {
            restrict: 'A',
            scope: {
                logic: '=ngClear'
            },
            require: 'ngModel',
            link: function ($scope, $element, $attrs, ngModel) {
                if(!ngModel) return; // do nothing if no ng-model
                $scope.$watch(function () { return $scope.logic; }, function (newData) {
                    if (newData === true) {
                        if ( $element.attr('type') === 'text') {
                            ngModel.$setViewValue(null);
                            $element.val('');
                        } else if ($element.attr('type') === 'radio') {
                            ngModel.$setViewValue(null);
                        }
                        ngModel.$setPristine();
                        ngModel.$render();
                    }
                });
            }
       };
    });
    app.directive('money', function ($compile) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function ($scope, $element, $attrs, ctrl) {
                var text, temp, money, point, regex;
                point = parseInt($attrs.point, 10);
                $element.on('blur', function () {
                    text = $element.val();
                    regex = /^[0-9\.\,\-()+]+$/;
                    if (text !== "" && regex.test(text)) {
                        text = text.replace(/,/g, '');
                        money = parseFloat(text).toFixed(point).replace(/(\d)(?=(\d{3})+\b)/g, '$1,');
                        $element.val(money);
                        ctrl.$setValidity('moneyValidate', true);
                    } else {
                        ctrl.$setValidity('moneyValidate', false);
                    }
				});
				$element.on('focus', function () {
					text = $element.val();
                    text = text.replace(/,/g, '');
                    text = text.replace(/\.00/, '');
                    $element.val(text);
				});
            }
        };
    });
})();