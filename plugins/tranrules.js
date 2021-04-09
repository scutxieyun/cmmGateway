//const { putSalesOrderDataConv } = require("../modules/ws2rest")
//const { lineschPropertyMap } = require("../modules/propertyMap")
exports.rules = [
  {
    method: 'post',
    url: '/linesch/driverassignment/query',
    host: '10.8.4.107:80'
  },
  {//给到黄生帅的测试环境，对着排线test2
    method: 'post',
    url: '/linesch/driverassignment/query-test',
    host: 'tms-test:3000',
    rewriteUrl: (path) => {return '/linesch/driverassignment/query'}
  },
  {
    url: '/datahubWeb/WMSSOAP/FLUXWS', //因为专用富勒网关不完善，用这个透明网关临时替换
    host: 'http://flux-wms.test.pagoda.com.cn:8081'
  },
  {
    method: 'post',
    url: '/api/linesch/transinvs/querydriver',
    host: '10.8.4.107:80'
  },
  {
    method: 'post',
    url: '/api/redash/query/41',
    host: 'dcbigscreen:3000'
    //wms/runMUSsql/querywmsv1fruitbatch/run
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
    rewriteUrl: (path) => {return '/api/raworders'},
  }
]
exports.whitelist = [/\/api\/test\/.*/]