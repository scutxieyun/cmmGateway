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
  ,
  {
    url: '/api/test/*',
    host: 'localhost:3000',
    rewriteUrl: (path) => { return `/orders/api/orders` },
    bodyFormat: (body) => {
      console.log(body)
      return putSalesOrderDataConv(body)
    },
    headerSetup: (opt) => { // 将xml转成json后，要改变下header
      opt.headers['Content-Type'] = 'application/json'
      return opt  
    }
  },
  {
    url: '/api/linesch/orders',
    host: 'localhost:3000',
    rewriteUrl: (path) => { return '/orders/api/orders' },
    bodyFormat: (body) => {
      return body.map(d => {
        const res = lineschPropertyMap(d)
        res.details = res.details.map(e => {
          return lineschPropertyMap(e)
        }) 
        return res
      })
    },
  }, 
  {
    url: '/api/wms/putasndata',
    host: 'localhost:3000',
    rewriteUrl: (path) => { return '/orders/api/test' },
    bodyFormat: (body) => {
      return putAsnDataConv(body)
    },
    headerSetup: (opt) => { // 将xml转成json后，要改变下header
      opt.headers['Content-Type'] = 'application/json'
      return opt  
    }
  }
]
exports.whitelist = [/\/api\/test\/.*/]