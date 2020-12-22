module.exports = (function(){
  const forceFlux = process.env.FORCEFlux || true
  const fluxHost = process.env.fluxHost || 'http://119.29.74.239:8081'
  const fitHost = process.env.fitHost || "http://39.108.1.180:7022"
  const whs4Fit = process.env.WAREHOUSENO4Fit || 'A2'
  const warehouseNos4Fit = whs4Fit.split(',')
  const cust4Fit = process.env.CUSTOMER4Fit || 'PAGODA'
  const customerNos4Fit = cust4Fit.split(',')
  const m4Fit = process.env.METHODS4Fit || 'putSKUData'
  const methods4Fit = m4Fit.split(',')
  return {
    forceFlux,
    fitHost,
    warehouseNos4Fit,
    customerNos4Fit,
    fluxHost,
    methods4Fit
  }
})()