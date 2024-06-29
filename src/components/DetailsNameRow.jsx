import {
  Avatar,
  Col,
  Divider,
  Dropdown,
  Menu,
  Modal,
  Row,
  Space,
  Typography,
  Image,
} from "antd";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaEdit } from "react-icons/fa";
import { CiMenuKebab } from "react-icons/ci";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { usePDF } from "react-to-pdf";
const { Text, Paragraph } = Typography;

const DetailsNameRow = ({ item, custImg, clothImg }) => {
  const name = item.customerName;
  const customerInvoice = item.customerInvoice;

  let navigate = useNavigate();
  const [openInvoiceModal, setOpenInvoiceModal] = useState(false);
  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });

  const goBack = () => {
    navigate("/tailor/incompletOrders");
  };

  const performOperation = (e) => {
    console.log("click ", e.key);
    setOpenInvoiceModal(true);
  };

  const items = [
    {
      key: "1",
      label: "Invoice",
    },
    {
      key: "2",
      label: "Edit",
    },
    {
      key: "2",
      label: "Delete",
    },
  ];
  return (
    <Row
      style={{ backgroundColor: "#ffffff", height: "60px" }}
      justify={"space-between"}
      align={"middle"}
    >
      <Modal
        // title="Vertically centered modal dialog"
        closeIcon={false}
        centered
        open={openInvoiceModal}
        onOk={() => {
          // setOpenInvoiceMod  al(false);
          toPDF();
        }}
        onCancel={() => setOpenInvoiceModal(false)}
      >
        <Col ref={targetRef}>
          <Row justify={"space-between"} align={"middle"}>
            <Col>
              <Row align={"middle"}>
                <Text
                  style={{
                    fontSize: "26px",
                    fontWeight: "bold",
                    paddingRight: "10px",
                    color: "#1677ff",
                  }}
                >
                  Ss
                </Text>
                <Text
                  style={{
                    fontSize: "15px",
                    fontWeight: "bold",
                    color: "#1677ff",
                  }}
                >
                  <FormattedMessage id="firmName" />
                </Text>
              </Row>
            </Col>
            <Col>
              <Text
                style={{
                  fontSize: "15px",
                  fontWeight: "bold",
                  color: "#1677ff",
                }}
              >
                <FormattedMessage id="invoice" />
              </Text>
            </Col>
          </Row>
          <hr />
          {/* images */}
          <Row justify={"space-around "}>
            <Image
              preview={false}
              src={clothImg}
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
              }}
            />
            <Image
              preview={false}
              src={custImg}
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
              }}
            />
          </Row>
          {/* customer details */}
          <Row
            style={{
              border: "1px solid #A3A3A3",
              padding: "10px",
              marginTop: "10px",
            }}
            align={"middle"}
          >
            <Col>
              <Row>
                <Text style={{ paddingRight: "10px" }}>
                  <FormattedMessage id="name" />
                </Text>
                <Text style={{ fontWeight: "bold" }}>{item.customerName}</Text>
              </Row>

              <Row>
                <Text style={{ paddingRight: "10px" }}>
                  <FormattedMessage id="phone" />
                </Text>
                <Text style={{ fontWeight: "bold" }}>{item.customerPhone}</Text>
              </Row>
              <Row>
                <Text style={{ paddingRight: "10px" }}>
                  <FormattedMessage id="invoice" />
                </Text>
                <Text
                  style={{ fontWeight: "bold" }}
                >{`#${item.customerInvoice}`}</Text>
              </Row>

              <Row>
                <Text style={{ paddingRight: "10px" }}>
                  <FormattedMessage id="dueDate" />
                </Text>
                <Text style={{ fontWeight: "bold" }}>{item.dueDate}</Text>
              </Row>

              <Row>
                <Text style={{ paddingRight: "10px" }}>
                  <FormattedMessage id="remaining" />
                </Text>
                <Text style={{ fontWeight: "bold" }}>{item.remainingAmt}</Text>
              </Row>
            </Col>
          </Row>
          {/* cloth details */}
          <Row style={{ marginTop: "10px" }}>
            <Col span={24}>
              <Row
                style={{
                  backgroundColor: "#1677ff",
                  padding: "15px",
                  color: "white",
                }}
                justify={"space-between"}
              >
                <Col span={6}>
                  <FormattedMessage id="clothType" />
                </Col>
                <Col span={6}>
                  <FormattedMessage id="unitPrice" />
                </Col>
                <Col span={6}>
                  <FormattedMessage id="qty" />
                </Col>
                <Col span={6}>
                  <FormattedMessage id="totalPrice" />
                </Col>
              </Row>

              {/* shirt */}
              <Row justify="space-around" style={{ padding: "15px" }}>
                <Col span={6}>
                  <FormattedMessage id="shirt" />
                </Col>
                <Col span={6}>
                  <Text>{item.totalAmt}</Text>
                </Col>
                <Col span={6}>
                  <Text>1</Text>
                </Col>
                <Col span={6}>
                  <Text>{item.totalAmt}</Text>
                </Col>
              </Row>
            </Col>
          </Row>
          <hr />
          {/* amount details */}

          <Row>
            <Col span={12}></Col>
            <Col span={12}>
              <Row>
                <Col span={24}>
                  <Text style={{ fontSize: "12px" }}>
                    <FormattedMessage id="totalAmount" />
                  </Text>

                  <Text style={{ paddingLeft: "10px" }}>{item.totalAmt}</Text>
                </Col>

                <Col span={24}>
                  <Text style={{ fontSize: "12px" }}>
                    <FormattedMessage id="advance" />
                  </Text>
                  <Text style={{ paddingLeft: "10px" }}>{item.advanceAmt}</Text>
                </Col>
                <Col span={24}>
                  <Text style={{ fontSize: "12px" }}>
                    <FormattedMessage id="remaining" />
                  </Text>
                  <Text style={{ paddingLeft: "10px", fontWeight: "bold" }}>
                    {item.remainingAmt}
                  </Text>
                </Col>
              </Row>
            </Col>
          </Row>
          {/* other details */}
          <Row style={{ marginTop: "10px" }}>
            <Col span={24}>
              <FormattedMessage id="dueDateRemeber" />
              <Text style={{ paddingLeft: "10px", fontWeight: "bold" }}>
                {item.dueDateRemeber}
              </Text>
            </Col>
            <Col span={24}>
              <FormattedMessage id="dueDate" />
              <Text style={{ paddingLeft: "10px", fontWeight: "bold" }}>
                {item.dueDate}
              </Text>
            </Col>
          </Row>

          {/* shop details */}
          <hr />
          <Row justify={"space-between"}>
            <Col span={6} style={{ textAlign: "center" }}>
              <FaLocationDot style={{ fontSize: "30px", color: "#1677ff" }} />
              <Paragraph style={{ fontSize: "10px" }}>
                <FormattedMessage id="shopAddress" />
              </Paragraph>
            </Col>

            <Col span={6} style={{ textAlign: "center" }}>
              <MdEmail style={{ fontSize: "30px", color: "#1677ff" }} />
              <Paragraph style={{ fontSize: "10px" }}>
                <FormattedMessage id="shopEmail" />
              </Paragraph>
            </Col>

            <Col span={6} style={{ textAlign: "center" }}>
              <FaPhoneAlt style={{ fontSize: "30px", color: "#1677ff" }} />
              <Paragraph style={{ fontSize: "10px" }}>
                <FormattedMessage id="shopPhone" />
              </Paragraph>
            </Col>
          </Row>
        </Col>
      </Modal>
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
          style={{ fontSize: "16px", fontWeight: "bold" }}
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
