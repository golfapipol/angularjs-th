angular.module('application', [])
    .controller('demoController', function ($scope) {
        $scope.choice = "true";
        $scope.toggle = function () {
            if ($scope.choice === "true") {
                $scope.choice = "false";
            } else {
                $scope.choice = "true";
            }
        };
    })
    .directive('timer', function ($timeout) {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                var timer = $timeout( 
                    //wait 2 sec and do this function 
                    function () {
                        console.log("Timeout Executed", Date.now());
                    },
                    2000 
                );
                 
                timer.then(
                    //if timer is executed
                    function () {
                        console.log("Timer resolved!", Date.now());
                    },// else timer is not executed
                    function () {
                        console.log("Timer rejected!!", Date.now());
                    }
                );
                 
                scope.$on("$destroy", function (event) {
                    $timeout.cancel(timer);
                });
            }
        };
    });