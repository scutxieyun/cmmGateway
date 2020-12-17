const { parseXML, parseFluxSoap, soOrderPath, putSalesOrderDataConv, rspToXML } = require('./index')
var fs = require('fs')
const { hasUncaughtExceptionCaptureCallback } = require('process')
describe("test", () => {
  test("run a simple decode", () => {
    parseXML("<root>asdfasdfasdfasdfasd</root>")
  })

  test("decode a WMS XML message", async () => {
    var d = fs.readFileSync('docs/pagoda.txt')
    parseFluxSoap(
      d.toString(),
      soOrderPath
    )
  })
  test("decode a WMS XML message and convert", async () => {
    var d = fs.readFileSync('docs/pagoda.txt')
    putSalesOrderDataConv(
      d.toString(),
      soOrderPath
    ).then(d => {
      console.log(d)
    })
  })
  test('code a XML', async () => {
    console.log(rspToXML({
      "ns1:putASNDataResponse":{"return":{resultCode:0, msg: 'success'}}}))
  })
})

