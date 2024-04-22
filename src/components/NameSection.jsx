import { Col, Row, Typography, Image, Input, Form, DatePicker } from "antd";
import { FormattedMessage } from "react-intl";

import { useState } from "react";

const { Text } = Typography;

const NameSection = (getDateCost) => {
  // const [datesData, setDatesData] = useState(new Set());
  const [dueDate, setDueDate] = useState(null);
  const [dueDateRemember, setDueDateRemember] = useState(null);

  // save the date and cost info to the slice
  // if(dueDate && setDueDate ) {
    
  // }
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
        {/* name */}
        {/* <Form.Item
          labelAlign="left"
          // label=<FormattedMessage id="name" />
          name="name"
          // noStyle={true}
          rules={[
            {
              required: true,
              message: <FormattedMessage id="enterName" />,
            },
          ]}
        >
          <Input placeholder="ग्राहकाचे नाव" />
        </Form.Item> */}
        {/* phone */}
        {/* <Form.Item
          labelAlign="left"
          // noStyle={true}
          // label=<FormattedMessage id="phone" />
          name="phone"
          rules={[
            {
              required: true,
              message: <FormattedMessage id="enterPhone" />,
            },
          ]}
        >
          <Input placeholder="फोन" />
        </Form.Item> */}
        {/* customerId - dynamic genrated id */}

        {/* due date */}

        <Row align="middle">
          <Col span={10}>
            <Text style={{ fontSize: "11px" }}>
              <FormattedMessage id="dueDate" />
            </Text>
          </Col>

          <Col span={14}>
            <Form.Item
              labelAlign="left"
              noStyle={true}
              // label=<FormattedMessage id="phone" />
              name="dueDate"
              rules={[
                {
                  required: true,
                  message: <FormattedMessage id="enterDate" />,
                },
              ]}
            >
              <DatePicker
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
        <Row align="middle" style={{ marginTop: "10px" }}>
          <Col span={10}>
            <Text style={{ fontSize: "11px" }}>
              <FormattedMessage id="dueDateRemeber" />
            </Text>
          </Col>
          <Col span={14}>
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
                placeholder="तारीख निवडा"
                // onChange={(dt, dateString) => {
                //   const parts = dateString.split("-");
                //   const formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
                //   setDueDateRemember(formattedDate);
                // }}
              />
            </Form.Item>
          </Col>
        </Row>
        {/* payment status */}
        <Row style={{ marginTop: "10px" }}>
          <Col
            style={{
              border: "1px solid #1677ff",
              padding: "10px",
              borderRadius: "10px",
            }}
          >
            <Row justify={"center"}>
              <Text style={{ fontSize: "11px" }}>
                <FormattedMessage id="paymentStatus" />
              </Text>
            </Row>
            <Row align="middle" style={{ marginTop: "10px" }}>
              <Col span={18}>
                <Text style={{ fontSize: "11px" }}>
                  <FormattedMessage id="totalAmount" />
                </Text>
              </Col>
              <Col span={6}>
                <Form.Item
                  labelAlign="left"
                  noStyle={true}
                  // label=<FormattedMessage id="phone" />
                  name="totalAmount"
                  rules={[
                    {
                      required: true,
                      message: <FormattedMessage id="enterCost" />,
                    },
                  ]}
                >
                  <Input placeholder="0" />
                </Form.Item>
              </Col>
            </Row>

            <Row align={"middle"} style={{ marginTop: "10px" }}>
              <Col span={18}>
                <Text style={{ fontSize: "11px" }}>
                  <FormattedMessage id="advance" />
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
                      message: <FormattedMessage id="enterCost" />,
                    },
                  ]}
                >
                  <Input placeholder="0" />
                </Form.Item>
              </Col>
            </Row>

            <Row align={"middle"} style={{ marginTop: "10px" }}>
              <Col span={18}>
                <Text style={{ fontSize: "11px" }}>
                  <FormattedMessage id="remaining" />
                </Text>
              </Col>
              <Col span={6}>
                <Form.Item
                  labelAlign="left"
                  noStyle={true}
                  // label=<FormattedMessage id="phone" />
                  name="remaining"
                  rules={[
                    {
                      required: true,
                      message: <FormattedMessage id="enterCost" />,
                    },
                  ]}
                >
                  <Input placeholder="0" />
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default NameSection;
