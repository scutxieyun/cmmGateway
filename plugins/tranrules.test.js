//const { putSalesOrderDataConv } = require("../modules/ws2rest")
//const { lineschPropertyMap } = require("../modules/propertyMap")
exports.rules = [
  {//给到黄生帅的测试环境，对着排线
    method: 'post',
    url: '/linesch/driverassignment/query',
    host: 'tms-test:3000'
  },
  {
    method: 'post',
    url: '/api/redash/query/41',
    host: 'dcbigscreen:3000'
    //wms/runMUSsql/querywmsv1fruitbatch/run
  },
  {
    url: '/datahubWeb/WMSSOAP/FLUXWS', //因为专用富勒网关不完善，用这个透明网关临时替换
    host: 'http://flux-wms.test.pagoda.com.cn:8081'
  },
  {
    method: 'post',
    url: '/api/redash/query/41/new',
    host: 'wmssqlapi:3002',
    rewriteUrl: (path) => {return '/wms/runMUSsql/querywmsv1fruitbatch/run'}
  },
  {
    method: 'post',
    url: '/api/redash/query/51/new',
    host: 'wmssqlapi:3002',
    rewriteUrl: (path) => {return '/wms/runMUSsql/querywmsv1fruitbatchV2/run'}
  },
  {
    method: 'post',
    url: '/wms/runMUSsql/*',
    host: 'wmssqlapi:3002'
  },
  {
    method: 'post',
    url: '/api/redash/query/56', //给吕楚丹测试的链接
    host: 'dcbigscreen:3000',
  },
  {
    method: 'post',
    url:'/api/xmx/getSKUConfigure',//给吕楚丹小盟侠的正式链接
    host: 'wmssqlapi:3002',
    rewriteUrl: (path) => {return '/wms/runMUSsql/getSKU4XMX/run'}
  },
  {
    method: 'post',
    url:'/api/carton/getConsigneesDropId',//给扫码APP获取司机当天应扫码任务
    host: 'wmssqlapi:3002',
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
    host: 'tmsbase-mysql.dc-tms:3000', //tmsbase司机服务
  },
  {
    url: '/tasks/*',
    host: 'tmsbase-mysql.dc-tms:3000', //tmsbase任务服务
  },
  {
    url: '/acts/*',
    host: 'tmsbase-mysql.dc-tms:3000', //tmsbase扫码服务
  },
  {
    url: '/sites/*',
    host: 'tmsbase-mysql.dc-tms:3000', //tmsbase站点服务
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
  }
]
exports.whitelist = [/\/api\/test\/.*/]