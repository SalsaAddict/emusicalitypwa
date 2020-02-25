namespace Application {
    const debugEnabled: boolean = true;
    export function config(): ng.Injectable<Function> {
        let fn: ng.Injectable<Function> = function ($logProvider: ng.ILogProvider): void {
            $logProvider.debugEnabled(debugEnabled);
        };
        fn.$inject = ["$logProvider"];
        return fn;
    };
    export function run(): ng.Injectable<Function> {
        let fn: ng.Injectable<Function> = function ($window: ng.IWindowService, $log: ng.ILogService): void {
            if ("serviceWorker" in $window.navigator) {
                $window.addEventListener("load", function () {
                    $window.navigator.serviceWorker
                        .register("/service-worker.js")
                        .then(registration => $log.debug("emu:sw:registered", registration),
                            reason => $log.warn("emu:sw:failed", reason));
                });
            }
        };
        fn.$inject = ["$window", "$log"];
        return fn;
    };
    export namespace Player {
        export class Controller implements ng.IController {
            static $inject: string[] = ["$scope"];
            constructor($scope: ng.IScope) { }
        }
    }
}

angular.module("emusicality", ["ngRoute", "ngSanitize"])
    .config(Application.config())
    .run(Application.run());