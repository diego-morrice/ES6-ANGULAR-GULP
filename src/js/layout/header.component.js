class HeaderApp{
    constructor($state, Authentication, Storage){   

        this._dados = {};
        this.pedidoAberto = false;
        this._Authentication = Authentication;
        this._Storage = Storage;
        this._$state = $state;
    }

    init() {
        
        let aut = autService.dadosAutenticacao();        
        this._dados.nome = aut.nome;
        this._dados.autenticado = aut.autenticado;
        
        let state = this._$state.current.name;
        this.pedidoAberto = (state === 'criar-pedido') ? false : true;
        this.cancelarPedido = (state === 'relatorio' || state === 'migracao' || state === 'portabilidade' || state === 'novaLinha' || state === 'criar-pedido') ? false : true;
        this.exibeRelatorio = state !== 'relatorio';

        let arrNovoPedido = ['relatorio', 'migracao', 'portabilidade', 'novaLinha'];
        this.pedidoAberto = arrNovoPedido.indexOf(state) >= 0;
    }

  sair () {
        this._Authentication.sair();
        this._$state.go('login');
    }

   novoPedido() {
        this._Storage.excluir('clienteData');
        this._Storage.excluir('manterNumero');
        this._Storage.excluir('enderecoData');
        this._Storage.excluir('pedido');
        this._Storage.excluir('planoEscolhido');
        this._Storage.excluir("crivo");
        this._$state.go('criar-pedido');
    }
    
    relatorio () {
        this._$state.go('relatorio');
    }
}

 