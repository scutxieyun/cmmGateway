//const { putSalesOrderDataConv } = require("../modules/ws2rest")
//const { lineschPropertyMap } = require("../modules/propertyMap")
exports.rules = [
  /*{
    method: 'post', //原来提供给黄生帅的，现在可以删除
    url: '/linesch/driverassignment/query',
    host: '10.8.4.107:80'
  },*/
  {
    method: 'post',
    url: '/api/linesch/transinvs/querydriver',
    host: '10.8.4.107:80'
  },
  {
    method: 'post',
    url:'/api/xmx/getSKUConfigure',//给吕楚丹小盟侠的正式链接
    host: 'wmssqlapi-b:3002', //为了不影响大生鲜订单轮询，使用B服务
    rewriteUrl: (path) => {return '/wms/runMUSsql/getSKU4XMX/run'}
  },
  {
    method: 'post',
    url:'/api/carton/getConsigneesDropId',//给扫码APP获取司机当天应扫码任务
    host: 'wmssqlapi-b:3002', //为了不影响大生鲜订单轮询，使用B服务
    rewriteUrl: (path) => {return '/wms/runMUSsql/getConsigneesDropId/run'}
  },
  {
    method: 'post',
    url: '/api/redash/query/51/new',
    host: 'wmssqlapi-b:3002', //谌珂的质检系统查询框码
    rewriteUrl: (path) => {return '/wms/runMUSsql/querywmsv1fruitbatchV2/run'}
  },
  {
    url: '/drivers/*',
    host: 'tmsbase.dc:3000', //tmsbase司机服务
  },
  {
    url: '/tasks/*',
    host: 'tmsbase.dc:3000', //tmsbase任务服务
  },
  {
    url: '/acts/*',
    host: 'tmsbase.dc:3000', //tmsbase扫码服务
  },
  {
    url: '/sites/*',
    host: 'tmsbase.dc:3000', //tmsbase站点服务
  },
  {
    method: 'post',
    url: '/api/redash/query/41',
    host: 'dcbigscreen:3000'
  },
  {
    method: 'post',
    url: '/api/redash/query/47',
    host: 'dcbigscreen:3000'
  },
  {
    method: 'post',
    url: '/api/redash/query/51',
    host: 'dcbigscreen:3000'
  },
  {
    method: 'post',
    url: '/api/redash/query/48',
    host: 'dcbigscreen:3000'
  },
  {
    url: '/woms/api/orders',
    method: 'post',
    host: 'localhost:3000',
    rewriteUrl: (path) => {return '/orders/api/orders'},
  }
]
exports.whitelist = [/\/api\/test\/.*/]