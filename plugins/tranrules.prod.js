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