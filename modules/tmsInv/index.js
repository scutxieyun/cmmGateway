var redisClient = undefined
var connected = false
var expireTime = process.env.REDIS_KEY_EXPIRE === undefined ? 2 * 24 * 3600 : parseInt(process.env.REDIS_KEY_EXPIRE)
var reConnect = undefined
function init(redis, host, port, pwd) {
  function _init() {
    redisClient = redis.createClient(port, host)
    if (pwd !== undefined) {
      redisClient.auth(pwd)
    }
    redisClient.on("connect", function() {
      connected = true
    })
    redisClient.on("error", function (err) {
      connected = false
    })
  }
  _init()
  reConnect = _init
}

async function saveInv(key, ord) {
  if (!connected) {
    reConnect()
    return Promise.resolve({
      resultCode: '500',
      errorMsg: 'redis连接错误'
    })
  }
  return new Promise(function(resolve, reject){
    function setCB(err, data) {
      if (err === null) {
        resolve({
          resultCode: '0'
        })
      } else {
        resolve({
          resultCode: '500',
          errorMsg: '保存redis错误' + err + data
        })
      }
    }
    if (!connected) {
      resolve({
        resultCode: '500',
        errorMsg: 'redis无连接'
      })
      console.log("connect failed")
      return
    }
    if (expireTime < 1000) {
      redisClient.set(key, JSON.stringify(ord), setCB)
    } else {
      redisClient.multi()
        .set(key, JSON.stringify(ord))
        .expire(key, expireTime)
        .exec(setCB)
    }
  })
}

async function getInv(key) {
  return new Promise((resolve, reject) => {
    redisClient.get(key, (err, data) => {
      if (err === null && data !== null) {
        resolve({
          resultCode: '0',
          data: data
        })
      }else{
        resolve({
          resultCode: '404',
          errorMsg: "没有找到相应的key"
        })
      }
    })
  })
}



async function getInvs(keys, pageNo, pageSize, resultMap) {
  if (!connected) {
    reConnect()
    return Promise.resolve({
      resultCode: '500',
      errorMsg: 'redis连接错误'
    })
  }
  if (resultMap === undefined) {
    resultMap = function(o){ return o }
  }
  return new Promise((resolve, reject) => {
    if (!connected) {
      resolve({
        resultCode: '500',
        errorMsg: 'redis连接错误'
      })
      return
    }
    redisClient.keys(keys, function(err, data){
      if (err ===  null) {
        if (pageNo === undefined) {
          pageNo = 0
          pageSize = data.length
        }
        console.log('get num', pageNo, pageSize)
        var newKeys = data.splice(pageNo * pageSize, pageSize) //截断
        var rPageSize = 200
        var rPage = Math.ceil(newKeys.length / rPageSize)
        console.log('actual pagination', newKeys.length, rPage)
        var ps = []
        for(var i = 0; i < rPage; i ++) {
          var segSize = (i === rPage - 1) ? newKeys.length : rPageSize // 不可能等于0
          ps.push(getSegment(newKeys.splice(0, segSize)))
        }
        Promise.all(ps).then(rsps => {
          var res = []
          for(var i = 0; i < rsps.length; i++) {
            rsps[i].forEach(e => {
              try{
                o = JSON.parse(e)
                res.push(resultMap(o))
              }catch (err){
                console.log('decode error', err, e)
              }
            })
          }
          resolve({
            resultCode: '0',
            data: res
          })
        })
      } else {
        resolve({
          resultCode: '0',
          data: []
        })
      }
    })
  })
}
function getSegment(keys) {
  return new Promise((resolve, reject) => {
    console.log('mget ', keys.length)
    redisClient.mget(keys, function(err, data){
      if (err === null) {
        resolve(data)
      }else {
        console.log("get error", keys, err)
        resolve([])
      }
    })
  })
}

async function clearInvs(keyPatterns) {
  return new Promise((resolve, reject) => {
    if (!connected) {
      resolve({
        resultCode: '500',
        errorMsg: 'redis连接错误'
      })
      return
    }
    var m = redisClient.multi()
    keyPatterns.forEach( p => {
      m.keys(p)
    })
    m.exec(function(err, replies) {
      if (err === null) {
        var keys = []
        replies.forEach(r => {
          r.forEach(k => {
            keys.push(k)
          })
        })
        var m = redisClient.multi()
        keys.forEach(k => {
          m.del(k)
        })
        m.exec((err, data) => {
          if (err === null) {
            resolve({
              resultCode: '0',
            })
          } else {
            resolve({
              resultCode: '500',
              errorMsg: '删除时错误'
            })
          }
        })
      } else {
        resolve({
          resultCode: '501',
          errorMsg: '定位key值错误'
        })
      }
    })
  })
}
async function getKeys(keyPatterns) {
  var m = redisClient.multi()
  keyPatterns.forEach(k => {
    m = m.keys(k)
  })
  return new Promise(function(resolve, reject){
    var res = []
    m.exec(function(err, replies) {
      if (err === null) {
        replies.forEach(r => {
          r.forEach(k => {
            res.push(k)
          })
        })
      }
      resolve(res)
    })
  })
}

exports.init = init
exports.saveInv = saveInv
exports.getInvs = getInvs
exports.getInv = getInv
exports.clearInvs = clearInvs
