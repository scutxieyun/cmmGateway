const xml2js = require('xml2js')
const { fluxPropertyMap } = require("../propertyMap")
const parse = new xml2js.Parser({
  explicitArray: false
})

const soOrderPath = [
  "soapenv:Envelope",
  "soapenv:Body",
  'ws:putSalesOrderData',
  'soInfo',
  'wmsSOHeaders'
]
exports.parseXML = function (ws) {
  xml2js.parseString(ws, function (err, result) {
    console.log(result);
  });
}

function parseFluxSoap(msg, path) {
  return new Promise((resolve, reject) => {
    parse.parseString(msg, function(err, result){
      if (!err) {// && result["soapenv:Envelope"] !== undefined && result["soapenv:Envelope"]["soapenv:Body"] !== undefined) {
      resolve(extractOnPath(result, path)) //["soapenv:Envelope"]["soapenv:Body"])
      } else {
        reject(err)
      }
    })
  })
}

exports.putSalesOrderDataConv = function(msg) {
  return parseFluxSoap(msg, soOrderPath).then(d => {
    var res = fluxPropertyMap(d)
    var newDetails = res.detailsItem.map(d => {
      return fluxPropertyMap(d)
    })
    delete res.detailsItem
    res.details = newDetails
    return Promise.resolve(res)
  })
}


function extractOnPath(e, path) {
  var cur = e
  for(p in path) {
    if (cur[path[p]] !== undefined) {
      cur = cur[path[p]]
    } else {
      cur = undefined
      break
    }
  }
  return cur
}


exports.parseFluxSoap = parseFluxSoap
//出库单path
exports.soOrderPath = soOrderPath
