const { putSalesOrderDataConv } = require("../modules/ws2rest")
exports.rules = [
  {
    method: 'post',
    url: '/linesch/driverassignment/query',
    host: 'tmsbackend3:3000'
  },
  {
    method: 'post',
    url: '/api/redash/query/41',
    host: 'dcbigscreen:3000'
  },
  {
    url: '/api/test/*',
    host: 'localhost:3000',
    rewriteUrl: (path) => { return `/api/orders` },
    bodyFormat: (body) => {
      console.log(body)
      return putSalesOrderDataConv(body)
    },
    headerSetup: (opt) => { // 将xml转成json后，要改变下header
      opt.headers['Content-Type'] = 'application/json'
      return opt  
    }

  }
]
exports.whitelist = [/\/api\/test\/.*/]