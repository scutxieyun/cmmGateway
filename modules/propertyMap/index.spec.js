const { TestScheduler } = require('jest')
const {fluxPropertyMap} = require('./index')
describe("test the map table", () => {
  test("test the map", () => {
    var a = {"wmsResultInfo":{"resultInfo":"","returnCode":"","returnDesc":"","returnFlag":""},"wmsSOHeaders":{"WAREHOUSEID":"A2","SALESORDERNO":"201811210014980","ORDERTYPE":"XXSC","ORDERTIME":"2018-11-21 21:11:59","REQUIREDDELIVERYTIME":"2018-11-22 21:20:51","EXPECTEDSHIPMENTTIME1":"2018-11-21 21:11:59","CUSTOMERID":"FXG","SOREFERENCE1":"201811210014980","CONSIGNEEID":"1231","CONSIGNEENAME":"中山石岐区莲塘东路店","c_Address1":"广州","c_Contact":"15899967171","SOREFERENCE4":"CW","detailsItem":[{"SALESORDERNO":"201811210014980","USERDEFINE5":"201811210014980","d_EDI_16":"2","CUSTOMERID":"FXG","SKU":"500223","LOTATT06":"gzggk","d_EDI_07":"gzggk","UOM":"EA","d_EDI_15":"个","d_EDI_06":"","QTYORDERED_EACH":"1600"},{"SALESORDERNO":"201811210014980","USERDEFINE5":"201811210014980","d_EDI_16":"8","CUSTOMERID":"FXG","SKU":"563529","LOTATT06":"gzggk","d_EDI_07":"gzggk","UOM":"EA","d_EDI_15":"本","d_EDI_06":"","QTYORDERED_EACH":"60"}]}}
    console.log(fluxPropertyMap(a.wmsSOHeaders))
  })
})