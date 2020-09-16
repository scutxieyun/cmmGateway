const {verifyToken} = require("./token")
var ignorePaths = [/\/getToken\b/]
function validateIgnorePath(req) {
  if (ignorePaths.find((re) => {
    return re.test(req.url)
  }) !== undefined) return true
  return false
}

exports.cas = async function(ctx, next){
  if (validateIgnorePath(ctx.request)) {
    await next()
    return
  }
  if (ctx.headers.token !== undefined && verifyToken(ctx.headers.token)) {
    await next()
    return
  }
  ctx.response.body = {
    resultCode: '401',
    errorMsg: '非法token'
  }
}