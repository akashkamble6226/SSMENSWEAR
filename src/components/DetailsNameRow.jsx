import { Col, Row, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaEdit } from "react-icons/fa";
const { Text } = Typography;

const DetailsNameRow = ({ name, customerInvoice }) => {
  let navigate = useNavigate();

  const goBack = () => {
    navigate("/tailor/incompletOrders");
  };
  return (
    <Row
      style={{ backgroundColor: "#ffffff", height: "60px" }}
      justify={"space-between"}
      align={"middle"}
    >
      <Col style={{ padding: "10px" }} onClick={goBack}>
        <FaArrowLeft color="#1677ff" />
      </Col>
      <Col>
        <Text style={{ fontSize: "16px", fontWeight: "bold" }}>{`${name} (${customerInvoice})`}</Text>
      </Col>
      <Col style={{ padding: "10px" }}>
        <FaEdit color="#1677ff" />
      </Col>
    </Row>
  );
};

export default DetailsNameRow;
