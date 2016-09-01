import authInterceptor from './auth.interceptor'

function AppConfig($httpProvider, $stateProvider, $locationProvider, $urlRouterProvider) {
  'ngInject';

  $httpProvider.interceptors.push(authInterceptor);

 //Removendo '#' das urls
  $locationProvider.html5Mode(true);

  $stateProvider
  .state('app', {
    abstract: true,
    templateUrl: 'layout/app-view.html',
    // resolve: {
    //   auth: function(Usuario) {
    //     return Usuario.autenticado();
    //   }
    // }
  });

  $urlRouterProvider.otherwise('/');

}

export default AppConfig;
