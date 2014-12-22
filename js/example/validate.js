(function () {
    'use strict';
    
    var app = angular.module('demo', []);
    app.controller('demoBasicCtrl', ['$scope', function ($scope) {
        this.submit = false;
        this.isSubmit = function () {
            return this.submit;
        };
        this.onSubmit = function () {
            this.submit = true;
        };
    }]);
    app.controller('demoSpecificCtrl', ['$scope', function ($scope) {
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
})();