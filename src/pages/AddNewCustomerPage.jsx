import {
  ArrowLeftOutlined,
  CheckCircleOutlined,
  CloseOutlined,
  LeftSquareOutlined,
  RightSquareOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import {
  Col,
  FloatButton,
  Form,
  Modal,
  Row,
  Input,
  Button,
  ConfigProvider,
  Typography,
  Radio,
  List,
  Card,
  Avatar,
  Spin,
  Tooltip,
} from "antd";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { FormattedMessage } from "react-intl";
import shirt from "../assets/shirt.png";
import pant from "../assets/pant.png";
import { IoAddOutline } from "react-icons/io5";
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
import { FaArrowLeft, FaEdit } from "react-icons/fa";
import { db, storage } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { getCustomersCount } from "../func/customerCount";
import { totalCustomerCountStatus } from "../store/totalCustomerCountSlice";
import { CustomerNameFormat } from "../func/customerNameFormatting";
import Loader from "../components/Loader";
import useLoader from "../customeHooks/Loader";
import { isValidPhoneNumber } from "../func/phoneNumberValid";
import useItemCount from "../customeHooks/ItemCount";
import { getDate } from "../func/getDate";
import { useNavigate } from "react-router-dom";
import useAllIncompletOrders from "../customeHooks/AllIncompleteOrders";
import AllIncompleteOrders from "../components/AllIncompletOrders";
import useAllCustomerImages from "../customeHooks/AllCustomerImages";
import { IsShirtCircleContext } from "../context/ShirtContext";
import { convertToBlobObject } from "../func/blob";
import { getShirtType } from "../func/shirtType";
import useNotificationHook from "../customeHooks/Notification";
const { Text } = Typography;

const Context = React.createContext({
  name: "Default",
});

const AddNewCustomerPage = () => {
  const [isShirtCircle, setIsShirtCircle] = useState(1);
  const [isAddingCustomer, setIsAddingCustomer] = useState(false);
  const [value, setValue] = useState(1);
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [isNewCustomerDetails, setIsNewCustomerDetails] = useState(false);
  const { openNotificationWithIcon, contextHolder } = useNotificationHook();
  const { spinning, setSpinning, percent, setPercent, showLoader } =
    useLoader();

  const {
    changeCount,
    toggleCountPant,
    setToggleCountPant,
    toggleCountShirt,
    setToggleCountShirt,
  } = useItemCount();
  const { allInCompletOrdersData, loadingData } = useAllIncompletOrders();

  const {
    customerImageUrls,
    loadingCustomerImages,
    clothImageUrls,
    loadingClothImages,
  } = useAllCustomerImages();

  const [dressTypeError, setDressTypeError] = useState(false);

  const dispatch = useDispatch();

  let navigate = useNavigate();

  const customerName = useSelector((state) => state.newCustomerRecord.name);
  const customerPhone = useSelector((state) => state.newCustomerRecord.phone);
  const customerGender = useSelector((state) => state.newCustomerRecord.gender);
  const customerShirtDetails = useSelector(
    (state) => state.newCustomerRecord.shirt
  );

  const [selectedClientImage, setSelectedClientImage] = useState(null);
  const [selectedClothImage, setSelectedClothImage] = useState(null);

  const totalCustCount = useSelector(
    (state) => state.totalCustomerCount.totalCustomerCount
  );

  async function getCount() {
    let count = await getCustomersCount();
    dispatch(totalCustomerCountStatus(count));
  }
  useEffect(() => {
    getCount();
  }, [isAddingCustomer]);

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

  const goBack = () => {
    if (isNewCustomerDetails) {
      setIsNewCustomerDetails(false);
    } else {
      navigate("/tailor/incompletOrders");
    }
  };

  const onCancle = () => {
    setIsAddingCustomer(false);
    setIsNewCustomerDetails(false);
  };

  const onFinish = (values) => {
    if (selectedItems.size !== 0) {
      const isValidPhone = isValidPhoneNumber(values.phone);
      if (isValidPhone) {
        prepareToSaveToFirebase(values.name, values.phone);
      } else {
        openNotificationWithIcon(
          "error",
          "Error",
          <FormattedMessage id="wrongPhoneNumber" />
        );
      }
    } else {
      setDressTypeError(true);
    }
  };

  const prepareToSaveToFirebase = (name, phone) => {
    const gender = value === 1 ? "पुरुष" : "महिला";
    const shirt = selectedItems.has("shirt") ? true : false;
    const pant = selectedItems.has("pant") ? true : false;

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

  const getImages = (clientImage, clothImage) => {
    console.log(clientImage);
    setSelectedClientImage(clientImage);
    setSelectedClothImage(clothImage);
  };

  const onFinish2Form = async (values) => {
    console.log("Filled Values", values);

    // ShirtDetails
    const shirtIsCircleOrSquare = isShirtCircle === 1 ? "गोल" : "चौकोन";
    let shirtType = getShirtType(values.shirtType);
    console.log("shirtType", shirtType);
    // new field details
    const height = values.height;
    const bahi = values.bahi;
    const shoulder = values.shoulder;
    const chest = values.chest;
    const stomach = values.stomach;
    const hip = values.hip;
    const collar = values.collar;
    const cup = values.cup;
    const munda = values.munda;
    const DandGear = values.DandGear;
    const pocketCount = values.pocketCount;

    //pocketCount
    const pocketsSize = values.pocketCount;

    const formatedCustomerName = CustomerNameFormat(customerName);

    //  dates
    const dueDate = getDate(values.dueDate);
    const dueDateRemeber = getDate(values.dueDateRemeber);

    // amount
    const totalAmt = values.totalAmount;
    const advanceAmt = values.advance;
    const remainingAmt = totalAmt - advanceAmt;

    try {
      if (selectedClientImage && selectedClothImage) {
        // turn on loader
        showLoader();
        // saving images
        for (let i = 0; i <= 1; i++) {
          let currentImage, currentFolderName;
          if (i === 0) {
            currentImage = selectedClientImage;
            currentFolderName = "customerImages";
          } else {
            currentImage = selectedClothImage;
            currentFolderName = "clothImages";
          }
          console.log("CurrentImage", currentImage);
          const blob = convertToBlobObject(currentImage);
          console.log("The Blob", blob);
          const imageRef = ref(
            storage,
            `${currentFolderName}/${formatedCustomerName}_${customerPhone}_000${totalCustCount}`
          );

          uploadBytes(imageRef, blob).then((snapshot) => {
            getDownloadURL(snapshot.ref)
              .then((url) => {
                console.log(url);
              })
              .catch((error) => {
                console.log(error);
              });
          });
        }

        // saving customer material data
        const customerRef = doc(
          db,
          "Customers",
          `${formatedCustomerName}_${customerPhone}_000${totalCustCount}`
        );
        await setDoc(customerRef, {
          // first page details
          customerName,
          customerPhone,
          customerGender,
          customerInvoice: `000${totalCustCount}`,
          customerShirtDetails,
          // other page details
          dueDate,
          dueDateRemeber,
          totalAmt,
          advanceAmt,
          remainingAmt,
          shirtIsCircleOrSquare,
          shirtType,
          height,
          shoulder,
          bahi,
          chest,
          stomach,
          hip,
          collar,
          cup,
          munda,
          DandGear,
          pocketCount,
        });

        openNotificationWithIcon(
          "success",
          "Success",
          <FormattedMessage id="addedNewRecord" />
        );
        // stop spin
        setSpinning(false);
        // after completion , if user clicks on button should get starting form
        onCancle();
      } else {
        openNotificationWithIcon(
          "error",
          "Error",
          <FormattedMessage id="imagesError" />
        );
      }
    } catch (e) {
      openNotificationWithIcon(
        "error",
        "Error",
        <FormattedMessage id="errorAddingNewRecord" />
      );

      setSpinning(false);
    }
  };

  const contextValue = useMemo(
    () => ({
      name: "Ant Design",
    }),
    []
  );

  return (
    <Context.Provider value={contextValue}>
      {contextHolder}
      <Col>
        <Row align={"middle"}>
          <Col style={{ padding: "10px" }} onClick={goBack}>
            <Avatar
              shape="circle"
              size={"large"}
              style={{ backgroundColor: "#001529", cursor: "pointer" }}
              src={
                <FaArrowLeft
                  color="#ffffff"
                  style={{ fontSize: "20px", margin: "5px" }}
                />
              }
            />
          </Col>
          <Text style={{ fontSize: "25px" }}>
            <FormattedMessage id="newCustomer" />
          </Text>
        </Row>
        {isNewCustomerDetails ? (
          <Form
            // ref={formRef}
            name="onFinish2Form"
            // className="login-form"
            onFinish={onFinish2Form}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ padding: "10px" }}
          >
            {spinning && <Loader spinning={spinning} percent={percent} />}
            <ImageSection getImages={getImages} />
            <NameSection />
            <IsShirtCircleContext.Provider
              value={{ isShirtCircle, setIsShirtCircle }}
            >
              <ShirtSection />
            </IsShirtCircleContext.Provider>
            <Row justify={"center"}>
              <Form.Item>
                <Button
                  size="large"
                  type="primary"
                  htmlType="submit"
                  style={{
                    marginTop: "20px",
                    width: "100px",
                    height: "50px",
                    fontSize: "20px",
                  }}
                >
                  Save
                </Button>
              </Form.Item>
            </Row>
          </Form>
        ) : (
          <Form
            ref={formRef}
            name="newCustomerForm"
            // className="login-form"
            onFinish={onFinish}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 24 }}
            style={{ padding: "10px" }}
          >
            <Form.Item
              labelAlign="left"
              name="name"
              rules={[
                {
                  required: true,
                  message: (
                    <Text style={{ fontSize: "18px", color: "red" }}>
                      <FormattedMessage id="enterName" />
                    </Text>
                  ),
                },
              ]}
            >
              <Input
                size="large"
                placeholder="ग्राहकाचे नाव"
                style={{ fontSize: "22px" }}
              />
            </Form.Item>

            <Form.Item
              labelAlign="left"
              name="phone"
              rules={[
                {
                  required: true,
                  message: (
                    <Text style={{ fontSize: "18px", color: "red" }}>
                      <FormattedMessage id="enterPhone" />
                    </Text>
                  ),
                },
              ]}
            >
              <Input
                placeholder="फोन"
                maxLength={10}
                type="number"
                style={{ fontSize: "22px" }}
              />
            </Form.Item>

            <Radio.Group
              onChange={onChange}
              size="large"
              value={value}
              style={{ paddingTop: "5px", paddingBottom: "10px" }}
            >
              <Radio value={1} style={{ fontSize: "22px" }}>
                <FormattedMessage id="men" />
              </Radio>
              <Radio value={2} style={{ fontSize: "22px" }}>
                <FormattedMessage id="women" />
              </Radio>
            </Radio.Group>
            <div style={{ width: "100%", overflowX: "auto" }}>
              <List
                style={{ whiteSpace: "nowrap" }}
                dataSource={data}
                renderItem={(item) => (
                  <List.Item
                    style={{
                      display: "inline-block",
                      marginRight: "8px",
                    }}
                  >
                    <Card
                      style={{
                        width: 150,
                        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                        backgroundColor: "#88b3f0",
                        cursor: "pointer",
                        height: "230px",
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
                              size={100}
                              src={item.image}
                            />
                          ) : (
                            <Avatar
                              shape="circle"
                              size={100}
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
                              style={{ color: "#000000", fontSize: "25px" }}
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
                                    fontSize: "25px",
                                    color: "#000",
                                  }}
                                />
                              </Col>
                              <Text
                                style={{
                                  marginLeft: "10px",
                                  marginRight: "10px",
                                  fontSize: "25px",
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
                                    fontSize: "25px",
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
                  style={{
                    marginTop: "20px",
                    fontSize: "25px",
                    paddingTop: "0px",
                    height: "50px",
                  }}
                >
                  <FormattedMessage id="next" />
                </Button>
              </Form.Item>
            </Row>
          </Form>
        )}
      </Col>
    </Context.Provider>
  );
};

export default AddNewCustomerPage;
