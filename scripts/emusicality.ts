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
        let fn: ng.Injectable<Function> = function ($log: ng.ILogService): void {
            $log.debug("emu:run");
        };
        fn.$inject = ["$log"];
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