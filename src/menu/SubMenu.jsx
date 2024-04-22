import React, { useState } from "react";
import { Row, Tabs } from "antd";
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
    <Row >
      <Tabs defaultActiveKey="1" size="large" items={items}  />
    </Row>
  );
};
export default SubMenu;
