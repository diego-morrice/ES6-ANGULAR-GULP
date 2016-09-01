export default class Usuario {
  constructor(AppConstants, $http, $state, $q) {
    'ngInject';
    
    this._AppConstants = AppConstants;
    this._$http = $http;
    this._$state = $state;
    this._$q = $q;
    this.atual = null;
    this.autenticado = false;   
  }


  autenticar(type, credentials) {
    let route = (type === 'login') ? '/autenticar' : '';
    return this._$http({
      url: this._AppConstants.urlApiAuth + route,
      method: 'POST',
      data:  credentials   
    }).then(
      (res) => {
        this.autenticado
        this.atual = { usuario : credentials.nome, senha: credentials.senha }
        return res;
      }
    );
  }

//   update(fields) {
//     return this._$http({
//       url:  this._AppConstants.api + '/user',
//       method: 'PUT',
//       data: { user: fields }
//     }).then(
//       (res) => {
//         this.current = res.data.user;
//         return res.data.user;
//       }
//     )
//   }

  sair() {
    this.atual = null;
    this._JWT.destroy();
    this._$state.go(this._$state.$current, null, { reload: true });
  }

  verifyAuth() {
    let deferred = this._$q.defer();

    // check for JWT token
    if (!this._JWT.get()) {
      deferred.resolve(false);
      return deferred.promise;
    }

    if (this.current) {
      deferred.resolve(true);

    } else {
      this._$http({
        url: this._AppConstants.api + '/user',
        method: 'GET',
        headers: {
          Authorization: 'Token ' + this._JWT.get()
        }
      }).then(
        (res) => {
          this.current = res.data.user;
          deferred.resolve(true);
        },

        (err) => {
          this._JWT.destroy();
          deferred.resolve(false);
        }
      )
    }

    return deferred.promise;
  }


  ensureAuthIs(bool) {
    let deferred = this._$q.defer();

    this.verifyAuth().then((authValid) => {
      if (authValid !== bool) {
        this._$state.go('app.home')
        deferred.resolve(false);
      } else {
        deferred.resolve(true);
      }

    });

    return deferred.promise;
  }

}
