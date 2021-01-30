const {verifyToken} = require("./token")
const l = require("../plugins/tranrules")
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
  if (isLocalRequest(ctx.ip)) {
    console.log("内网请求，跳过")
    await next()
    return
  }
  ctx.response.body = {
    resultCode: '401',
    errorMsg: '非法token'
  }
}

function isLocalRequest(ipAddr) {
  console.log(ipAddr)
  const addrs = ipAddr.split(':')
  let ip = ''
  if (addrs.length >= 4) {
    //含IPv6
    ip = addrs[3]
  } else {
    ip = addrs[0]
  }
  const ipParts = ip.split('.')
  if (ipParts.length === 4 && (ipParts[0] === '10' || (ipParts[0] === '192' && ipParts[1] === '168') || (ip === '127.0.0.1'))) {
    return true
  }
  if (ipAddr === '::1') {
    return true
  }
  return false
  
}

exports.validateIgnorePath = validateIgnorePath

