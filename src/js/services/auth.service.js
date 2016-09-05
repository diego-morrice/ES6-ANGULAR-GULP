export default class Authentication {
    constructor($q, $http, Storage, AppConstants, Utilidades){
        'ngInject';

        this._$q = $q;
        this._$http = $http;
        this._Storage = Storage;
        this._AppConstants = AppConstants;
        this._Utilidades = Utilidades;
    }

   sair() {
         this._Storage.excluir('autKey');
         this._Storage.excluir('pedido');
         this._Storage.excluir('planoEscolhido');
         this._Storage.excluir('clienteData');
         this._Storage.excluir('manterNumero');
         this._Storage.excluir('enderecoData');
         this._Storage.excluir('pedido');
         this._Storage.excluir("crivo");
    }

    dadosAutenticacao () {
        let autenticao = { autenticado: false, nome: '' }
        let dadosAutorizacao = storageService.get('autKey');

        if (dadosAutorizacao) {
            autenticao.autenticado = dadosAutorizacao.autenticado;
            autenticao.nome = dadosAutorizacao.usuario;
        }
        return autenticao;
    }

    entrar(dadosLogin) {

        let data = { usuario: dadosLogin.usuario, senha: dadosLogin.senha };
        let url = this._AppConstants.urlApiAuth + "autenticar";
        let deferred = $q.defer();

         this._$http({
                 url: url,
                 method: 'POST',
                 data: data, 
                 headers: { 'Content-Type':  'application/json' } 
                }).then(
                 (res) => {
                        if (!res.data.erro && res.data.autenticado)
                            this._Storage.atualizar('autKey',
                        {
                            autenticado: true, 
                            usuario: res.data.nome, 
                            mlcid: this._Utilidades.criptografar(dadosLogin.usuario),
                            mlpa: this._Utilidades.criptografar(dadosLogin.senha)
                        });

                        else this.sair();

                        deferred.resolve(_dadosAutenticacao());                        
                 },
                 (error) => {
                     this.sair();
                    deferred.reject(error);
                 });

        return deferred.promise;
    }
}