angular.module('clothing',
    [
        // External Dependencies
        'ngRoute',
        'oc.lazyLoad',
        'ui.bootstrap',
        'angularFileUpload',
        'ngIdle',
        'cfp.hotkeys',

        'admin',
        'product',

]).config(function($routeProvider, IdleProvider, KeepaliveProvider, $controllerProvider) {
  // configure Idle settings
  IdleProvider.idle(3600); // in seconds
  IdleProvider.timeout(5); // in seconds
  KeepaliveProvider.interval(2); // in seconds
  $controllerProvider.allowGlobals();
  $routeProvider
})
.run(function(Idle){
  // start watching when the app runs. also starts the Keepalive service by default.
  Idle.watch();
});