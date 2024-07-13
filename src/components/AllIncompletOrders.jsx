import { Avatar, Button, Card, Col, List, Row, Spin, Typography } from "antd";
import { MdOutlineMessage } from "react-icons/md";
import { UserOutlined } from "@ant-design/icons";
import { formatCountdown } from "antd/es/statistic/utils";
import { IoCallSharp } from "react-icons/io5";
import { FormattedMessage } from "react-intl";
import { dateDiffrenceInDays } from "../func/dateDiffrenceInDays";
import { useNavigate } from "react-router-dom";
// import "AllIncompleteOrders.css";

const { Text } = Typography;

const AllIncompleteOrders = ({ docs, customerImageUrls, clothImageUrls }) => {
  let navigate = useNavigate();
  function goToDetailsPage(item) {
    console.log("The item", item);
    const invoice = item.customerInvoice;
    const customerImgUrl = customerImageUrls[item.customerInvoice];
    const clothImgUrl = clothImageUrls[item.customerInvoice];
    // console.log("the ", invoice)
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
            style={{
              border: "1px solid #A3A3A3",
              margin: "5px",
              padding: "0px",
            }}
          >
            <Row align={"middle"} justify={"space-between"}>
              <Col>
                {customerImageUrls[item.customerInvoice] ? (
                  <Avatar
                    size={50}
                    icon={<UserOutlined />}
                    src={customerImageUrls[item.customerInvoice]}
                  />
                ) : (
                  <Spin />
                )}
              </Col>
              <Col>
                <Text
                  ellipsis
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    width: "150px",
                  }}
                >
                  {item.customerName}
                </Text>
                <Row style={{ width: "150px" }}>
                  <Text ellipsis style={{ fontSize: "16px" }}>
                    <FormattedMessage id="deliveryDateRemaining" />
                    <b>
                      {` ${dateDiffrenceInDays(item.dueDate, item.dueDateRemeber)}`}
                    </b>
                  </Text>
                </Row>
              </Col>
              <Col>
                <Row align={"middle"} justify={"space-between"}>
                  <MdOutlineMessage size={25} />
                  <IoCallSharp size={25} />
                </Row>
                {/* <Row style={{paddingRight:"10px"}} justify={"center"}> */}
                <Button
                  type="primary"
                  size="large"
                  style={{ width: "80px", marginTop: "10px", fontSize: "18px" }}
                >
                  <FormattedMessage id="completed" />
                </Button>
                {/* </Row> */}
              </Col>
            </Row>
          </Card>
        </Col>
      ))}
    </>
  );
};

export default AllIncompleteOrders;
