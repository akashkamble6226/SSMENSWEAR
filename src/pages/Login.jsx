import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Typography,
  Image,
  notification,
  Spin,
  ConfigProvider,
} from "antd";
import React, { useMemo } from "react";
import suite from "../assets/suit.jpg";
import { useNavigate } from "react-router-dom";
import { getScreenSize, isPhoneActive } from "../components/ScreenSizes";
import { db } from "../firebase";
import styles from "../pages/Login.css";
// import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { setLoginStatus } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { FormattedMessage } from "react-intl";
// import { useDispatch } from "react-redux";
// import { LoginStatus } from "../store/AuthSlice";

const { Text, Title, Paragraph } = Typography;

const Context = React.createContext({
  name: "Default",
});
const Login = () => {
  const [isloading, setIsLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  let navigate = useNavigate();

  const openNotificationWithIcon = (type, msg, desc) => {
    api[type]({
      message: msg,
      description: desc,
    });
  };

  const dispatch = useDispatch();

  // const navigator = useNavigate();
  const onFinish = (values) => {
    setIsLoading(true);
    // Handle form submission here
    console.log("Received values:", values);
    // login here
    login(values.email, values.password);
  };

  const login = async (email, password) => {
    const docRef = collection(db, "Passwords");
    const docSnap = await getDocs(docRef);

    let status = false;

    docSnap.forEach((doc) => {
      const data = doc.data();
      if (data.Email === email && data.Password === password) {
        status = true;
      }
    });

    if (status) {
      setIsLoading(false);
      openNotificationWithIcon("success", "Welcome", "Log in successful.");
      dispatch(setLoginStatus(true));
      // go to new page
      navigate("/tailor/incompletOrders");
    } else {
      setIsLoading(false);
      openNotificationWithIcon("error", "Error", "Log in failed.");
    }
  };

  // useEffect(() => {}, []);

  const contextValue = useMemo(
    () => ({
      name: "Ant Design",
    }),
    []
  );
  return (
    <Context.Provider value={contextValue}>
      {contextHolder}
      <Row justify={"space-between"}>
        <Col
          style={{
            backgroundColor: "#071C2D",
            height: !isPhoneActive && "100vh",
            alignContent: "center",
          }}
          xs={24}
          sm={24}
          md={12}
          lg={12}
          span={12}
        >
          <Title
            level={2}
            style={{
              color: "#fff",
              textAlign: "center",
              fontWeight: "bold",
              marginTop: "10px",
            }}
          >
            <FormattedMessage id="storeName" />
          </Title>
          <Image src={suite} preview={false} style={{ width: "100%" }} />
        </Col>
        <Col
          span={12}
          style={{
            height: !isPhoneActive && "100vh",
            alignContent: "center",
            // paddingLeft: "5px",
            padding:"0px",
            marginTop: isPhoneActive && "10px",
          }}
          xs={24}
          sm={24}
          md={12}
          lg={12}
        >
          <Row justify={"center"}>
            <Col>
              <Card
                title=<Text style={{ fontSize: "25px", color: "#fff" }}>
                  <FormattedMessage id="login" />
                </Text>
                style={{ backgroundColor: "#071C2D", color: "#FFFFFF", margin:"0px" }}
              >
                <Col>
                  <ConfigProvider
                    theme={{
                      components: {
                        Form: {
                          labelColor: "#FFFFFF",
                        },
                      },
                    }}
                  >
                    <Form
                      name="loginForm"
                      onFinish={onFinish}
                      labelCol={{ span: 8 }}
                      wrapperCol={{ span: 16 }}
                    >
                      <Form.Item
                        style={{ color: "#ffffff" }}
                        labelAlign="left"
                        label=<Text style={{ fontSize: "20px", color: "#fff" }}>
                          <FormattedMessage id="email" />
                        </Text>
                        name="email"
                        rules={[
                          {
                            required: true,
                            message: (
                              <Text style={{ fontSize: "18px", color: "red" }}>
                                <FormattedMessage id="enterEmail" />
                              </Text>
                            ),
                          },
                        ]}
                      >
                        <Input size="large" />
                      </Form.Item>

                      <Form.Item
                        labelAlign="left"
                        label=<Text style={{ fontSize: "20px", color: "#fff" }}>
                          <FormattedMessage id="password" />
                        </Text>
                        name="password"
                        rules={[
                          {
                            required: true,
                            message: (
                              <Text style={{ fontSize: "18px", color: "red" }}>
                                <FormattedMessage id="enterPassword" />
                              </Text>
                            ),
                          },
                        ]}
                      >
                        <Input.Password size="large" />
                      </Form.Item>
                      {isloading ? (
                        <Row justify={"center"}>
                          <Spin size="large" />
                        </Row>
                      ) : (
                        <Row justify={"center"}>
                          <Form.Item>
                            <Button
                            size="large"
                              type="primary"
                              htmlType="submit"
                              style={{ marginTop: "20px", paddingTop:"0px", fontSize:"25px" }}
                            >
                              <FormattedMessage id="login" />
                            </Button>
                          </Form.Item>
                        </Row>
                      )}
                    </Form>
                  </ConfigProvider>
                </Col>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Context.Provider>
  );
};

export default Login;
