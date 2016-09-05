import angular from 'angular';

// Create the module where our functionality can attach to
let servicesModule = angular.module('app.services', []);


import Storage from './storage.service';
servicesModule.service('Storage', Storage);

// import UserService from './usuario.service';
// servicesModule.service('Usuario', Usuario);

import Token from './token.service';
servicesModule.service('Token', Token);

import Utilidades from './utilidades.service';
servicesModule.service('Utilidades', Utilidades);

import Authentication from './auth.service';
servicesModule.service('Authentication', Authentication);


export default servicesModule;
