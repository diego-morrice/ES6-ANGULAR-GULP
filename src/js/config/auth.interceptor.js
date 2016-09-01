function authInterceptor(AppConstants, $window, $q) {
  'ngInject'

  return {    
    request: function(config) {
      if(config.url.indexOf(AppConstants.urlApiRelatorios) === -1) {
        config.headers.Authorization = 'Bearer ' + JWT.get();
      }
      return config;
    },
   
    responseError: function(rejection) {
      if (rejection.status === 401) {
       
        $window.location.reload();
      }
      return $q.reject(rejection);
    }
  }
}

export default authInterceptor;
