import {
  ArrowLeftOutlined,
  CheckCircleOutlined,
  CloseOutlined,
  LeftOutlined,
  LeftSquareOutlined,
  RightOutlined,
  RightSquareOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Col,
  FloatButton,
  Form,
  Modal,
  Row,
  Input,
  Spin,
  Button,
  ConfigProvider,
  Select,
  Typography,
  Radio,
  List,
  Card,
  Image,
  Avatar,
  InputNumber,
  Slider,
  DatePicker,
} from "antd";
import { useEffect, useRef, useState } from "react";
import { FormattedMessage } from "react-intl";
import styles from "./IncompletOrders.css";
import shirt from "../assets/shirt.png";
import pant from "../assets/pant.png";

import Title from "antd/es/skeleton/Title";
import { useDispatch, useSelector } from "react-redux";
import {
  setNewCustomerGender,
  setNewCustomerName,
  setNewCustomerPant,
  setNewCustomerPhone,
  setNewCustomerShirt,
} from "../store/newCustomerSlice";
import ImageSection from "../components/ImageSection";
import NameSection from "../components/NameSection";
import ShirtSection from "../components/ShirtSection";
import {
  setAdvanceAmount,
  setDeliveryDate,
  setDueDate,
  setLength,
  setRemainingAmount,
  setTotalAmt,
  setPocketCountState,
  setCollarTypeState,
  setChest,
  setLengthState,
  setLengthSizeState,
  setChestSizeState,
  setWeist,
  setWeistSizeState,
  setShoulder,
  setShoulderSizeState,
  setCollar,
  setCollarSizeState,
  setLengthOfHand,
  setLengthOfHandSizeState,
  setHandFourSide,
  setHandFourSideSizeState,
  setWrist,
  setHip,
  setHipSizeState,
  setWristSizeState,
} from "../store/newCustomerSliceNext";
const { Text } = Typography;

