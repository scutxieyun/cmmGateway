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
const _fluxPropertyMap4Fit = {
  "WAREHOUSEID":"warehouse_no",
  'ASNTYPE': 'asn_type',
  'ASNNO': 'asn_no',
  'EXPECTEDARRIVETIME1': 'expected_arrive_time_1',
  'EXPECTEDARRIVETIME2': 'expected_arrive_time_2',
  'CUSTOMERID': 'customer_no',
  'SUPPLIERID': 'vendor_no',
  'detailsItem': 'detailsItem',
  'SKU': 'goods_no',
  'UOM': 'unit_no',
  'EXPECTEDQTY_EACH': 'expect_qty_ea',
  'TOTALPRICE': 'goods_price',
  'PACKID': 'package_no',
  'GROSSWEIGHT': 'goods_gross_weight',
  'NETWEIGHT': 'goods_net_weight',
  'TARE': 'goods_tare',
  'CUBE': 'goods_volume',
  'PRICE': 'price',
  'SKULENGTH': 'goods_length',
  'SKUWIDTH': 'goods_width',
  'SKUHIGH': 'goods_height',
  'KITFLAG': 'is_combined',
  'SHELFLIFE': 'shelflife',
  'ORDERTIME': 'order_time',
  'REQUIREDDELIVERYTIME': 'required_delivery_time',
  'CONSIGNEEID': 'consignee_no',
  'CONSIGNEENAME': 'consignee_name',
  'SALESORDERNO': 'sale_order_no',
  'ORDERTYPE': 'order_type',
  'EXPECTEDSHIPMENTTIME1': '',
  'REQUIREDDELIVERYTIME': '',
  'ADDRESS1': 'address',
  'C_ADDRESS1': 'address',
  'C_CONTACT': 'contact',
  'QTYORDERED_EACH': 'order_qty_ea',
  'ASNCREATIONTIME': 'asn_create_time',
  'CUSTOMER_TYPE': 'customer_type',
  'CONTACT1_TEL2': 'contact_tel',
  'h_EDI_01': 'edi_info_01',
  'h_EDI_02': 'edi_info_02',
  'h_EDI_03': 'edi_info_03',
  'h_EDI_04': 'edi_info_04',
  'h_EDI_05': 'edi_info_05',
  'h_EDI_06': 'edi_info_06',
  'h_EDI_07': 'edi_info_07',
  'h_EDI_08': 'edi_info_08',
  'h_EDI_09': 'edi_info_09',
  'ASNREFERENCE1': 'refer_info_01',
  'ASNREFERENCE2': 'refer_info_02',  
  'ASNREFERENCE3': 'refer_info_03',
  'ASNREFERENCE4': 'refer_info_04',
  'ASNREFERENCE5': 'refer_info_05',
  'ASNREFERENCE6': 'refer_info_06',
  'ASNREFERENCE7': 'refer_info_07',
  'ASNREFERENCE8': 'refer_info_08',
  'ASNREFERENCE9': 'refer_info_09',
  'ASNREFERENCE10': 'refer_info_10',
  'ASNREFERENCE11': 'refer_info_11',
  'ASNREFERENCE12': 'refer_info_12',
  'd_EDI_01': 'edi_info_01',
  'd_EDI_02': 'edi_info_02',
  'd_EDI_03': 'edi_info_03',
  'd_EDI_04': 'edi_info_04',
  'd_EDI_05': 'edi_info_05',
  'd_EDI_06': 'edi_info_06',
  'd_EDI_07': 'edi_info_07',
  'd_EDI_08': 'edi_info_08',
  'd_EDI_09': 'edi_info_09',
  'LOTATT01': 'attr_value_01',
  'LOTATT02': 'attr_value_02',
  'LOTATT03': 'attr_value_03',
  'LOTATT04': 'attr_value_04',
  'LOTATT05': 'attr_value_05',
  'LOTATT06': 'attr_value_06',
  'LOTATT07': 'attr_value_07',
  'LOTATT08': 'attr_value_08',
  'LOTATT09': 'attr_value_09',
  'LOTATT10': 'attr_value_10',
  'LOTATT11': 'attr_value_11',
  'LOTATT12': 'attr_value_12',
  'LOTATT13': 'attr_value_13',
  'LOTATT14': 'attr_value_14',
  'LOTATT15': 'attr_value_15',
  'RESERVEDFIELD01': 'reserved_field_01',
  'RESERVEDFIELD02': 'reserved_field_02',
  'RESERVEDFIELD03': 'reserved_field_03',
  'RESERVEDFIELD04': 'reserved_field_04',
  'RESERVEDFIELD05': 'reserved_field_05',
  'RESERVEDFIELD06': 'reserved_field_06',
  'RESERVEDFIELD07': 'reserved_field_07',
  'RESERVEDFIELD08': 'reserved_field_08',
  'RESERVEDFIELD09': 'reserved_field_09',
  'SOREFERENCE1': 'so_reference_1',
  'SOREFERENCE2': 'so_reference_2',
  'SOREFERENCE3': 'so_reference_3',
  'SOREFERENCE4': 'so_reference_4',
  'SOREFERENCE5': 'so_reference_5',
  'SOREFERENCE6': 'so_reference_6',
  'SOREFERENCE7': 'so_reference_7',
  'SOREFERENCE8': 'so_reference_8',
  'SOREFERENCE9': 'so_reference_9',
  'USERDEFINE1': 'user_define_1',
  'USERDEFINE2': 'user_define_2',
  'USERDEFINE3': 'user_define_3',
  'USERDEFINE4': 'user_define_4',
  'USERDEFINE5': 'user_define_5',
  'USERDEFINE6': 'user_define_6',
  'USERDEFINE7': 'user_define_7',
  'USERDEFINE8': 'user_define_8',
  'USERDEFINE9': 'user_define_9',
  'UDF1': 'udf1',
  'UDF2': 'udf2',
  'UDF3': 'udf3',
  'UDF4': 'udf4',
  'UDF5': 'udf5',
  'UDF6': 'udf6',
  'UDF7': 'udf7',
  'UDF8': 'udf8',
  'UDF9': 'udf9'
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

/**
**/
exports.fluxPropertyMap = function(o, cat, pName) {
  let target = _fluxPropertyMap
  if (cat === 'fit') {
    target = _fluxPropertyMap4Fit
  }
  return _.mapKeys(o, function(v, k) {
    if (cat === 'fit' && pName !== undefined) {
      return target[k] !== undefined ? pName + '_' + target[k] : pName + '_' + k
    } else {
      return target[k] !== undefined ? target[k] : k
    }
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

