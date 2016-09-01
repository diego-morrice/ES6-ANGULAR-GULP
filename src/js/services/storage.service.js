export default class Storage {
  constructor($localStorage, $sessionStorage, tipo) {
    'ngInject';

    this._tipo = tipo;
    this._$localStorage = $localStorage;
    this._$sessionStorage = $sessionStorage;
  } 

  obter(nome)
  {
      if ( this._tipo === 'session')
            return eval("$sessionStorage." + nome); 
      else if (this._tipo === 'local')
            return eval("$localStorage." + nome);
  }

  atualizar(nome, valor)
  {
      if (tipo === 'session')
            $sessionStorage[k] = valor;
      else if (tipo === 'local')
            $localStorage[k] = valor;
  }

  excluir(nome)
  {
      if (tipo === 'session')
            eval("delete $sessionStorage." + nome + ";");
      else if (tipo === 'local')
            eval("delete $localStorage." + nome + ";");
  }
}

