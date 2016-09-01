import angular from 'angular';

import constants  from './config/app.constants';
import appConfig  from './config/app.config';
import appRun     from './config/app.run';
import 'angular-ui-router';

import './config/app.templates';

import './auth';

const requires = [
  'ui.router',
  'templates',
  'app.layout',
  'app.components',
  'app.home',
  'app.profile',
  'app.article',
  'app.services',
  'app.auth',
  'app.settings',
  'app.editor'];


window.app = angular.module('app', requires);

angular.module('app').config(appConfig);

angular.module('app').run(appRun);

angular.bootstrap(document, ['app'], {
  strictDi: true
});
