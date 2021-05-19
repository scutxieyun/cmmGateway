//const { putSalesOrderDataConv } = require("../modules/ws2rest")
//const { lineschPropertyMap } = require("../modules/propertyMap")
exports.rules = [
  {
    method: 'post', //给到黄生帅智能锁
    url: '/linesch/driverassignment/query',
    host: '10.8.4.107:80'
  },
  {
    method: 'post',
    url: '/api/linesch/transinvs/querydriver',
    host: '10.8.4.107:80'
  },
  {
    method: 'post',
    url: '/wms/runMUSsql/*',
    host: 'wmssqlapi-b:3002' //直接访问SQL查询
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
    rewriteUrl: (path) => {return '/wms/runMUSsql/getConsigneesDropId/run'} //4-9根据楚丹要求，改为所有框码
  },
  {
    method: 'post',
    url:'/api/carton/getConsigneesDropId-pwms',//给扫码APP获取司机当天应扫码任务， 对着自研
    host: 'http://fit-server.wms-grp1:8080',
    rewriteUrl: (path) => {return '/wms/internal/query_array/TMS_Scan_GetConsigneeCartons'}
  },
  {
    method: 'post',
    url:'/api/carton/getConsigneesDropIdWOPagoda',//给扫码APP获取司机当天应扫码任务, 只有大生鲜
    host: 'wmssqlapi-b:3002',
    rewriteUrl: (path) => {return '/wms/runMUSsql/getConsigneesDropIdWOPagoda/run'}
  },
  {
    method: 'post',
    url:'/api/carton/getConsigneesDropIdPostTag',//给扫码APP获取司机当天应扫码任务， 广州模式
    host: 'wmssqlapi-b:3002',
    rewriteUrl: (path) => {return '/wms/runMUSsql/getConsigneesDropIdPostTag/run'}
  },
  {
    method: 'post',
    url:'/api/carton/getDropIdDetail',//给运营查询框码明细
    host: 'wmssqlapi-b:3002',
    rewriteUrl: (path) => {return '/wms/runMUSsql/getDropIdDetail/run'}
  },
  {
    method: 'post',
    url: '/api/redash/query/51/new',
    host: 'wmssqlapi-b:3002', //谌珂的质检系统查询框码
    rewriteUrl: (path) => {return '/wms/runMUSsql/querywmsv1fruitbatchV2/run'}
  },
  {
    url: '/dropids/*',
    host: 'tmsbase.dc:3000', //tmsbase扫码服务
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