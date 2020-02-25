"use strict";
var Application;
(function (Application) {
    var debugEnabled = true;
    function config() {
        var fn = function ($logProvider) {
            $logProvider.debugEnabled(debugEnabled);
        };
        fn.$inject = ["$logProvider"];
        return fn;
    }
    Application.config = config;
    ;
    function run() {
        var fn = function ($window, $log) {
            if ("serviceWorker" in $window.navigator) {
                $window.addEventListener("load", function () {
                    $window.navigator.serviceWorker
                        .register("/service-worker.js")
                        .then(function (registration) { return $log.debug("emu:sw:registered", registration); }, function (reason) { return $log.warn("emu:sw:failed", reason); });
                });
            }
        };
        fn.$inject = ["$window", "$log"];
        return fn;
    }
    Application.run = run;
    ;
    var Player;
    (function (Player) {
        var Controller = /** @class */ (function () {
            function Controller($scope) {
            }
            Controller.$inject = ["$scope"];
            return Controller;
        }());
        Player.Controller = Controller;
    })(Player = Application.Player || (Application.Player = {}));
})(Application || (Application = {}));
angular.module("emusicality", ["ngRoute", "ngSanitize"])
    .config(Application.config())
    .run(Application.run());
