'use strict'

const got = require('got');

// teste - retorno recall realizado
const recall_feito = '{"cod":200,"success":true,"message":"Request sucessfully!","data":{"board":"EUB-1828","chassi":"8AJFZ29G1B6139208","repairs":[{"campanha":"SSC38","causa":"SUBSTITUICAO BOLSA DO AIR BAG","cidadeConcessionaria":"JUAZEIRO DO NORTE","codigoConcessionaria":4233615,"codigoDenatran":"08012.004670\/2015-62","concessionaria":"NEWLAND VEICULOS LTDA","dataReparo":"23\/10\/2015 - 08:57","descricaoCampanha":"BOLSA AIRBAG MOTORISTA [OCT15]","duracao":2160,"enderecoConcessionaria":"AV PADRE CICERO, 2980, KM 02","modelo":"HILUX CD 4X4 SRV A\/T LEATHER","sequencial":0,"ufConsessionaria":"CE"}]}}'

// teste - retorno recall pendente
const recall_pendente = {
  "cod": 200,
  "success": true,
  "message": "Request sucessfully!",
  "data": {
    "board": "FPI3388",
    "chassi": "9BRB29BT4F2070251",
    "pending": [
      {
        "codigo": "SSC85",
        "descricao": "ETIOS AIRBAG MOTORISTA SUBSTITUICAO (JAN19)",
        "mensagem": "Campanha 0 : ETIOS AIRBAG MOTORISTA SUBSTITUICAO (JAN19). PENDENTE DE REPARO*Contate imediatamente a concessionáriamais próxima. ",
        "sequencial": 0,
        "aviso_risco": "https:\/\/www.toyota.com.br\/concessionarias\/"
      },
      {
        "codigo": "SSC86",
        "descricao": "ETIOS AIRBAG PASSAGEIRO SUBSTITUICAO (JAN19)",
        "mensagem": "Campanha 1 : ETIOS AIRBAG PASSAGEIRO SUBSTITUICAO (JAN19). PENDENTE DE REPARO*Contate imediatamente a concessionáriamais próxima. ",
        "sequencial": 1,
        "aviso_risco": "https:\/\/www.toyota.com.br\/concessionarias\/"
      }
    ],
    "repairs":[{"campanha":"SSC38","causa":"SUBSTITUICAO BOLSA DO AIR BAG","cidadeConcessionaria":"JUAZEIRO DO NORTE","codigoConcessionaria":4233615,"codigoDenatran":"08012.004670\/2015-62","concessionaria":"NEWLAND VEICULOS LTDA","dataReparo":"23\/10\/2015 - 08:57","descricaoCampanha":"BOLSA AIRBAG MOTORISTA [OCT15]","duracao":2160,"enderecoConcessionaria":"AV PADRE CICERO, 2980, KM 02","modelo":"HILUX CD 4X4 SRV A\/T LEATHER","sequencial":0,"ufConsessionaria":"CE"}]
  }
}

//'{"cod":200,"success":true,"message":"Request sucessfully!"}'
class SearchController {

    
    async searchRecall({request, view}){

        const apiToyota = 'https://www.toyota.com.br/portalwebagenda/api/v1/recall/search?param='

        const id_veiculo = request.input('veiculo')

        let url = apiToyota+id_veiculo

            try {
                 const veiculo = await got(url);
              
                 let detail = JSON.parse(veiculo.body)
              
                 //let detail = JSON.parse(recall_feito)
                 //let detail = recall_pendente

                //console.log("verifica_code: "+ detail["cod"])
                //console.log("verifica_status: "+ detail["success"])
               
                //console.log("objeto: "+ Object.entries(detail))
                //console.log("verifica_status: "+ Object.keys(detail['data']))
              
                if (detail["cod"] == 200 && detail["success"] == true) {

                    // console.log("teste: "+ Object.keys(teste))
                    //console.log("verifica 3: "+ Object.keys(detail['data']))

                    //Estrutura de uso JSON detail["data"]["repairs"][0] //["repairs"][0]["causa"]

                    return view.render('details', { 
                        
                        placa:detail["data"]["board"],
                        chassi: detail["data"]["chassi"],
                        msg: detail["message"],
                        recall_realizado: detail["data"]["repairs"],
                        recall: detail["data"]["pending"]
                      
                    })                     
                } else {
                    return view.render('without', {
                        cod: detail["cod"],
                        msg: detail["message"]
                    }
                  )
                }
                 
            } catch (error) {
                    console.log(error.veiculo);
                }
    }

}

module.exports = SearchController
