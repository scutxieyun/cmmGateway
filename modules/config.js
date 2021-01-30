module.exports = (function(){
  return {
    innerDeploy: (process.env.INNERDEPLOY || 'false') === 'true'
  }
})()