import { Col, Image, Row, Typography } from "antd";
import { useLocation } from "react-router-dom";
import DetailsImageSection from "../customeHooks/DetailsImagesSection";
import DetailsNameRow from "../components/DetailsNameRow";
import DetailsPersonalDataRow from "../components/DetailsPersonalDataRow";
import { useState } from "react";
import { InvoiceContext } from "../context/InvoiceContext";
import InvoiceComponent from "../components/InvoiceComponent";
import EditOrder from "./EditOrder";

const OrderDetails = () => {
  const location = useLocation();
  const additionalData = location.state?.additionalData;
  // console.log("additionalData", additionalData.item);

  const item = additionalData.item;
  const custImg = additionalData.customerImgUrl;
  const clothImg = additionalData.clothImgUrl;

  const [isInvoice, setIsInvoice] = useState(false);

  return (
    <InvoiceContext.Provider value={{ isInvoice, setIsInvoice }}>
      {isInvoice ? (
        <InvoiceComponent item={item} custImg={custImg} clothImg={clothImg} />
      ) : (
        <>
          <DetailsNameRow item={item} custImg={custImg} clothImg={clothImg} />
          <DetailsImageSection custImg={custImg} clothImg={clothImg} />
          <DetailsPersonalDataRow item={item} />
        </>
      )}
    </InvoiceContext.Provider>
  );
};

export default OrderDetails;
