var router = require('koa-router')();
const proxy = require('koa-better-http-proxy')
const { rules: tranRules } = require('../plugins/tranrules')
console.log(tranRules)
if (tranRules !== undefined && tranRules.length > 0) {
  tranRules.forEach(r => {
    console.log('create route for ', r)
    if (r.method === 'get') {
      router.get(r.url, proxy(r.host))
    } else {
      router.post(r.url, proxy(r.host, {
        proxyReqPathResolver: function(ctx) {
          const path = require('url').parse(ctx.url).path
          console.log('rewrite the url')
          return path
        }
      }))
    }
  })
}
module.exports = router;
