
function AppRun(AppConstants, $rootScope) {
  'ngInject';

  //Altera o titulo da página baseado no state
  $rootScope.$on('$stateChangeSuccess', (event, toState) => {
    $rootScope.setPageTitle(toState.title);
  });

  //
  $rootScope.setPageTitle = (title) => {
    $rootScope.pageTitle = '';
    if (title) {
      $rootScope.pageTitle += title;
      $rootScope.pageTitle += ' \u2014 ';
    }
    $rootScope.pageTitle += AppConstants.appName;
  };
}

export default AppRun;
