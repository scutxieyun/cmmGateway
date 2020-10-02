const router = require('koa-router')()

router.post('/echo/*', async (ctx, next) => {
  ctx.response.body = ctx.request.body
})
module.exports = router
