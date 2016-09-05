export default class Utilizadades{
    constructor() {
        
    }
  

    findElementFromArray (arr, propName, propValue) {
        for (var i = 0; i < arr.length; i++)
            if (arr[i][propName] === propValue)
                return arr[i];

        return null;
    }

    formatarMinutos (minutos, operadora) {

        if (minutos === '-' || minutos === '' || minutos == undefined)
            return minutos;
        else {


            if (operadora === "claro") {
                if (minutos.split(' ')[0] === "R$")
                    return '*' + minutos + ' em créditos para ligações';
                else {
                    return minutos.split(' ')[0];
                }

            } else if (operadora === "tim")
                if (minutos.split(' ')[0] === "R$")
                    return '*' + minutos + ' em créditos para ligações';
                else {
                    return minutos.split(' ')[0];
                }


            else if (operadora === "vivo") {
                if (minutos.split(' ').length === 2) {
                    if (minutos.split(' ')[0] === "R$")
                        return '*' + minutos + ' em créditos para ligações';
                    else return minutos.split(' ')[0];
                }

                return minutos.split(' ')[1];
            } else
                return "-";
        }

    }

  formatarValor (valor) {
        if (valor == undefined || valor === '')
            return 0;

        else return parseFloat(valor).toFixed(2).replace('.', ',');
    }

    criptografar (value) {
        return value.split('').reverse().join('');
    }

    decriptografar (value) {
        return value.split('').reverse().join('');
    }

    dddUf (uf) {
        let ufddds = {
            "AC": "68",
            "AL": "82",
            "AM": "92,97",
            "AP": "96",
            "BA": "71,73,74,75,77",
            "CE": "85,88",
            "DF": "61",
            "ES": "27,28",
            "GO": "61,62,64",
            "MA": "98,99",
            "MG": "31,32,33,34,35,37,38",
            "MS": "67",
            "MT": "65,66,67",
            "PA": "91,93,94",
            "PB": "83",
            "PE": "81,87",
            "PI": "86,89",
            "PR": "41,42,43,44,45,46",
            "RJ": "21,22,24",
            "RN": "84",
            "RO": "69",
            "RR": "95",
            "RS": "51,53,54,55",
            "SC": "47,48,49",
            "SE": "79",
            "SP": "11,12,13,14,15,16,17,18,19",
            "TO": "63"
        };

        if (uf) {
            return ufddds[uf];
        } else {
            return ufddds;
        }
    }
}
