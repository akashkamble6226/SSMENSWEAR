import { Avatar, Col, Dropdown, Row, Space, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaEdit } from "react-icons/fa";
import { CiMenuKebab } from "react-icons/ci";
import { useContext } from "react";
import { InvoiceContext } from "../context/InvoiceContext";
const { Text } = Typography;
const DetailsNameRow = ({ item }) => {
  const name = item.customerName;
  const customerInvoice = item.customerInvoice;

  let navigate = useNavigate();

  const { isInvoice, setIsInvoice } = useContext(InvoiceContext);

  const goBack = () => {
    navigate("/tailor/incompletOrders");
  };

  const performOperation = (e) => {
    console.log("click ", e.key);
    setIsInvoice(true);
  };

  const items = [
    {
      key: "1",
      label: <Text style={{ fontSize: "20px" }}>Invoice</Text>,
    },
    {
      key: "2",
      label: <Text style={{ fontSize: "20px" }}>Edit</Text>,
    },
    {
      key: "2",
      label: <Text style={{ fontSize: "20px" }}>Delete</Text>,
    },
  ];

  return (
    <Row
      style={{ backgroundColor: "#ffffff", height: "60px" }}
      justify={"space-between"}
      align={"middle"}
    >
      <Col style={{ padding: "10px" }} onClick={goBack}>
        <Avatar
          shape="circle"
          size={"large"}
          style={{ backgroundColor: "#001529", cursor: "pointer" }}
          src={
            <FaArrowLeft
              color="#ffffff"
              style={{ fontSize: "20px", margin: "5px" }}
            />
          }
        />
      </Col>
      <Col>
        <Text
          style={{ fontSize: "20px", fontWeight: "bold" }}
        >{`${name} (${customerInvoice})`}</Text>
      </Col>
      <Col style={{ padding: "10px" }}>
        <Dropdown
          trigger={"click"}
          menu={{
            onClick: performOperation,
            items,
          }}
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <Avatar
                shape="circle"
                size={"large"}
                style={{ backgroundColor: "#001529", cursor: "pointer" }}
                src={
                  <CiMenuKebab color="#ffffff" style={{ fontSize: "20px" }} />
                }
              />
            </Space>
          </a>
        </Dropdown>
      </Col>
    </Row>
  );
};

export default DetailsNameRow;
