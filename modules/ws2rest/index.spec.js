const { parseXML, parseFluxSoap, soOrderPath } = require('./index')
describe("test", () => {
  test("run a simple decode", () => {
    parseXML("<root>asdfasdfasdfasdfasd</root>")
  })

  test("decode a WMS XML message", async () => {
    parseFluxSoap(`<?xml version="1.0" encoding="utf-8"?>
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.webservices.services.adapter.datahub/">
      <soapenv:Header/>
      <soapenv:Body>
        <ws:putSalesOrderData>
          <wmsSecurityInfo>
            <password>8888</password>
            <username>FLUXBGY</username>
          </wmsSecurityInfo>
          <soInfo>
            <wmsResultInfo>
              <resultInfo/>
              <returnCode/>
              <returnDesc/>
              <returnFlag/>
            </wmsResultInfo>
            <wmsSOHeaders>
              <WAREHOUSEID>A2</WAREHOUSEID>
              <SALESORDERNO>201811210014980</SALESORDERNO>
              <ORDERTYPE>XXSC</ORDERTYPE>
              <ORDERTIME>2018-11-21 21:11:59</ORDERTIME>
              <REQUIREDDELIVERYTIME>2018-11-22 21:20:51</REQUIREDDELIVERYTIME>
              <EXPECTEDSHIPMENTTIME1>2018-11-21 21:11:59</EXPECTEDSHIPMENTTIME1>
              <CUSTOMERID>FXG</CUSTOMERID>
              <SOREFERENCE1>201811210014980</SOREFERENCE1>
              <CONSIGNEEID>1231</CONSIGNEEID>
              <CONSIGNEENAME>中山石岐区莲塘东路店</CONSIGNEENAME>
              <c_Address1>广州</c_Address1>
              <c_Contact>15899967171</c_Contact>
              <SOREFERENCE4>CW</SOREFERENCE4>
              <detailsItem>
                <SALESORDERNO>201811210014980</SALESORDERNO>
                <USERDEFINE5>201811210014980</USERDEFINE5>
                <d_EDI_16>2</d_EDI_16>
                <CUSTOMERID>FXG</CUSTOMERID>
                <SKU>500223</SKU>
                <LOTATT06>gzggk</LOTATT06>
                <d_EDI_07>gzggk</d_EDI_07>
                <UOM>EA</UOM>
                <d_EDI_15>个</d_EDI_15>
                <d_EDI_06/>
                <QTYORDERED_EACH>1600</QTYORDERED_EACH>
              </detailsItem>
              <detailsItem>
                <SALESORDERNO>201811210014980</SALESORDERNO>
                <USERDEFINE5>201811210014980</USERDEFINE5>
                <d_EDI_16>8</d_EDI_16>
                <CUSTOMERID>FXG</CUSTOMERID>
                <SKU>563529</SKU>
                <LOTATT06>gzggk</LOTATT06>
                <d_EDI_07>gzggk</d_EDI_07>
                <UOM>EA</UOM>
                <d_EDI_15>本</d_EDI_15>
                <d_EDI_06/>
                <QTYORDERED_EACH>60</QTYORDERED_EACH>
              </detailsItem>
            </wmsSOHeaders>
          </soInfo>
          <wmsParam>
            <customerid>FLUXWS</customerid>
            <messageid>106SO</messageid>
            <param/>
            <stdno>106SO</stdno>
            <warehouseid>WH01</warehouseid>
          </wmsParam>
        </ws:putSalesOrderData>
      </soapenv:Body>
    </soapenv:Envelope>`,
    soOrderPath
    ).then(d => {
      console.log(JSON.stringify(d))
    }).catch(d => {
      console.log("erro ", d)
    })
  })
})