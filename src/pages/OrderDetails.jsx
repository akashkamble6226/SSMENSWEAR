import { Col, Image, Row, Typography } from "antd";
import { useLocation } from "react-router-dom";
import DetailsImageSection from "../customeHooks/DetailsImagesSection";
import DetailsNameRow from "../components/DetailsNameRow";
import DetailsPersonalDataRow from "../components/DetailsPersonalDataRow";

const OrderDetails = () => {
  const location = useLocation();
  const additionalData = location.state?.additionalData;
  // console.log("additionalData", additionalData.item);

  const item = additionalData.item;
  const custImg = additionalData.customerImgUrl;
  const clothImg = additionalData.clothImgUrl;

  return (
    <>
      <DetailsNameRow
        name={item.customerName}
        customerInvoice={item.customerInvoice}
      />
      <DetailsImageSection custImg={custImg} clothImg={clothImg} />
      <DetailsPersonalDataRow
        item={item}
        // customerPhone={item.customerPhone}
        // dueDate={item.dueDate}
        // dueDateRemeber={item.dueDateRemeber}
        // totalAmt={item.totalAmt}
        // advanceAmt={item.advanceAmt}
        // remainingAmt={item.remainingAmt}
      />
    </>
  );
};

export default OrderDetails;
