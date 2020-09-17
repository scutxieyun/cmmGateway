const users = [
]
exports.verifyTicket = function(ticket) {
  var t = users.find(e => { return e.user === ticket.user})
  if (t !== undefined && ticket.accessCode === t.accessCode) {
    return t.user
  }
  return undefined
}