var router = require('koa-router')();
var {verifyTicket} = require('../plugins/trustcenter')
var { generateToken } = require('../modules/token')
router.post('/getToken', function(ctx, next) {
  var ticket = ctx.request.body
  var user = undefined
  if ((user = verifyTicket(ticket)) !== undefined) {
    ctx.response.body = {
      resultCode: '0',
      data: {
        token: generateToken(user)
      }
    }
  } else {
    ctx.response.body = {
      resultCode: '500',
      errorMsg: '无效认证信息'
    }
  }
});
module.exports = router