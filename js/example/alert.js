(function () {
    'use strict';
    
    var app = angular.module('demoalert', []);
    app.controller('alertCtrl', ['$scope', function ($scope) {
        $scope.submit = false;
        
        this.isSubmit = function () {
            return $scope.submit;
        };
    }]);
    app.directive('alertDirective', function () {
        
        return {
            restrict: 'E',
            template: '<div class="alert alert-danger ng-binding" role="alert">You missed {{error}} fields. They have been highlighted</div>',
            controller: function ($scope, $element, $attrs, $location) {
                $scope.error = 0;
                $element.hide();
                $scope.onSubmit = function () {
                    $scope.submit = true;
                    var error = $(".ng-invalid").length - 1;
                    if (error > 0) {
                        $element.attr('error', error);
                        $scope.error = error;
                        $element.show();
                    } else {
                        $element.hide();
                    }
                };
            }
        };
    });
})();