class AuthCtrl {
  constructor(User, $state) {
    'ngInject';

    this._user = User;
    this._$state = $state;

    this.title = $state.current.title;
    this.authType = $state.current.name.replace('app.', '');

  }

  autenticar() {
    this.isSubmitting = true;

    this._user.autenticar(this.authType, this.formData).then(
      (res) => {
        this._$state.go('app.home');
      },
      (err) => {
        this.errors = err.data.errors;
        this.isSubmitting = false;
      }
    )
  }
}

export default AuthCtrl;
