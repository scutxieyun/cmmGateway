const xml2js = require('xml2js')
const parse = new xml2js.Parser({
  explicitArray: false
})
exports.parseXML = function (ws) {
  xml2js.parseString(ws, function (err, result) {
    console.log(result);
  });
}

//出库单path
exports.soOrderPath = [
  "soapenv:Envelope",
  "soapenv:Body",
  'ws:putSalesOrderData',
  'soInfo',
  'wmsSOHeaders'
]

exports.parseFluxSoap = function(msg, path) {
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