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
  'ROUTE': 'routeCode',
  'd_EDI_06': 'detailNo',
  'd_EDI_15': 'unit',
  'UOM': 'uom',
  'QTYORDERED_EACH': 'qtyOrdered',
  'SKU': 'sku'
}

const _lineschPropertyMap = {
  'ordertype': 'orderType',
  'orderno': 'soReference1', //有些费解，却是事实
  'custid': 'customerNo',
  'warehouseid': 'warehouseNo',
  'requrearrivaltime': 'requiredDeliveryTime',
  'expectedShipMenTime': 'expectedShipmentTime1',
  'consigneeid': 'consigneeNo',
  'consigneename': 'consigneeName',
  'routecode': 'routeCode',
  'loadseq': 'loadSeq',
  'driver': 'driver',
  'waveno': 'exWaveNo',
  'orderDate': {
    newKey:'orderTime',
    convertF: v => { return v + ' 00:00:00' }
  },
  'itemcode': 'sku',
  'itemname': 'skuName',
  'quantity': 'qtyOrdered',
  'uom': 'unit', //注意，源系统没有带这个uom信息
  'seqno': {
    newKey: 'detailNo',
    convertF: v => { return v.toString()}
  },
  'remark': 'comment'
}

exports.fluxPropertyMap = function(o) {
  return _.mapKeys(o, function(v, k) {
    return _fluxPropertyMap[k] !== undefined ? _fluxPropertyMap[k] : k
  })
}
exports.lineschPropertyMap = function(o) {
  return objectMap(o, _lineschPropertyMap)
}

function objectMap(o, map) {
  const res = {}
  _.forIn(o, (v, k) => {
    if (map[k] === undefined) {
      res[k] = v
    } else {
      if ((map[k] instanceof Object) && map[k].newKey !== undefined && map[k].convertF !== undefined) {
        res[map[k].newKey] = map[k].convertF(v)
      } else {
        res[map[k]] = v
      }
    }
  })
  return res
}

