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
} from "antd";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { FormattedMessage } from "react-intl";
import shirt from "../assets/shirt.png";
import pant from "../assets/pant.png";
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
import { db, storage } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { getCustomersCount } from "../func/customerCount";
import { totalCustomerCountStatus } from "../store/totalCustomerCountSlice";
import { CustomerNameFormat } from "../func/customerNameFormatting";
import Loader from "../components/Loader";
import useNotification from "../customeHooks/Notification";
import useLoader from "../customeHooks/Loader";
import { isValidPhoneNumber } from "../func/phoneNumberValid";
import useItemCount from "../customeHooks/ItemCount";
import { getDate } from "../func/getDate";
import useAllIncompletOrders from "../customeHooks/AllIncompleteOrders";
import AllIncompleteOrders from "../components/AllIncompletOrders";
import useAllCustomerImages from "../customeHooks/AllCustomerImages";
const { Text } = Typography;

const Context = React.createContext({
  name: "Default",
});

const IncompleteOrders = () => {
  const [isAddingCustomer, setIsAddingCustomer] = useState(false);
  const [value, setValue] = useState(1);
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [isNewCustomerDetails, setIsNewCustomerDetails] = useState(false);
  const { openNotificationWithIcon, contextHolder } = useNotification();
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

  

  // console.log(
  //   "customerImageUrls",
  //   customerImageUrls,
  //   "clothImageUrls",
  //   clothImageUrls
  // );

  const [dressTypeError, setDressTypeError] = useState(false);

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

  const showModal = () => {
    setIsAddingCustomer(true);
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

  const getImages = (clientImage, clothImage) => {
    console.log(clientImage);
    setSelectedClientImage(clientImage);
    setSelectedClothImage(clothImage);
  };

  const convertToBlobObject = (image) => {
    // Convert base64 string to Blob object
    const byteCharacters = atob(image.split(",")[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "image/jpeg" });
    return blob;
  };

  const onFinish2Form = async (values) => {
    const formatedCustomerName = CustomerNameFormat(customerName);

    //  dates
    const dueDate = getDate(values.dueDate);
    const dueDateRemeber = getDate(values.dueDateRemeber);

    // amount
    const totalAmt = values.totalAmount;
    const advanceAmt = values.advance;
    const remainingAmt = totalAmt - advanceAmt;

    // if Shirt
    const length = {
      length: values.length,
      lengthSize: lengthSize,
    };

    const chest = {
      chest: values.chest,
      chestSize: chestSize,
    };

    const weist = {
      weist: values.waist,
      weistSize: weistSize,
    };

    const shoulder = {
      shoulder: values.shoulder,
      shoulderSize: shoulderSize,
    };

    const collar = {
      collar: values.collar,
      collarSize: collarSize,
    };

    const lengthOfHand = {
      lengthOfHand: values.lengthOfHand,
      lengthOfHandSize: lengthOfHandSize,
    };

    const handFourSide = {
      handFourSide: values.handFourSide,
      handFourSideSize: handFourSideSize,
    };

    const wrist = {
      wrist: values.wrist,
      wriestSize: wriestSize,
    };

    const hip = {
      hip: values.hip,
      hipSize: hipSize,
    };

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
          const blob = convertToBlobObject(currentImage);
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
          length,
          chest,
          weist,
          shoulder,
          collar,
          lengthOfHand,
          handFourSide,
          wrist,
          hip,
          collarType,
          pocketsSize,
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
      <>
        {!loadingCustomerImages &&
        !loadingClothImages &&
        !loadingData &&
        allInCompletOrdersData.length === 0 ? (
          <FormattedMessage id="noRecords" />
        ) : (
          <Col span={24} style={{ padding: "10px" }}>
            {loadingCustomerImages && loadingClothImages && loadingData ? (
              <Spin />
            ) : (
              <AllIncompleteOrders
                docs={allInCompletOrdersData}
                customerImageUrls={customerImageUrls}
                clothImageUrls={clothImageUrls}
              />
            )}
          </Col>
        )}
        <FloatButton
          onClick={showModal}
          shape="circle"
          type="primary"
          tooltip={<FormattedMessage id="addUser" />}
          style={{
            right: 24,
            backgroundColor: "#E17B2B",
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
                  <Text
                    style={{ fontSize: "11px" }}
                  >{`${customerName} - 000${totalCustCount}`}</Text>
                </Row>

                <CloseOutlined onClick={onCancle} />
              </Row>
            ) : (
              <Row justify={"space-between"}>
                <FormattedMessage id="newCustomer" />
                <CloseOutlined onClick={onCancle} />
              </Row>
            )
          }
          open={isAddingCustomer}
          // onOk={handleOk}
          closable={false}
          footer={null}
          width={350}
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
                  {spinning && <Loader spinning={spinning} percent={percent} />}
                  <ImageSection getImages={getImages} />
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
                  wrapperCol={{ span: 24 }}
                >
                  <Form.Item
                    labelAlign="left"
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
                    name="phone"
                    rules={[
                      {
                        required: true,
                        message: <FormattedMessage id="enterPhone" />,
                      },
                    ]}
                  >
                    <Input placeholder="फोन" maxLength={10} type="text" />
                  </Form.Item>

                  <Radio.Group
                    onChange={onChange}
                    value={value}
                    style={{ paddingTop: "5px", paddingBottom: "10px" }}
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
    </Context.Provider>
  );
};
export default IncompleteOrders;
