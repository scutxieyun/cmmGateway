//const { putSalesOrderDataConv } = require("../modules/ws2rest")
//const { lineschPropertyMap } = require("../modules/propertyMap")
exports.rules = [
  {
    method: 'post',
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
    url: '/api/redash/query/41',
    host: 'dcbigscreen:3000'
    //wms/runMUSsql/querywmsv1fruitbatch/run
  },
  {
    method: 'post',
    url: '/api/redash/query/41/new',
    host: 'localhost:3002',
    rewriteUrl: (path) => {return '/wms/runMUSsql/querywmsv1fruitbatch/run'}
  },
  {
    method: 'post',
    url: '/wms/runMUSsql/*',
    host: 'wmssqlapi:3002'
  },
  {
    method: 'post',
    url: '/api/redash/query/56',
    host: 'dcbigscreen:3000',
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