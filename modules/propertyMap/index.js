const _ = require('lodash')
const _fluxPropertyMap = {
  "WAREHOUSEID":"warehouseNo",
  "ORDERTYPE": 'orderType',
  "SALESORDERNO": 'saleOrderNo',
  'REQUIREDDELIVERYTIME': 'requiredDeliveryTime',
  'SOREFERENCE1': 'soReference1',
  'SOREFERENCE2': 'soReference2',
  'SOREFERENCE3': 'soReference3',
  'SOREFERENCE4': 'soReference4',
  'ORDERTIME': 'orderTime',
  'EXPECTEDSHIPMENTTIME1': 'expectedShipmentTime1',
  'detailsItem': 'detailsItem',
  'CUSTOMERID': 'customerNo',
  'CONSIGNEENAME': 'consigneeName',
  'CONSIGNEEID': 'consigneeNo',
  'USERDEFINE1': 'userDefined1',
  'USERDEFINE2': 'userDefined2',
  'USERDEFINE3': 'userDefined3',
  'USERDEFINE4': 'userDefined4',
  'USERDEFINE5': 'userDefined5',
  'd_EDI_06': 'comment',
  'd_EDI_15': 'unit',
  'UOM': 'uom',
  'QTYORDERED_EACH': 'qtyOrdered_Each',
  'SKU': 'sku'
}

exports.fluxPropertyMap = function(o) {
  return _.mapKeys(o, function(v, k) {
    return _fluxPropertyMap[k] !== undefined ? _fluxPropertyMap[k] : k
  })
}

