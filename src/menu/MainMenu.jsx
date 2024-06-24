import React, { useState } from "react";
import { Button, Col, Menu, Row } from "antd";
import { FormattedMessage } from "react-intl";
import Item from "antd/es/list/Item";
import { useDispatch } from "react-redux";
import { setLoginStatus } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import styles from "../menu/MainMenu.css";
const items = [
  {
    label: <FormattedMessage id="tailoring" />,
    key: "tailor",
    // icon: <MailOutlined />,
  },
  {
    label: <FormattedMessage id="fabrics" />,
    key: "fabric",
    // icon: <AppstoreOutlined />,
    //   disabled: true,
  },
];

export default function MainMenu() {
  const [current, setCurrent] = useState("tailor");
  const dispatch = useDispatch();
  let nav = useNavigate();
  const onClick = (e) => {
    if (e.key === "tailor") {
      nav("/tailor/incompletOrders");
    } else if (e.key === "fabric") {
      nav("/fabric");
    }
    setCurrent(e.key);
  };
  return (
    <Row style={{ backgroundColor: "#071C2D" }} align={"middle"}>
      <Col flex={"auto"} >
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          theme="dark"
          mode="horizontal"
          items={items}
          style={{ backgroundColor: "#071C2D" }}
        />
      </Col>
      <Col style={{paddingRight:"10px"}}>
        <Row>
          <Button
            type="primary"
            shape="round"
            size="middle"
            style={{ backgroundColor: "#E17B2B" }}
            onClick={() => dispatch(setLoginStatus(false))}
          >
            <FormattedMessage id="logout" />
          </Button>
        </Row>
      </Col>
    </Row>
  );
}
