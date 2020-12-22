const router = require('koa-router')()
const xml2js = require('xml2js')
const axios = require('axios')
const url = require('url');
const config = require('../modules/config')
const { putCustDataFitTrans, putSKUDataFitTrans, putAsnDataFitTrans, putSalesOrderDataFitTrans, rspToXML, parseFluxSoap, extractSoapMethod } = require("../modules/ws2rest")
const parse = new xml2js.Parser({
  explicitArray: false
})

console.log(config)
router.post('/datahubWeb/WMSSOAP/FLUXWS', async (ctx, next) => {
  const xmlBody = ctx.request.body
  if (config.forceFlux) {
    return transToFlux(xmlBody, ctx)
  }
  //铁定是xml，转一下看
  return parseFluxSoap(xmlBody, []).then(res => {
    const sm = extractSoapMethod(res)
    if (sm === undefined) return Promise.reject("soap method 不规范")
    if (config.methods4Fit.find(d => sm === d) === undefined) {
      return transToFlux(xmlBody, ctx)
    }
    console.log('trans to fit')
    if (sm === 'putASNData') {
      return handlePutASNData(res, ctx)
    }
    if (sm === 'putSalesOrderData') {
      return handlePutSalesOrderData(res, ctx)
    }
    if (sm === 'putSKUData') {
      return handlePutSKUData(res, ctx)
    }
    if (sm === 'putCustData') {
      return handlePutCustData(res, ctx)
    }
    return Promise.reject("不可识别的SOAP方法" + sm)
  }).catch(msg => {
    ctx.response.body = "错误" + msg
  })
})

function transToFlux(xmlBody, ctx) {
  console.log('transparent to flux')
  return axios.post(config.fluxHost + '/datahubWeb/WMSSOAP/FLUXWS', xmlBody, {
    headers: {
      'Content-Type': 'text/xml'
    }
  }).then(d => {
    if (d.status === 200 && d.data !== undefined) {
      return ctx.response.body = d.data
    } else {
      return Promise.reject('flux 系统错误')
    }
  }).catch(d => {
    let err = '系统错误'
    if (typeof d === 'string') {
      err = d
    } else {
      console.log(d)
    }
    ctx.response.body = rspToXML({"ns1:putCustDataResponse":{"return":{
            returnCode: '0001',
            returnDesc: err,
            returnFlag: 0
          }
    }})
  })
}

function handlePutCustData(xmljs, ctx) {
  const res = putCustDataFitTrans(xmljs)
  const params = new url.URLSearchParams(res)
  console.log(xmljs, res, params)
  return axios.post("http://39.108.1.180:7022/wms/external/business/Interface_ERP_Import_Consignee", 
    params).then(d => {
      if (d.data !== undefined && d.data.Success === true) {
          ctx.response.body = rspToXML({"ns1:putCustDataResponse":{"return":{
            returnCode: '0000',
            returnDesc: '成功',
            returnFlag: 1
          }
         }})
      } else {
          ctx.response.body = rspToXML({"ns1:putCustDataResponse":{"return":{
            returnCode: '0001',
            returnDesc: d.data.Msg,
            returnFlag: 0
          }
         }})
      }
    })
}
function handlePutSKUData(xmljs, ctx){
  const res = putSKUDataFitTrans(xmljs)
  const params = new url.URLSearchParams(res)
  console.log(params)
  return axios.post("http://39.108.1.180:7022/wms/external/business/Interface_ERP_Import_Goods", 
    params).then(d => {
      if (d.data !== undefined && d.data.Success === true) {
          ctx.response.body = rspToXML({"ns1:putSKUDataResponse":{"return":{
            returnCode: '0000',
            returnDesc: '成功',
            returnFlag: 1
          }
         }})
      } else {
          console.log(d) 
          ctx.response.body = rspToXML({"ns1:putSKUDataResponse":{"return":{
            returnCode: '001',
            returnDesc: d.data.Msg,
            returnFlag: 0
          }
          console.log(ctx.response.body)
         }})
      }
    })
}

function handlePutSalesOrderData(xmlJs, ctx) {
  const res = putSalesOrderDataFitTrans(xmlJs)
  res['$1'] = JSON.stringify(res.details)
  delete res.details
  const params = new url.URLSearchParams(res)
  console.log(params)
  return axios.post("http://39.108.1.180:7022/wms/external/business/Interface_ERP_Import_SaleOrder", 
    params).then(d => {
      if (d.data !== undefined && d.data.Success === true) {
          ctx.response.body = rspToXML({"ns1:putSODataResponse":{"return":{
            returnCode: '000',
            returnDesc: '成功',
            returnFlag: 1
          }
         }})
      } else {
          ctx.response.body = rspToXML({"ns1:putSODataResponse":{"return":{
            returnCode: '0001',
            returnDesc: d.data.Msg,
            returnFlag: 0
          }
         }})
      }
    })
}

function handlePutASNData(xmljs, ctx) {
  const res = putAsnDataFitTrans(xmljs)
  res['$1'] = JSON.stringify(res.details)
  delete res.details
  const params = new url.URLSearchParams(res)
  console.log(params)
  return axios.post("http://39.108.1.180:7022/wms/external/business/Interface_ERP_Import_ASN", 
    params).then(d => {
      if (d.data !== undefined && d.data.Success === true) {
          ctx.response.body = rspToXML({"ns1:putASNDataResponse":{"return":{
            returnCode: '0000',
            returnDesc: '成功',
            returnFlag: 1
          }
         }})
      } else {
          ctx.response.body = rspToXML({"ns1:putASNDataResponse":{"return":{
            returnCode: '0001',
            returnDesc: d.data.Msg,
            returnFlag: 0
          }
         }})
      }
    })
}

module.exports = router