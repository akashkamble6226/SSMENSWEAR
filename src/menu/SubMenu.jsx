import React, { useState } from "react";
import { Col, Row, Tabs } from "antd";
import { FormattedMessage } from "react-intl";
import IncompleteOrders from "../pages/IncompletOrders";
import CompleteOrders from "../pages/CompleteOrders";
const SubMenu = () => {
  const items = [
    {
      label: <FormattedMessage id="incomplete" />,
      key: "incomplete",
      children: <IncompleteOrders />,
    },

    {
      label: <FormattedMessage id="complete" />,
      key: "complete",
      children: <CompleteOrders />,
    },
  ];
  return (
    <Row>
      <Col span={24}>
        <Tabs defaultActiveKey="1" size="large" items={items} />
      </Col>
    </Row>
  );
};
export default SubMenu;
