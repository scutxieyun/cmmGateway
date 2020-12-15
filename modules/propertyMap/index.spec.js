const { TestScheduler } = require('jest')
const {fluxPropertyMap, lineschPropertyMap} = require('./index')
describe("test the map table", () => {
  test("test the map", () => {
    var a = {"wmsResultInfo":{"resultInfo":"","returnCode":"","returnDesc":"","returnFlag":""},"wmsSOHeaders":{"WAREHOUSEID":"A2","SALESORDERNO":"201811210014980","ORDERTYPE":"XXSC","ORDERTIME":"2018-11-21 21:11:59","REQUIREDDELIVERYTIME":"2018-11-22 21:20:51","EXPECTEDSHIPMENTTIME1":"2018-11-21 21:11:59","CUSTOMERID":"FXG","SOREFERENCE1":"201811210014980","CONSIGNEEID":"1231","CONSIGNEENAME":"中山石岐区莲塘东路店","c_Address1":"广州","c_Contact":"15899967171","SOREFERENCE4":"CW","detailsItem":[{"SALESORDERNO":"201811210014980","USERDEFINE5":"201811210014980","d_EDI_16":"2","CUSTOMERID":"FXG","SKU":"500223","LOTATT06":"gzggk","d_EDI_07":"gzggk","UOM":"EA","d_EDI_15":"个","d_EDI_06":"","QTYORDERED_EACH":"1600"},{"SALESORDERNO":"201811210014980","USERDEFINE5":"201811210014980","d_EDI_16":"8","CUSTOMERID":"FXG","SKU":"563529","LOTATT06":"gzggk","d_EDI_07":"gzggk","UOM":"EA","d_EDI_15":"本","d_EDI_06":"","QTYORDERED_EACH":"60"}]}}
    console.log(fluxPropertyMap(a.wmsSOHeaders))
  })
  test("test linesch map", () => {
    const o = {
      "orderno": "BGYSDLR2020100100025315",
      "ordertype": "XXSC",
      "warehouseid": "A2",
      "lotatt06": "gzxgk",
      "custid": "PAGODA",
      "carrierid": "gzpszx",
      "carriername": "广州配送中心",
      "soreference1": "201001190842-A2-1785-89",
      "requrearrivaltime": "2020-10-02 08:00:00",
      "consigneeid": "1785",
      "consigneename": "中山市东区映翠豪庭店",
      "consigneeaddr": "reserved",
      "routecode": "A2_110",
      "loadseq": "1",
      "driver": "朱云美-A21018",
      "driverPhone": "",
      "docker": "B10",
      "waveno": "2010011908420004",
      "userdefine4": "波次1.5",
      "areano": "中山",
      "expectedShipMenTime": "2020-10-02 08:00:00",
      "orderDate": "2020-10-04",
      "details": [
        {
          "orderno": "BGYSDLR2020100100025315",
          "saleOrderNo": "BGYSDLR2020100100025315",
          "lineno": 1,
          "itemcode": "105795",
          "itemname": "B级-红肉蜜柚小（个）",
          "uom": "个",
          "quantity": 40,
          "seqno": 36211599,
          "stockcode": "gzxgk",
          "remark": ""
        }]}
    var d = lineschPropertyMap(o)
    d.details = d.details.map(e => {
      return lineschPropertyMap(e)
    })
    console.log(d)
  })
})