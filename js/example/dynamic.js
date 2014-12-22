(function () {
    'use strict';
    
	var app = angular.module('dynamicForm', []);
	app.controller('formController', function ($scope) {
		this.checkRadio = function () {
            if ($scope.radio1 === 2) {
                $scope.$broadcast('require-input-text');
            } else if ($scope.radio1 === 1) {
                $("input").removeClass('required-input');
                $scope.$broadcast('input-text');
            }
        };
        this.submitForm = function () {
            $scope.$broadcast('check-require-input-text');
        };
        this.submit = false;
        this.isSubmit = function () {
            return this.submit;
        };
        this.onSubmit = function () {
            this.submit = true;
        };
	});
    app.controller('formController2', function ($scope) {
		this.checkRadio = function () {
            if ($scope.radio2 === 2) {
                $scope.$broadcast('require-input-text');
            } else if ($scope.radio2 === 1) {
                $scope.$broadcast('disabled-input-text');
                $scope.text = "";
            }
        };
        this.submitForm = function ($scope, $element, $attrs, ctrl) {
            if ($element.val() === "") {
                $element.toggleClass('required-input', true);
            } else {
                $element.removeClass('required-input');
            }
        };
        this.submit = false;
        this.isSubmit = function () {
            return this.submit;
        };
        this.onSubmit = function () {
            this.submit = true;
        };
	});
    app.controller('formController3', function ($scope) {
		this.submitForm = function ($scope, $element, $attrs, ctrl) {
            if ($element.val() === "") {
                $element.toggleClass('required-input', true);
            } else {
                $element.removeClass('required-input');
            }
        };
        this.submit = false;
        this.isSubmit = function () {
            return this.submit;
        };
        this.onSubmit = function () {
            this.submit = true;
        };
	});
    app.directive('receiverInput', function ($compile) {
        return {
            restrict: 'A',
            link: function ($scope, $element, $attrs, ctrl) {
                var inputType, inputTag;
                inputType = $attrs.type;
                inputTag = $attrs.receiverInput;
                if (inputType === 'text') {
                    $scope.$on(inputTag + '-require-input-text', function () {
                        $element.off('blur');
                        $element.on('blur', function () {
                            if ($element.val() === "") {
                                $element.toggleClass('required-input', true);
                            } else {
                                $element.removeClass('required-input');
                            }
                        });
                        $element.attr("required", true);
                        $element.attr("disabled", false);
                        $element.next().show();
                        $compile($element)($scope);
                        // when submit form
                        $scope.$on(inputTag + '-check-require-input-text', function () {
                            if ($element.attr("required")) {
                                $element.toggleClass('required-input', true);
                            } else {
                                $element.removeClass('required-input');
                            }
                        });
                        console.log(inputTag + '-require-input-text');
                    });
                    $scope.$on(inputTag + '-input-text', function () {
                        $element.off('blur');
                        $element.attr("required", false);
                        $element.removeClass('required-input');
                        $element.removeClass('ng-invalid-required');
                        $element.next().hide();
                        //$scope.$destroy('check-require-input-text');
                        $compile($element)($scope);
                        console.log(inputTag + '-input-text');
                    });
                    $scope.$on(inputTag + '-disabled-input-text', function () {
                        $element.toggleClass('required-input', false);
                        $element.attr("required", false);
                        $element.attr("disabled", true);
                        $compile($element)($scope);
                        $element.next().hide();
                        console.log(inputTag + '-disabled-input-text');
                    });
                }
                console.log(inputTag);
            }
        };
    });
    app.directive('senderInput', function () {
        return {
            restrict: 'A',
            link: function ($scope, $element, $attrs, ctrl) {
                var inputType, inputTag, isDisable;//value_true, value_false;
                inputType = $attrs.type;
                inputTag = $attrs.senderInput;
                inputType = $attrs.type;
                isDisable = ($attrs.isDisable) ? true : false;
                if (inputType === 'text') {
                    $element.on('blur', function () {
                        if ($element.val().length > 0) {
                            $scope.$broadcast(inputTag + '-require-input-text');
                        } else if ($element.val().length === 0) {
                            if (isDisable) {
                                $scope.$broadcast(inputTag + '-disabled-input-text');
                            } else {
                                $scope.$broadcast(inputTag + '-input-text');
                            }
                        }
                    });
                } else if (inputType === 'radio') {
                    //value_true = $attrs.; value_false = $attrs.;
                    $element.on('change', function () {
                        var value;
                        value = parseInt($(this).val(), 10);
                        if (value === 1) {
                            $scope.$broadcast(inputTag + '-require-input-text');
                            console.log(inputTag + '-require-input-text');
                        } else if (value === 0) {
                            if (isDisable) {
                                $scope.$broadcast(inputTag + '-disabled-input-text');
                                console.log(inputTag + '-disabled-input-text');
                            } else {
                                $scope.$broadcast(inputTag + '-input-text');
                                console.log(inputTag + '-input-text');
                            }
                        }
                        console.log("radio change" + $(this).val());
                    });
                }
                console.log("Tag :" + inputTag);
                console.log("isDisable :" + isDisable);
            }
        };
    });
})();