import { Avatar, Button, Card, Col, List, Row, Spin, Typography } from "antd";
import { MdOutlineMessage } from "react-icons/md";
import { UserOutlined } from "@ant-design/icons";
import { formatCountdown } from "antd/es/statistic/utils";
import { IoCallSharp } from "react-icons/io5";
import { FormattedMessage } from "react-intl";
import { dateDiffrenceInDays } from "../func/dateDiffrenceInDays";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

const AllIncompleteOrders = ({ docs, customerImageUrls, clothImageUrls }) => {
  let navigate = useNavigate();
  function goToDetailsPage(item) {
    const invoice = item.customerInvoice;
    const customerImgUrl = customerImageUrls[item.customerInvoice];
    const clothImgUrl = clothImageUrls[item.customerInvoice];
    const additionalData = {
      item,
      customerImgUrl,
      clothImgUrl,
    };
    navigate(`/tailor/incompletOrders/${invoice}`, {
      state: { additionalData },
    });
  }

  return (
    <>
      {docs.map((item) => (
        <Col xs={24}>
          <Card
            onClick={() => {
              customerImageUrls[item.customerInvoice] && goToDetailsPage(item);
            }}
            hoverable={true}
            style={{ border: "1px solid #A3A3A3", margin: "5px" }}
          >
            <Row align={"middle"}>
              <Col style={{ marginRight: "20px" }}>
                {customerImageUrls[item.customerInvoice] ? (
                  <Avatar
                    size={64}
                    icon={<UserOutlined />}
                    src={customerImageUrls[item.customerInvoice]}
                  />
                ) : (
                  <Spin />
                )}
              </Col>
              <Col>
                <Row>
                  <Text strong={true}>{item.customerName}</Text>
                </Row>
                <Row style={{ marginTop: "10px" }}>
                  <Col style={{ paddingRight: "10px" }}>
                    <MdOutlineMessage size={22} />
                  </Col>
                  <IoCallSharp size={22} />
                </Row>
                <Row style={{ marginTop: "10px" }}>
                  <Col flex={"auto"}>
                    <FormattedMessage id="deliveryDateRemaining" />
                    <Text strong style={{ marginLeft: "5px" }}>
                      {dateDiffrenceInDays(item.dueDate, item.dueDateRemeber)}
                    </Text>
                  </Col>
                </Row>
              </Col>

              <Col style={{ marginLeft: "5px" }}>
                <Button type="primary">
                  <FormattedMessage id="completed" />
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
      ))}
    </>
  );
};

export default AllIncompleteOrders;
