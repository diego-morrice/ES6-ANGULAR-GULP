class AuthCtrl {
  constructor(Usuario, $state) {
    'ngInject';

    this._usuario = Usuario;
    this._$state = $state;

    this.titulo = $state.current.title;
    this.authTipo = $state.current.name.replace('app.', '');

  }

  autenticar() {
    this.autenticando = true;

    this._usuario.autenticar(this.authTipo, this.formData).then(
      (res) => {
        this._$state.go('app.home');
      },
      (err) => {
        this.errors = err.data.errors;
        this.autenticando = false;
      }
    )
  }
}

export default AuthCtrl;
