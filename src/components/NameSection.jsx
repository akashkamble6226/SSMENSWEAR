import { Col, Row, Typography, Input, Form, DatePicker } from "antd";
import { FormattedMessage } from "react-intl";
import { useState } from "react";
const { Text } = Typography;

const NameSection = (getDateCost) => {
  const [totalAmt, setTotalAmt] = useState(0);
  const [advanceAmt, setAdvanceAmt] = useState(0);

  const calculateRemaining = () => {
    console.log("totalAmt", totalAmt);
    console.log("advanceAmt", advanceAmt);
    const remaining = totalAmt - advanceAmt;
    return remaining;
  };

  return (
    <>
      <Col
        style={{
          padding: "10px",
          marginBottom: "10px",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.7)",
          borderRadius: "10px",
          // height: "150px",
        }}
      >
        {/* due date */}

        <Row align="middle" justify={"space-between"}>
          <Col>
            <Text style={{ fontSize: "18px" }}>
              <FormattedMessage id="dueDate" />
            </Text>
          </Col>

          <Col>
            <Form.Item
              labelAlign="left"
              noStyle={true}
              // label=<FormattedMessage id="phone" />
              name="dueDate"
              rules={[
                {
                  required: true,
                  message: (
                    <Text style={{ fontSize: "18px" }}>
                      <FormattedMessage id="enterDate" />
                    </Text>
                  ),
                },
              ]}
            >
              <DatePicker
                size="large"
                style={{ fontSize: "18px" }}
                placeholder="तारीख निवडा"
                // onChange={(dt, dateString) => {
                //   const parts = dateString.split("-");
                //   const formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
                //   setDueDate(formattedDate);
                // }}
              />
            </Form.Item>
          </Col>
        </Row>

        {/* remeber date */}
        <Row
          align="middle"
          style={{ marginTop: "10px" }}
          justify={"space-between"}
        >
          <Col>
            <Text style={{ fontSize: "18px" }}>
              <FormattedMessage id="dueDateRemeber" />
            </Text>
          </Col>
          <Col>
            <Form.Item
              labelAlign="left"
              noStyle={true}
              // label=<FormattedMessage id="phone" />
              name="dueDateRemeber"
              rules={[
                {
                  required: true,
                  message: <FormattedMessage id="enterDate" />,
                },
              ]}
            >
              <DatePicker
                size="large"
                style={{ fontSize: "18px" }}
                placeholder="तारीख निवडा"
              />
            </Form.Item>
          </Col>
        </Row>
        {/* payment status */}
        <Row style={{ marginTop: "10px"}}>
          <Col
            style={{
              border: "1px solid #1677ff",
              padding: "10px",
              borderRadius: "10px",
              width:"100%"
            }}
          >
            <Row justify={"center"}>
              <Text style={{ fontSize: "18px" }}>
                <FormattedMessage id="paymentStatus" />
              </Text>
            </Row>
            <Row align="middle" style={{ marginTop: "10px" }}>
              <Col span={18}>
                <Text style={{ fontSize: "17px" }}>
                  <FormattedMessage id="totalAmount" />
                </Text>
              </Col>
              <Col span={6}>
                <Form.Item
                  labelAlign="left"
                  noStyle={true}
                  name="totalAmount"
                  rules={[
                    {
                      required: true,
                      message: <Text style={{fontSize:"17"}}><FormattedMessage id="enterCost" /></Text>,
                    },
                  ]}
                >
                  <Input
                  size="large"
                    type="number"
                    placeholder="0"
                    value={totalAmt}
                    onChange={(e) => setTotalAmt(parseInt(e.target.value))}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row align={"middle"} style={{ marginTop: "10px" }}>
              <Col span={18}>
                <Text style={{ fontSize: "17px" }}>
                  Advance Amount
                </Text>
              </Col>
              <Col span={6}>
                <Form.Item
                  labelAlign="left"
                  noStyle={true}
                  // label=<FormattedMessage id="phone" />
                  name="advance"
                  rules={[
                    {
                      required: true,
                      message: <Text style={{fontSize:"17"}}><FormattedMessage id="enterCost" /></Text>,
                    },
                  ]}
                >
                  <Input
                  size="large"
                    placeholder="0"
                    type="number"
                    value={advanceAmt}
                    onChange={(e) => setAdvanceAmt(parseInt(e.target.value))}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row align={"middle"} style={{ marginTop: "10px" }}>
              <Col span={18}>
                <Text style={{ fontSize: "17px" }}>
                  <FormattedMessage id="remaining" />
                </Text>
              </Col>
              <Col span={6}>
                <Input
                size="large"
                  type="number"
                  placeholder={calculateRemaining()}
                  readOnly
                />
                {/* </Form.Item> */}
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default NameSection;
