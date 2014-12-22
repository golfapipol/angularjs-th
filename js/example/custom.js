(function () {
    'use strict';
    
    var app = angular.module('demo', []);
    app.controller('demoCtrl', ['$scope', function ($scope) {
        this.submit = false;
        this.isSubmit = function () {
            return this.submit;
        };
        this.onSubmit = function () {
            this.submit = true;
        };
        this.comparePassword = function () {
            if (angular.equals($scope.password, $scope.matchpassword)) {
                $scope.form.matchpassword.$setValidity('matchValidate', true);
            } else {
                $scope.form.matchpassword.$setValidity('matchValidate', false);
            }
        };
    }]);
	app.controller('checkboxCtrl', ['$scope', function ($scope) {
        $scope.submit = false;
        this.error = 0;
        this.isSubmit = function () {
            return $scope.submit;
        };
        this.onSubmit = function (data) {
            $scope.submit = true;
            /*
            for(i=0;i<data.length;i++){
                console.log(data[i].name+":"+data[i].selected);
            }*/
        };
    }]);
    app.directive('checkboxGroup', ['$http', function ($http) {
        return {
            restrict: 'A',
            controller: function ($scope, $attrs) {
                var data, ngModels, minRequired, maxRequired, self;
                data = [];
                ngModels = [];
                self = this;
                /* get data from json or something...*/
                //$http.get(url).success(function(datasource){ data = datasource;});
                this.data = [
                    {name: 'red', selected: true},
                    {name: 'blue', selected: false},
                    {name: 'white', selected: false},
                    {name: 'black', selected: false},
                    {name: 'green', selected: false}
                ];
                $scope.$watch($scope.submit, function (value) {
                    self.validate();
                });
                /* Set Validation */
                self.validate = function () {
                    var checkCount, minRequiredValidity, maxRequiredValidity;
                    checkCount = 0;
                    angular.forEach(self.data, function (row) {
                        if (row.selected) {   checkCount += 1;   }
                    });
                    //console.log('minRequired', minRequired);console.log('maxRequired', maxRequired);console.log('checkedCount', checkCount);
                    minRequiredValidity = checkCount >= minRequired;
                    maxRequiredValidity = checkCount <= maxRequired;
                    angular.forEach(ngModels, function (ngModel) {
                        ngModel.$setValidity('checkboxGroupminRequired', minRequiredValidity, self);
                        ngModel.$setValidity('checkboxGroupmaxRequired', maxRequiredValidity, self);
                    });
                };
                /* set MinRequired & MaxRequired */
                $scope.$watch($attrs.minRequired, function (value) {
                    minRequired = parseInt(value, 10);
                    self.validate();
                });
                $scope.$watch($attrs.maxRequired, function (value) {
                    maxRequired = parseInt(value, 10);
                    self.validate();
                });
                
                /* init ngModel list */
                self.register = function (ngModel) {
                    ngModels.push(ngModel);
                };

                self.deregister = function (ngModel) {
                    var index = this.ngModels.indexOf(ngModel);
                    if (index !== -1) {
                        this.ngModels.splice(index, 1);
                    }
                };
            },
            controllerAs: 'checkboxes'
        };
    }]);
    app.directive('checkBox', function () {
        return {
            restrict: 'A',
            require: ['?^checkboxGroup', '?ngModel'],
            link: function ($scope, $element, $attrs, ctrl) {
                var checkboxGroup, ngModel;
                checkboxGroup = ctrl[0];
                ngModel = ctrl[1];
                if (checkboxGroup && ngModel) {
                    checkboxGroup.register(ngModel);
                    $scope.$watch(function () { return ngModel.$modelValue; }, checkboxGroup.validate);
                    // In case we are adding and removing checkboxes dynamically we need to tidy up after outselves.
                    $scope.$on('$destroy', function () { checkboxGroup.deregister(ngModel); });
                }
            }
        };
    });
    app.directive('personCard', function () {
        var directiveName, inputs, inputBoxes, directiveMaxLength, i, j;
        directiveName = "[person-card]";
        inputs = $(document).find(directiveName);
        inputBoxes = inputs.length;
        directiveMaxLength = 0;
        for (i = 0; i < inputBoxes; i += 1) {
            $(inputs[i]).attr('id', i);
            $(inputs[i]).attr('ng-pattern', "/^[0-9]+$/");
            $(inputs[i]).attr('required', true);
            directiveMaxLength += parseInt($(inputs[i]).attr('maxlength'), 10);
        }
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function ($scope, $element, $attrs, ctrl) {
                $element.on('keydown', function (event) {
                    var id, maxLength, length, key;
                    id = parseInt($element.attr('id'), 10);
                    maxLength = parseInt($element.attr('maxlength'), 10);
                    length = $element.val().length;
                    key = event.keyCode || event.charCode;
                    //console.log($element.getCursorPosition());
                    if (key === 8) {
                        if ((length === 0) && (id !== 0)) {
                            $(inputs[id - 1]).focus();
                        }
                    } else if (key === 9) {
                        
                    } else if (key === 37) {
                        if ($element.getCursorPosition() <= 1 && ((id) !== 0)) {
                            $(inputs[id - 1]).focusEnd();
                            event.preventDefault();
                        }
                    } else if (key === 39) {
                        if ($element.getCursorPosition() === maxLength && ((id + 1) !== (inputBoxes))) {
                            $(inputs[id + 1]).focusStart();
                            event.preventDefault();
                        }
                    } else {
                        if ((length === maxLength) && (id !== inputBoxes)) {
                            $(inputs[id + 1]).focus();
                        }
                    }
                });
                $element.on('blur', function () {
                    if (parseInt($element.attr('id'), 10) === (inputBoxes - 1)) {
                        var sum, sumdigit, digit, total, text;
                        sum = 0;
                        sumdigit = 0;
                        digit = 13;
                        total = 0;
                        for (i = 0; i < inputBoxes; i += 1) {
                            text = $(inputs[i]).val();
                            for (j = 0; j < text.length; j += 1) {
                                sum += (text[j] * digit);
                                digit -= 1;
                                sumdigit += 1;
                            }
                        }
                        total = ((11 - (sum % 11)) % 10);
						if (sumdigit !== 13) {
                            ctrl.$setValidity('personalValidate', false);
                            $(inputs).removeClass('ng-valid');
                            $(inputs).addClass('ng-invalid ng-invalid-personal-validate');
                        } else {
                            if (total === parseInt($(inputs[4]).val(), 10)) {
                                ctrl.$setValidity('personalValidate', true);
                                $(inputs).removeClass('ng-invalid ng-invalid-personal-validate');
                                $(inputs).addClass('ng-valid');
                            } else {
                                ctrl.$setValidity('personalValidate', false);
                                $(inputs).removeClass('ng-valid');
                                $(inputs).addClass('ng-invalid ng-invalid-personal-validate');
                            }
                        }
                    }
                    $scope.$apply();
                });
            }
        };
    });
    app.directive('creditCard', function () {
        var directiveName, inputs, inputBoxes, directiveMaxLength, i;
        directiveName = "[credit-card]";
        inputs = $(document).find(directiveName);
        inputBoxes = inputs.length;
        directiveMaxLength = 0;
        for (i = 0; i < inputBoxes; i += 1) {
            $(inputs[i]).attr('id', i);
            $(inputs[i]).attr('ng-pattern', "/^[0-9]+$/");
            $(inputs[i]).attr('required', true);
            directiveMaxLength += parseInt($(inputs[i]).attr('maxlength'), 10);
        }
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function ($scope, $element, $attrs, ctrl) {
                $element.on('keydown', function (event) {
                    var id, maxLength, length, key;
                    id = parseInt($element.attr('id'), 10);
                    maxLength = parseInt($element.attr('maxlength'), 10);
                    length = $element.val().length;
                    key = event.keyCode || event.charCode;
                    if (key === 8) {
                        if ((length === 0) && (id !== 0)) {
                            $(inputs[id - 1]).focus();
                        }
                    } else if (key === 9) { // Tab Key
                        // do nothing
                    } else if (key === 37) {
                        if ($element.getCursorPosition() <= 1 && (id !== 0)) {
                            $(inputs[id - 1]).focusEnd();
                            event.preventDefault();
                        }
                    } else if (key === 39) {
                        if ($element.getCursorPosition() === maxLength && ((id + 1) !== (inputBoxes))) {
                            $(inputs[id + 1]).focusStart();
                            event.preventDefault();
                        }
                    } else {
                        if ((length === maxLength) && (id !== inputBoxes)) {
                            $(inputs[id + 1]).focus();
                        }
                    }
                });
                $element.on('blur', function () {
                    if (parseInt($element.attr('id'), 10) === (inputBoxes - 1)) {
                        var sumdigit = 0;
                        for (i = 0; i < inputBoxes; i += 1) {
                            sumdigit += $(inputs[i]).val().length;
                        }
                        if (sumdigit > 12) {
                            ctrl.$setValidity('creditValidate', true);
                            $(inputs).removeClass('ng-invalid ng-invalid-credit-validate');
                            $(inputs).addClass('ng-valid');
                        } else {
                            ctrl.$setValidity('creditValidate', false);
                            $(inputs).removeClass('ng-valid');
                            $(inputs).addClass('ng-invalid ng-invalid-credit-validate');
                        }
                    }
                    $scope.$apply();
                });
            }
        };
    });
