import React, { useState } from "react";
import { Col, Row, Tabs, Typography } from "antd";
import { FormattedMessage } from "react-intl";
import IncompleteOrders from "../pages/IncompletOrders";
import CompleteOrders from "../pages/CompleteOrders";
const { Text } = Typography;
const SubMenu = () => {
  const items = [
    {
      label: (
        <Text style={{ fontSize: "20px" }}>
          <FormattedMessage id="incomplete" />
        </Text>
      ),
      key: "incomplete",
      children: <IncompleteOrders />,
    },

    {
      label: (
        <Text style={{ fontSize: "20px" }}>
          <FormattedMessage id="complete" />
        </Text>
      ),
      key: "complete",
      children: <CompleteOrders />,
    },
  ];
  return (
    <Row>
      <Col span={24} style={{ paddingLeft: "10px" }}>
        <Tabs defaultActiveKey="1" size="large" items={items} />
      </Col>
    </Row>
  );
};
export default SubMenu;
