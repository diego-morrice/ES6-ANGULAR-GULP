'use strict';

var headerController = function ($state, autService, storageService) {
    var hc = this;
    var _dados = {};
    hc.pedidoAberto = false;

    var _init = function () {
        var aut = autService.dadosAutenticacao();
        
        _dados.nome = aut.nome;
        _dados.autenticado = aut.autenticado;
        
        var state = $state.current.name;
        hc.pedidoAberto = (state === 'criar-pedido') ? false : true;
        hc.cancelarPedido = (state === 'relatorio' || state === 'migracao' || state === 'portabilidade' || state === 'novaLinha' || state === 'criar-pedido') ? false : true;
        hc.exibeRelatorio = state !== 'relatorio';

        var arrNovoPedido = ['relatorio', 'migracao', 'portabilidade', 'novaLinha'];
        hc.pedidoAberto = arrNovoPedido.indexOf(state) >= 0;
    };

    var _sair = function () {
        autService.sair();
        $state.go('login');
    };
    var _novoPedido = function () {
        storageService.excluir('clienteData');
        storageService.excluir('manterNumero');
        storageService.excluir('enderecoData');
        storageService.excluir('pedido');
        storageService.excluir('planoEscolhido');
        storageService.excluir("crivo");
        $state.go('criar-pedido');
    }
    var _relatorio = function () {
        $state.go('relatorio');
    }

    hc.init = _init;
    hc.novoPedido = _novoPedido;
    hc.relatorio = _relatorio;
    hc.dados = _dados;
    hc.sair = _sair;
}

headerController.$inject = ['$state', 'autService', 'storageService'];

app
  .controller('headerController', headerController);
