const users = [
  {
    user: 'smartlock',
    accessCode: 'asdferrr34rwffsdfasd'
  },
  {
    user: 'tradecenter',
    accessCode: '23432f32ejlkjsdfasdfadsfask'
  },
  {
    user: 'wms',
    accessCode: '3432432sdfdgrtt54w654'
  }
]
exports.verifyTicket = function(ticket) {
  var t = users.find(e => { return e.user === ticket.user})
  if (t !== undefined && ticket.accessCode === t.accessCode) {
    return t.user
  }
  return undefined
}