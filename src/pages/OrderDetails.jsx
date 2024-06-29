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
        item={item}
        custImg={custImg}
        clothImg={clothImg}
      />
      <DetailsImageSection custImg={custImg} clothImg={clothImg} />
      <DetailsPersonalDataRow
        item={item}
      />
    </>
  );
};

export default OrderDetails;
