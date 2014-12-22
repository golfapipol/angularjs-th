(function () {
    'use strict';
    
    var app = angular.module('demo2', []);
    app.controller('demo2AdvanceCtrl', function () {
        this.submit = false;
        this.isSubmit = function () {
            return this.submit;
        };
        this.onSubmit = function () {
            this.submit = true;
        };
    });
    app.controller('demo2CustomCtrl', function () {
        this.submit = false;
        this.isSubmit = function () {
            return this.submit;
        };
        this.onSubmit = function () {
            this.submit = true;
        };
    });
    app.directive('phone', function ($compile) {
        return {
            restrict: 'A',
            require: 'ngModel',
			link: function ($scope, $element, $attrs, ctrl) {
				$element.on('blur', function () {
                    var text, firstCode, secondCode, thirdCode, phoneNo, regex;
					// get text convert to phone format
					text = $element.val();
					text = text.replace(/([()\-])/g, "");
					if (text.length === 9 || text.length === 10) {
						firstCode = text.slice(0, 3);
						secondCode = text.slice(3, 6);
						thirdCode = text.slice(6, text.length);
						phoneNo = "(";
						text = phoneNo.concat(firstCode, ")-", secondCode, "-", thirdCode);
					} else {
						ctrl.$setValidity('phoneValidate', false);
					}
					// valid text only number and -,(),+ with something behind
					regex = /\(([0-9]{3})\)*-([0-9]{3})*-([0-9]{3,4})/;
					// check is it valid ?
					if (regex.test(text)) {
						ctrl.$setValidity('phoneValidate', true);
					} else {
						ctrl.$setValidity('phoneValidate', false);
					}
					$element.val(text);
					// view -> model 
					$scope.$apply();
				});
				$element.on('focus', function () {
					var text = $element.val();
					text = text.replace(/([\-\(\)])/g, "");
					$element.val(text);
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