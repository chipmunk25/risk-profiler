import React, { useRef } from "react";
import { Button } from "antd";
import { PrinterOutlined } from "@ant-design/icons";
import ReactToPrint from "react-to-print";
import CustomerProfilerReport from "components/PdfReports/CustomerProfilerReport";
import { useSelector } from "react-redux";
const PrintPreview = ({ customerInfo, fullname, printData, CloseModal }) => {
  // console.log(printData,fullname)
  const { customerProfiler } = useSelector(({ indicators }) => indicators);
  const componentRef = useRef();
  console.log(customerProfiler);
  return (
    <div>
      <ReactToPrint
        trigger={() => (
          <div className="text-right">
            <Button
              type="primary"
              id="printInvoice"
              className="btn btn-info"
              disabled={!printData}
            >
              <PrinterOutlined /> Print
            </Button>
          </div>
        )}
        content={() => componentRef.current}
        // onAfterPrint={() => CloseModal()}
      />

      <CustomerProfilerReport
        customerInfo={customerInfo}
        fullname={fullname}
        details={customerProfiler}
        ref={componentRef}
      />

    </div>
  );
};

export default PrintPreview;