/* Jquery Function for cursor Start Here http://www.sitepoint.com/jquery-set-focus-character-range/ */
    //cursor functions
 
//set cursor position
    $.fn.setCursorPosition = function (position) {
        if (this.length === 0) {return this; }
        return $(this).setSelection(position, position);
    };
 
//set selection range
    $.fn.setSelection = function (selectionStart, selectionEnd) {
        var input, range;
        if (this.length === 0) {return this; }
        input = this[0];
 
        if (input.createTextRange) {
            range = input.createTextRange();
            range.collapse(true);
            range.moveEnd('character', selectionEnd);
            range.moveStart('character', selectionStart);
            range.select();
        } else if (input.setSelectionRange) {
            input.focus();
            input.setSelectionRange(selectionStart, selectionEnd);
        }

        return this;
    };
    $.fn.focusStart = function () {
        this.setCursorPosition(1);
    };
    $.fn.focusEnd = function () {
        this.setCursorPosition(this.val().length);
    };
// get current cursor in input   http://stackoverflow.com/questions/2897155/get-cursor-position-in-characters-within-a-text-input-field
    $.fn.getCursorPosition = function () {
        var input, sel, selLen;
        input = this.get(0);
        if (!input) { return; }// No (input) element found
        
        if ('selectionStart' in input) {
            // Standard-compliant browsers
            return input.selectionStart;
        } else if (document.selection) {
            // IE
            input.focus();
            sel = document.selection.createRange();
            selLen = document.selection.createRange().text.length;
            sel.moveStart('character', -input.value.length);
            return sel.text.length - selLen;
        }
    };
  /* Jquery Function for cursor End Here*/
})();