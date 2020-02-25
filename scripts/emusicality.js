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
        var fn = function ($log) {
            $log.debug("emu:run");
        };
        fn.$inject = ["$log"];
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