const IncompleteOrders = () => {
  const [isAddingCustomer, setIsAddingCustomer] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const [value, setValue] = useState(1);
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [isNewCustomerDetails, setIsNewCustomerDetails] = useState(false);

  const [toggleCountPant, setToggleCountPant] = useState(1);
  const [toggleCountShirt, setToggleCountShirt] = useState(1);

  const [dressTypeError, setDressTypeError] = useState(false);
  // const [newCustomerPhone, setNewCustomerPhone] = useState("");

  // Shirt section states
  const [lengthSize, setLengthSize] = useState(0);
  const [chestSize, setChestSize] = useState(0);
  const [weistSize, setWeistSize] = useState(0);
  const [shoulderSize, setShoulderSize] = useState(0);
  const [collarSize, setCollarSize] = useState(0);
  const [lengthOfHandSize, setLengthOfHandSize] = useState(0);
  const [handFourSideSize, setHandFourSideSize] = useState(0);
  const [wriestSize, setWriestSize] = useState(0);
  const [hipSize, setHipSize] = useState(0);
  const [pocketsSize, setPocketsSize] = useState(0);
  const [collarType, setCollarType] = useState(1);

  const dispatch = useDispatch();

  const customerName = useSelector((state) => state.newCustomerRecord.name);
  const customerPhone = useSelector((state) => state.newCustomerRecord.phone);
  const customerGender = useSelector((state) => state.newCustomerRecord.gender);
  const customerShirtDetails = useSelector((state) => state.newCustomerRecord.shirt);
  // const val = useSelector((state) => state.newCustomerRecordNext.length);
  // const val2 = useSelector((state) => state.newCustomerRecordNext.lengthSize);
  // useEffect(() => {
  //   console.log(val,val2);
  // }, [val,val2]);
  const formRef = useRef(null);

  const selectItem = (itemId) => {
    const updatedSelectedItems = new Set(selectedItems);
    if (updatedSelectedItems.has(itemId.props.id)) {
      updatedSelectedItems.delete(itemId.props.id);
    } else {
      updatedSelectedItems.add(itemId.props.id);
    }
    setSelectedItems(updatedSelectedItems);
  };

  const showModal = () => {
    setIsAddingCustomer(true);
  };

  const onCancle = () => {
    setIsAddingCustomer(false);
    setIsNewCustomerDetails(false);
  };

  // console.log("selectedItems.entries.length", selectedItems.size);

  const onFinish = (values) => {
    if (selectedItems.size !== 0) {
      setIsLoading(true);
      // Handle form submission here
      console.log("Received values:", values.name, values.phone);
      // login here
      setIsLoading(false);
      // setNewCustomerName(values.name);
      // setNewCustomerPhone(values.phone);
      prepareToSaveToFirebase(values.name, values.phone);
    } else {
      setDressTypeError(true);
    }
  };

  console.log(dressTypeError);

  const prepareToSaveToFirebase = (name, phone) => {
    const gender = value === 1 ? "पुरुष" : "महिला";
    const shirt = selectedItems.has("shirt") ? true : false;
    const pant = selectedItems.has("pant") ? true : false;
    console.log(
      "THe data,",
      name,
      phone,
      gender,
      shirt,
      pant,
      toggleCountPant,
      toggleCountShirt
    );
    // save the data to store , and open next modal
    dispatch(setNewCustomerName(name));
    dispatch(setNewCustomerPhone(phone));
    dispatch(setNewCustomerGender(gender));
    dispatch(setNewCustomerShirt([shirt, toggleCountShirt]));
    dispatch(setNewCustomerPant([pant, toggleCountPant]));

    // clean the form
    if (formRef.current) {
      formRef.current.resetFields();
    }
    setValue(1);
    setSelectedItems(new Set());

    // open second modal
    setIsNewCustomerDetails(true);

    // clear the form once modal closed
  };

  const changeCount = (increase, type) => {
    console.log("The type", type);
    if (increase) {
      switch (type) {
        case "shirt":
          setToggleCountShirt(toggleCountShirt + 1);
          break;
        case "pant":
          setToggleCountPant(toggleCountPant + 1);
          break;
        default:
      }
    } else {
      switch (type) {
        case "shirt":
          if (toggleCountShirt !== 1) {
            setToggleCountShirt(toggleCountShirt - 1);
          }
          break;
        case "pant":
          if (toggleCountPant !== 1) {
            setToggleCountPant(toggleCountPant - 1);
          }
          break;
        default:
      }
    }
  };

  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  const data = [
    {
      title: <FormattedMessage id="shirt" />,
      image: shirt,
    },
    {
      title: <FormattedMessage id="pant" />,
      image: pant,
    },
  ];

  // to get collarType, pocketSize, and all other sizes
  const getDetails = (
    collarType,
    pocketSize,
    lengthSize,
    chestSize,
    weistSize,
    shoulderSize,
    collarSize,
    lengthOfHandSize,
    handFourSideSize,
    wriestSize,
    hipSize
  ) => {
    setLengthSize(lengthSize);
    setCollarSize(collarSize);
    setCollarType(collarType);
    setPocketsSize(pocketSize);
    setChestSize(chestSize);
    setWeistSize(weistSize);
    setShoulderSize(shoulderSize);
    setLengthOfHandSize(lengthOfHandSize);
    setHandFourSideSize(handFourSideSize);
    setWriestSize(wriestSize);
    setHipSize(hipSize);
  };

  const getDate = (obj) => {
    const date = new Date(obj); // Create a Date object from the date string
    const day = date.getDate().toString().padStart(2, "0"); // Get day and pad with leading zero if necessary
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Get month (zero-based index) and pad with leading zero if necessary
    const year = date.getFullYear(); // Get full year (4 digits)
    return `${day}/${month}/${year}`;
  };

  const onFinish2Form = (values) => {
    console.log("Items", values);
    // name
    
    // phone

    // gender

    // shirt details

    //  dates
    const dueDate = getDate(values.dueDate);
    const dueDateRemeber = getDate(values.dueDateRemeber);

    // amount
    const totalAmt = values.totalAmount;
    const advanceAmt = values.advance;
    const remainingAmt = values.remaining;

    // if Shirt
    const len = values.length;
    const chest = values.chest;
    const weist = values.waist;
    const shoulder = values.shoulder;
    const collar = values.collar;
    const lengthOfHand = values.lengthOfHand;
    const handFourSide = values.handFourSide;
    const wrist = values.wrist;
    const hip = values.hip;

    // sizes 

    
    // save data to firebase storage

    // get the data from storage to homescreen
    // make it live and fix camera issue save image etc
    // make the form correct for pricing

    // share demo 1
    // test

    // dispatch(setDeliveryDate(dueDate));
    // dispatch(setDueDate(dueDateRemeber));
    // dispatch(setTotalAmt(totalAmt));
    // dispatch(setAdvanceAmount(advanceAmt));
    // dispatch(setRemainingAmount(remainingAmt));
    // dispatch(setCollarTypeState(collarType));
    // dispatch(setPocketCountState(pocketsSize));

    // dispatch(setLength(len));
    // dispatch(setLengthSizeState(lengthSize));
    // dispatch(setChest(chest));
    // dispatch(setChestSizeState(chestSize));
    // dispatch(setWeist(weist));
    // dispatch(setWeistSizeState(weistSize));
    // dispatch(setShoulder(shoulder));
    // dispatch(setShoulderSizeState(shoulderSize));
    // dispatch(setCollar(collar));
    // dispatch(setCollarSizeState(collarSize));
    // dispatch(setLengthOfHand(lengthOfHand));
    // dispatch(setLengthOfHandSizeState(lengthOfHandSize));
    // dispatch(setHandFourSide(handFourSide));
    // dispatch(setHandFourSideSizeState(handFourSideSize));
    // dispatch(setWrist(wrist));
    // dispatch(setWristSizeState(wriestSize));
    // dispatch(setHip(hip));
    // dispatch(setHipSizeState(hipSize));
  };

  return (
    <>
      <Col>
        <Row>
          <FormattedMessage id="noRecords" />
        </Row>
      </Col>
      <FloatButton
        onClick={showModal}
        shape="circle"
        type="primary"
        tooltip={<FormattedMessage id="addUser" />}
        style={{
          right: 24,
        }}
        icon={<UserAddOutlined />}
      />
      <Modal
        title={
          isNewCustomerDetails ? (
            <Row justify={"space-between"}>
              <ArrowLeftOutlined
                onClick={() => setIsNewCustomerDetails(false)}
              />
              <Row justify={"center"} align={"middle"}>
                <Text style={{ fontSize: "11px" }}>{`${customerName} - `}</Text>
                <Text style={{ fontSize: "11px" }}>{"(0001)"}</Text>
              </Row>

              <CloseOutlined onClick={onCancle} />
            </Row>
          ) : (
            <FormattedMessage id="newCustomer" />
          )
        }
        open={isAddingCustomer}
        // onOk={handleOk}
        closable={false}
        footer={null}
        width={300}
      >
        <Col>
          <ConfigProvider
            theme={{
              components: {
                Form: {
                  labelColor: "#000000",
                },
              },
            }}
          >
            {isNewCustomerDetails ? (
              <Form
                // ref={formRef}
                name="onFinish2Form"
                // className="login-form"
                onFinish={onFinish2Form}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
              >
                <ImageSection />
                <NameSection />
                <ShirtSection getDetails={getDetails} />
                <Row justify={"space-around"}>
                  <Form.Item>
                    <Button
                      type="default"
                      // htmlType="submit"
                      style={{ marginTop: "20px" }}
                    >
                      <Text>Invoice</Text>
                    </Button>
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ marginTop: "20px" }}
                    >
                      <Text style={{ color: "#FFFFFF" }}>Save</Text>
                    </Button>
                  </Form.Item>
                </Row>
              </Form>
            ) : (
              <Form
                ref={formRef}
                name="loginForm"
                className="login-form"
                onFinish={onFinish}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
              >
                <Form.Item
                  labelAlign="left"
                  // label=<FormattedMessage id="name" />
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: <FormattedMessage id="enterName" />,
                    },
                  ]}
                >
                  <Input placeholder="ग्राहकाचे नाव" />
                </Form.Item>

                <Form.Item
                  labelAlign="left"
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
                </Form.Item>

                <Radio.Group
                  onChange={onChange}
                  value={value}
                  style={{ paddingTop: "10px" }}
                >
                  <Radio value={1}>
                    <FormattedMessage id="men" />
                  </Radio>
                  <Radio value={2}>
                    <FormattedMessage id="women" />
                  </Radio>
                </Radio.Group>

                {/* {dressTypeError && (
                <Text style={{ color: "#000000" }}>
                  <FormattedMessage id="dressType" />
                </Text>
              )} */}

                <div style={{ width: "100%", overflowX: "auto" }}>
                  <List
                    style={{ whiteSpace: "nowrap" }}
                    dataSource={data}
                    renderItem={(item) => (
                      <List.Item
                        style={{
                          display: "inline-block",
                          marginRight: "8px",
                          // paddingBottom: "0px",
                        }}
                      >
                        <Card
                          // title="QTY"
                          style={{
                            width: 150,
                            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                            backgroundColor: "#88b3f0",
                            cursor: "pointer",
                            // paddingBottom: "10px",
                            height: "200px",
                            padding: "0px",

                            border:
                              selectedItems.has(item.title.props.id) &&
                              "3px solid #1677ff",
                          }}
                        >
                          <Row
                            align="middle"
                            onClick={() => selectItem(item.title)}
                          >
                            <Col
                              span={24}
                              style={{
                                textAlign: "center",
                                paddingTop: "10px",
                              }}
                            >
                              {!selectedItems.has(item.title.props.id) ? (
                                <Avatar
                                  shape="circle"
                                  size={64}
                                  src={item.image}
                                />
                              ) : (
                                <Avatar
                                  shape="circle"
                                  size={64}
                                  icon={
                                    <CheckCircleOutlined
                                      style={{ color: "#000" }}
                                    />
                                  }
                                />
                              )}
                            </Col>
                            <Col span={24}>
                              <Row justify="center">
                                <Text
                                  style={{ color: "#000000", fontSize: 20 }}
                                >
                                  {item.title}
                                </Text>
                              </Row>
                            </Col>
                          </Row>
                          <Row>
                            {
                              <Col
                                span={24}
                                style={{
                                  visibility:
                                    !selectedItems.has(item.title.props.id) &&
                                    "hidden",
                                }}
                              >
                                <Row justify={"center"} align={"middle"}>
                                  <Col
                                    onClick={() =>
                                      changeCount(false, item.title.props.id)
                                    }
                                  >
                                    <LeftSquareOutlined
                                      style={{
                                        fontSize: "20px",
                                        color: "#000",
                                      }}
                                    />
                                  </Col>
                                  <Text
                                    style={{
                                      marginLeft: "10px",
                                      marginRight: "10px",
                                      fontSize: "20px",
                                      color: "#000",
                                    }}
                                  >
                                    {item.title.props.id === "shirt"
                                      ? toggleCountShirt
                                      : toggleCountPant}
                                  </Text>
                                  <Col
                                    onClick={() =>
                                      changeCount(true, item.title.props.id)
                                    }
                                  >
                                    <RightSquareOutlined
                                      style={{
                                        fontSize: "20px",
                                        color: "#000",
                                      }}
                                    />
                                  </Col>
                                </Row>
                              </Col>
                            }
                          </Row>
                        </Card>
                      </List.Item>
                    )}
                  />
                  <Row>
                    <Col xs={24}>
                      {selectedItems.size === 0 && dressTypeError && (
                        <Row>
                          <Text
                            style={{
                              fontSize: "18px",
                              color: "#ff4d4f",
                              marginInlineEnd: "4px",
                            }}
                          >
                            *
                          </Text>
                          <Text
                            style={{
                              color: "#ff4d4f",
                              marginInlineEnd: "4px",
                            }}
                          >
                            <FormattedMessage id="dressType" />
                          </Text>
                        </Row>
                      )}
                    </Col>
                  </Row>
                </div>

                <Row justify={"center"}>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ marginTop: "20px" }}
                    >
                      <FormattedMessage id="next" />
                    </Button>
                  </Form.Item>
                </Row>
              </Form>
            )}
          </ConfigProvider>
        </Col>
      </Modal>
    </>
  );
};
export default IncompleteOrders;
