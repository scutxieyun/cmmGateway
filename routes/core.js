var router = require('koa-router')();
const proxy = require('koa-better-http-proxy')
const { rules: tranRules } = require('../plugins/tranrules')
console.log(tranRules)
if (tranRules !== undefined && tranRules.length > 0) {
  tranRules.forEach(r => {
    console.log('create route for ', r)
    var option = {
      //parseReqBody:false //这个不能设置，会让bodyContent为空
    }
    if(r.rewriteUrl !== undefined && typeof r.rewriteUrl === 'function') {
      option.proxyReqPathResolver = ctx => {
        const path = require('url').parse(ctx.url).path
        console.log('rewite path')
        return r.rewriteUrl(path)
      }
    }
    if (r.bodyFormat !== undefined && typeof r.bodyFormat === 'function') {
      option.proxyReqBodyDecorator = (bodyContent, ctx) => {
        return r.bodyFormat(bodyContent)
      }
    }
    if (r.headerSetup !== undefined && typeof r.headerSetup === 'function') {
      option.proxyReqOptDecorator = (proxyReqOpts, cxt) => {
        return r.headerSetup(proxyReqOpts)
      }
    }
    if (r.method === 'get') {
      router.get(r.url, proxy(r.host, option))
    }
    if (r.method === 'post') {
      router.post(r.url, proxy(r.host, option))
    }
    if (r.method === undefined) {
      router.all(r.url, proxy(r.host, option))
    }
  })
}
module.exports = router;
