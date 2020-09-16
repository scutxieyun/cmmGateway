const { v4: uuidv4 } = require("uuid")
const schedule = require('node-schedule');
var tokenMap = new Map()
const dateDiff = 60 * 1000
function generateToken(userId) {
  var str = uuidv4()
  str = str.replace(/-/g, '')
  tokenMap.set(str, {
    createdAt: (new Date()).getTime(),
    userId: userId,
    key: str
  })
  return str;
}
function verifyToken(token) {
  var item = tokenMap.get(token)
  if (item === undefined) return false;
  if ((new Date()).getTime() - item.createdAt > dateDiff) {
    return false;
  }
  return true
}

function refreshTokens() {
  const it = tokenMap.entries()
  const n = (new Date()).getTime()
  var v = undefined
  while ((v = it.next()).done !== true) {
    if ((n - v.value[1].createdAt) > dateDiff) {
      tokenMap.delete(v.value[0])
    }
  }
}
var j1 = schedule.scheduleJob('0 0/1 * * * *', function(){
  refreshTokens()
});

exports.generateToken = generateToken
exports.verifyToken = verifyToken