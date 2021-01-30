const {verifyToken} = require("./token")
const l = require("../plugins/tranrules")
const config = require('./config')
var ignorePaths = [/\/getToken\b/, /\/echo/]
/**加载百名单*/
if (l.whitelist !== undefined && l.whitelist.length !== 0) {
  l.whitelist.forEach(d => {
    ignorePaths.push(d)
  })
}
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
  if ((ctx.headers.token !== undefined && verifyToken(ctx.headers.token))) {
    await next()
    return
  }
  if (config.innerDeploy === true) {
    console.log("内网请求，跳过")
    await next()
    return
  }
  ctx.response.body = {
    resultCode: '401',
    errorMsg: '非法token'
  }
}

exports.validateIgnorePath = validateIgnorePath

