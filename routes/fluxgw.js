const router = require('koa-router')()
const xml2js = require('xml2js')
const axios = require('axios')
const url = require('url');
const config = require('../modules/config')
const { getLogger } = require('../modules/common/logger')
const { putCustDataFitTrans, putSKUDataFitTrans, putAsnDataFitTrans, putSalesOrderDataFitTrans, rspToXML, parseFluxSoap, extractSoapMethod } = require("../modules/ws2rest")
const parse = new xml2js.Parser({
  explicitArray: false
})
const logger = getLogger()

console.log(config)
router.post('/datahubWeb/WMSSOAP/FLUXWS', async (ctx, next) => {
  const xmlBody = ctx.request.body
  if (config.forceFlux) {
    return transToFlux(xmlBody, ctx)
  }
  //铁定是xml，转一下看
  return parseFluxSoap(xmlBody, []).then(res => {
    logger.debug(xmlBody)
    const sm = extractSoapMethod(res)
    if (sm === undefined) return Promise.reject("soap method 不规范")
    if (config.methods4Fit.find(d => sm === d) === undefined) {
      return transToFlux(xmlBody, ctx)
    }
    let jsData = {}
    let method = ''
    let url = ''
    if (sm === 'putASNData') {
      jsData = putAsnDataFitTrans(res)
      method = 'ns:putASNData'
      url = 'Interface_ERP_Import_ASN'
    }
    if (sm === 'putSalesOrderData') {
      jsData = putSalesOrderDataFitTrans(res)
      method = 'ns:putSalesOrderDataResponse'
      url = 'Interface_ERP_Import_SaleOrder'
    }
    if (sm === 'putSKUData') {
      jsData = putSKUDataFitTrans(res)
      method = 'ns:putSKUDataResponse'
      url = 'Interface_ERP_Import_Goods'
    }
    if (sm === 'putCustData') {
      jsData = putCustDataFitTrans(res)
      method = 'ns:putCustDataResponse'
      url = 'Interface_ERP_Import_Consignee'
    }
    return transToFit(jsData, ctx, method, url)
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
      console.log(d) //看看人家正确的应答长得怎样
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

function transToFit(jsData, ctx, soapMethod, urlPath) {
  const params = new url.URLSearchParams(jsData)
  console.log('trans to fit with ')
  logger.debug(JSON.stringify(jsData))
  return axios.post("http://39.108.1.180:7022/wms/external/business/" + urlPath, 
    params).then(d => {
      if (d.data !== undefined && d.data.Success === true) {
          ctx.response.body = rspToXML({
              method: soapMethod,
              returnCode: '0000',
              returnDesc: '成功',
              returnFlag: 1
          })
          logger.debug(ctx.response.body)
      } else {
        logger.debug(d.data)
        return Promise.reject(d.data.Msg)
      }
    }).catch(e => {
      let err = '系统错误'
      if (typeof e === 'string') {
        err = e
      } else {
        console.log(e)
      }
      ctx.response.body = rspToXML({
              method: soapMethod,
              returnCode: '0001',
              returnDesc: err,
              returnFlag: 0
          })
      console.log(ctx.response.body)
    })
}

/*function handlePutCustData(xmljs, ctx) {
  const res = putCustDataFitTrans(xmljs)
  const params = new url.URLSearchParams(res)
  console.log(xmljs, res, params)
  return axios.post("http://39.108.1.180:7022/wms/external/business/Interface_ERP_Import_Consignee", 
    params).then(d => {
      if (d.data !== undefined && d.data.Success === true) {
          ctx.response.body = rspToXML({
              method: "ns1:putCustDataResponse",
              returnCode: '0000',
              returnDesc: '成功',
              returnFlag: 1
          })
      } else {
        return Promise.reject(d.data.Msg)
      }
    }).catch(e => {
      let err = '系统错误'
      if (typeof d === 'string') {
        err = d
      } else {
        console.log(d)
      }
      ctx.response.body = rspToXML({
              method: "ns1:putCustDataResponse",
              returnCode: '0000',
              returnDesc: err,
              returnFlag: 0
          })
    })
}
function handlePutSKUData(xmljs, ctx){
  const res = putSKUDataFitTrans(xmljs)
  const params = new url.URLSearchParams(res)
  console.log(params)
  return axios.post("http://39.108.1.180:7022/wms/external/business/Interface_ERP_Import_Goods", 
    params).then(d => {
      console.log(d.data)
      if (d.data !== undefined && d.data.Success === true) {
          ctx.response.body = rspToXML({
              method: "ns1:putSKUDataResponse",
              returnCode: '0000',
              returnDesc: '成功',
              returnFlag: 1
          })
         console.log(ctx.response.body)
      } else {
        return Promise.reject(d.data.Msg)
      }
    }).catch(e => {
      let err = '系统错误'
      if (typeof d === 'string') {
        err = d
      } else {
        console.log(d)
      }
      ctx.response.body = rspToXML({
              method: "ns1:putSKUDataResponse",
              returnCode: '0001',
              returnDesc: err,
              returnFlag: 1
          })
      console.log(ctx.response.body)
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
        ctx.response.body = rspToXML({
            method: "ns1:putSODataResponse",
            returnCode: '0000',
            returnDesc: '成功',
            returnFlag: 1
        })
      } else {
        return Promise.reject(d.data.Msg)
      }
    }).catch(e => {
      let err = '系统错误'
      if (typeof d === 'string') {
        err = d
      } else {
        console.log(d)
      }
      ctx.response.body = rspToXML({
              method: "ns1:putSODataResponse",
              returnCode: '0001',
              returnDesc: err,
              returnFlag: 1
          })
      console.log(ctx.response.body)
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
        return Promise.reject(d.data.Msg)
      }
    }).catch(e => {
      let err = '系统错误'
      if (typeof d === 'string') {
        err = d
      } else {
        console.log(d)
      }
      ctx.response.body = rspToXML({
              method: "ns1:putASNDataResponse",
              returnCode: '0001',
              returnDesc: err,
              returnFlag: 1
          })
      console.log(ctx.response.body)
    })
}
*/
module.exports = router