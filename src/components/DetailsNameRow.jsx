import { Avatar, Col, Dropdown, Row, Space, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaEdit } from "react-icons/fa";
import { CiMenuKebab } from "react-icons/ci";
import { useContext } from "react";
import { InvoiceContext } from "../context/InvoiceContext";
const { Text } = Typography;
const DetailsNameRow = ({ item, custImg, clothImg }) => {
  const name = item.customerName;
  const customerInvoice = item.customerInvoice;

  let navigate = useNavigate();

  const { isInvoice, setIsInvoice, setIsEditing } = useContext(InvoiceContext);

  const goBack = () => {
    navigate("/tailor/incompletOrders");
  };

  const openEditingPage = () => {
    const additionalData = {
      item,
      custImg,
      clothImg,
    };
    navigate(`/tailor/incompletOrders/edit/${customerInvoice}`, {
      state: { additionalData },
    });
  };

  const performOperation = (e) => {
    console.log("click ", e.key);
    switch (e.key) {
      case "1":
        setIsInvoice(true);
        break;
      case "2":
        openEditingPage();
        break;
    }
    // if (e.key === 1) {

    // } else if (e.key === 2) {
    //   // open editing page
    //   openEditingPage();
    // }
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
      key: "3",
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
