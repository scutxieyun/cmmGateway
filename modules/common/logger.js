const log4js = require('log4js');
const config = require('../config')
var cConfig = { type: 'stdout' }
const logtube = require("logtube")

logtube.setup({
  project: "fluxwms-gw",   // 设置项目名，只允许数字，- 和 _
  env: config.env,              // 设置项目环境名，一般为 dev, test, uat/staging, prod
  console: {                // 命令行输出
    topics: [config.logger],          // 设置要通过命令行输出的主题，"*" 代表全部主题
  },
  file: {                   // 日志文件输出
    topics: ["info", "err", "warn"], // 设置要通过日志文件输出的主题, "*" 代表全部主题
    dir: "logs",             // 设置日志输出的跟目录
    subdirs: {
        xlog: ["info", "err", "warn"] // 额外指定某些主题输出到某个子目录中，这一行示例代表 info, err 和 warn 主题输出到 logs 目录中的 important 子目录下
    }
  }
})

if (config.webhook !== undefined) {
  cConfig = { type: '/modules/commons/wchat-append.js', webhook: config.webhook }
}

log4js.configure({
  appenders: {
    out: { type: 'stdout' },
    critical: cConfig,
    operate: { type: 'stdout' } //操作日志
  },
  categories: {
    default: { appenders: [ 'out'], level: 'debug' },
    critical: { appenders: ['critical'], level: 'info'}
  }
});

exports.getLogger = function() {
  return logtube
}
exports.getCriticalLogger = function() {
  return log4js.getLogger('critical')
}
exports.getOperateLogger = function() {
  return logtube
}