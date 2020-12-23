const xml2js = require('xml2js')
const { fluxPropertyMap } = require("../propertyMap")
const FormData = require('form-data')
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
const asnDataPath = [
  "soapenv:Envelope",
  "soapenv:Body",
  'ws:putASNData',
  'asnInfo',
  'wmsASNHeaders'
]

const skuDataPath = [
  "soapenv:Envelope",
  "soapenv:Body",
  'ws:putSKUData',
  'skuInfo',
  'wmsSkuHeaders'
]

const custDataPath = [
  "soapenv:Envelope",
  "soapenv:Body",
  'ws:putCustData',
  'custInfo',
  'wmsCustHeader'
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
    if (!(res.detailsItem instanceof Array)) {
      res.detailsItem = [res.detailsItem] // 针对XML为一项的情况，强行转成数组
    }
    var newDetails = res.detailsItem.map(d => {
      return fluxPropertyMap(d)
    })
    delete res.detailsItem
    res.details = newDetails
    return Promise.resolve(res)
  })
}

function putCustDataFitTrans(xmljs) {
  let d = xmljs
  if (d.hasOwnProperty('soapenv:Envelope')) {
    d = extractOnPath(d, custDataPath)
  }
  const res = fluxPropertyMap(d, "fit")
  return res
}

function putSalesOrderDataFitTrans(xmljs) {
  let d = xmljs
  if (d.hasOwnProperty('soapenv:Envelope')) {
    d = extractOnPath(d, soOrderPath)
  }
  const res = fluxPropertyMap(d, "fit")
  if (!(res.detailsItem instanceof Array)) {
    res.detailsItem = [res.detailsItem] // 针对XML为一项的情况，强行转成数组
  }  
  var newDetails = res.detailsItem.map(d => {
    return fluxPropertyMap(d, "fit", 'item')
  })
  delete res.detailsItem
  res.details = newDetails
  return res
}

function putAsnDataFitTrans(xmljs) {
  let d = xmljs
  if (d.hasOwnProperty('soapenv:Envelope')) {
    d = extractOnPath(d, asnDataPath)
  }
  const res = fluxPropertyMap(d, "fit")
  if (!(res.detailsItem instanceof Array)) {
    res.detailsItem = [res.detailsItem] // 针对XML为一项的情况，强行转成数组
  }  
  var newDetails = res.detailsItem.map(d => {
    return fluxPropertyMap(d, "fit", 'item')
  })
  delete res.detailsItem
  res.details = newDetails
  return res
}

function putSKUDataFitTrans(xmljs) {
  let d = xmljs
  if (d.hasOwnProperty('soapenv:Envelope')) {
    d = extractOnPath(d, skuDataPath)
  }
  const res = fluxPropertyMap(d, "fit")
  return res
}

exports.putAsnDataConv = function(msg) {
  return parseFluxSoap(msg, asnDataPath).then(d => {
    return Promise.resolve(putAsnDataFitTrans(d))
  })
}

exports.rspToXML = function rspToXML(rsp) {
  let builder = new xml2js.Builder();
  const wrap = {
    "SOAP-ENV:Envelope":{"$":{"xmlns:SOAP-ENV":"http://schemas.xmlsoap.org/soap/envelope/",
                              "xmlns:ns1":"http://ws.webservices.services.adapter.datahub/"},
                        "SOAP-ENV:Header":"",
    "SOAP-ENV:Body": rsp}
  }
  const xml = builder.buildObject(wrap);
//<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
  return xml.substring(56).replace(/(\ |\n)+/g,"") //将上面的字符串去掉
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

/**
重写富勒的请求路由，目标
根据请求的warehouseNo, CustomerNo，请求函数，对其进行路由
除了，路由，这个函数还会往ctx写入转换后的json报文
*/

function routeFluxReq(ctx) {
  parse.parseStringPromise(ctx.body)
    .then(result => {
      
    })
}

function extractSoapMethod(msg) {
 const soapPath = [
  "soapenv:Envelope",
  "soapenv:Body"
 ]
 const op = extractOnPath(msg, soapPath)
 for (const k in op) {
  if (k.indexOf('ws:') === 0) {
    //匹配方法 ws:putSKUData
    return k.substr(3)
  }
 }
 return undefined
}
exports.parseFluxSoap = parseFluxSoap
exports.extractSoapMethod = extractSoapMethod
exports.putAsnDataFitTrans = putAsnDataFitTrans
exports.putSKUDataFitTrans = putSKUDataFitTrans
exports.putCustDataFitTrans = putCustDataFitTrans
exports.putSalesOrderDataFitTrans = putSalesOrderDataFitTrans
//出库单path
exports.soOrderPath = soOrderPath
