import angular from 'angular';

// Importa as configurações do app
import constants  from './config/app.constants';
import appConfig  from './config/app.config';
import appRun     from './config/app.run';

//Importa as bibliotecas externas
import 'angular-ui-router';
import 'ngstorage';

//gerado pelo Gulp
import './config/app.templates';

// Importa as funcionalidades do app
import './auth';

const requires = [
  'ui.router',
  'ngStorage',
  'templates',  
//   'ui.bootstrap', 
//   'ui.mask', 
//   'ngMessages', 
//   'ngTouch', 
//   'ngAnimate', 
//   'angularSpinner',
  'app.auth',
  'app.services'
  ];

window.app = angular.module('app', requires);

angular.module('app').config(appConfig);

angular.module('app').run(appRun);

angular.bootstrap(document, ['app'], {
  strictDi: true
});
