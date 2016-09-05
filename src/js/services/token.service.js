export default class Token {
  constructor($http, Storage, AppConstants) {
    'ngInject';

    this._$http = $http;
    this._Storage = Storage;
    this._AppConstants;
  }  

    gerar(){

        let tks = this._Storage.obter('tksDT');

        if (!tks) {

            let dadosRequisicao = "grant_type=password&username=" + 'cd' + "&password=" + '859fad85-eb34-4b2a-9808-00fefa5a2fba';

             this._$http({
                 url: this._AppConstants.getUrlBase + 'api/security/token',
                 method: 'POST',
                 data: dadosRequisicao, 
                 headers: { 'Content-Type': 'application/x-www-form-urlencoded' } 
                }).then(
                 (res) => {
                  this._Storage.atualizar('tksDT', { token: response.access_token });
                 },
                 (error) =>
                 {
                     //_sair();
                 });
        }
    }
}




