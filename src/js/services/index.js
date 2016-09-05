import angular from 'angular';

// Create the module where our functionality can attach to
let servicesModule = angular.module('app.services', []);


import UserService from './usuario.service';
servicesModule.service('Usuario', Usuario);

import ProfileService from './storage.service';
servicesModule.service('Storage', Storage);

export default servicesModule;
