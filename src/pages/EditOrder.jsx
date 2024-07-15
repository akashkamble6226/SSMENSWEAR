import { useLocation, useNavigate } from "react-router-dom";
import DetailsNameRow from "../components/DetailsNameRow";
import useNotification from "antd/es/notification/useNotification";
import { Avatar, Button, Col, Form, Row, Typography } from "antd";
import { FaArrowLeft } from "react-icons/fa";
import { FormattedMessage } from "react-intl";
import React, { useMemo } from "react";
import Loader from "../components/Loader";
import useLoader from "../customeHooks/Loader";
import ImageSection from "../components/ImageSection";
import { useState } from "react";
import NameSection from "../components/NameSection";
import { IsShirtCircleContext } from "../context/ShirtContext";
import ShirtSection from "../components/ShirtSection";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db, storage } from "../firebase";
import { getDate } from "../func/getDate";
import { CustomerNameFormat } from "../func/customerNameFormatting";
import { getShirtType } from "../func/shirtType";
import { convertToBlobObject } from "../func/blob";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import useNotificationHook from "../customeHooks/Notification";

const { Text } = Typography;

const Context = React.createContext({
  name: "Default",
});

const EditOrder = () => {
  const location = useLocation();
  const { openNotificationWithIcon, contextHolder } = useNotificationHook();
  const additionalData = location.state?.additionalData;
  const [selectedClientImage, setSelectedClientImage] = useState(null);
  const [selectedClothImage, setSelectedClothImage] = useState(null);
  const isCircle = additionalData.item.shirtIsCircleOrSquare === "गोल" ? 1 : 2;
  const [isShirtCircle, setIsShirtCircle] = useState(isCircle);
  // console.log("additionalData", additionalData.item);
  const { spinning, setSpinning, percent, setPercent, showLoader } =
    useLoader();

  const navigate = useNavigate();

  const item = additionalData.item;
  const custImg = additionalData.custImg;
  const clothImg = additionalData.clothImg;

  const custName = CustomerNameFormat(item.customerName);
  const custPhone = item.customerPhone;
  const custInvoice = item.customerInvoice;

  const goBack = () => {
    navigate("/tailor/incompletOrders");
  };

  const contextValue = useMemo(
    () => ({
      name: "Ant Design",
    }),
    []
  );

  const getImages = (clientImage, clothImage) => {
    console.log(clientImage);
    setSelectedClientImage(clientImage);
    setSelectedClothImage(clothImage);
  };

  const onFinishOfEditForm = async (values) => {
    console.log("The Updated Values", values);
    //check if at least any of these updated , if yes then update in db
    //else not
    try {
      showLoader();
      // for images
      if (selectedClientImage !== custImg || selectedClothImage !== clothImg) {
        if (selectedClientImage && selectedClothImage) {
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
              `${currentFolderName}/${custName}_${custPhone}_${custInvoice}`
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
        }
      }
       // for other fields
      if (
        values.dueDate !== undefined ||
        values.DandGear !== undefined ||
        values.advance !== undefined ||
        values.bahi !== undefined ||
        values.chest !== undefined ||
        values.collar !== undefined ||
        values.cup !== undefined ||
        values.dueDateRemeber !== undefined ||
        values.height !== undefined ||
        values.hip !== undefined ||
        values.munda !== undefined ||
        values.pocketCount !== undefined ||
        values.shirtType !== undefined ||
        values.shoulder !== undefined ||
        values.stomach !== undefined ||
        values.totalAmount !== undefined ||
        isShirtCircle !== isCircle
      ) {
        // fields
        const height =
          values.height !== undefined ? values.height : item.height;
        const bahi = values.bahi !== undefined ? values.bahi : item.bahi;
        const shoulder =
          values.shoulder !== undefined ? values.shoulder : item.shoulder;
        const chest = values.chest !== undefined ? values.chest : item.chest;
        const stomach =
          values.stomach !== undefined ? values.stomach : item.stomach;
        const hip = values.hip !== undefined ? values.hip : item.hip;
        const collar =
          values.collar !== undefined ? values.collar : item.collar;
        const cup = values.cup !== undefined ? values.cup : item.cup;
        const munda = values.munda !== undefined ? values.munda : item.munda;
        const DandGear =
          values.DandGear !== undefined ? values.DandGear : item.DandGear;
        const pocketCount =
          values.pocketCount !== undefined
            ? values.pocketCount
            : item.pocketCount;
        const dueDate =
          values.dueDate !== undefined ? getDate(values.dueDate) : item.dueDate;
        const dueDateRemeber =
          values.dueDateRemeber !== undefined
            ? getDate(values.dueDateRemeber)
            : item.dueDateRemeber;
        const totalAmt =
          values.totalAmount !== undefined ? values.totalAmount : item.totalAmt;
        const advanceAmt =
          values.advance !== undefined ? values.advance : item.advanceAmt;
        const shirtType =
          values.shirtType !== undefined
            ? getShirtType(values.shirtType)
            : item.shirtType;
        const remainingAmt = totalAmt - advanceAmt;
        const shirtIsCircleOrSquare = isShirtCircle === 1 ? "गोल" : "चौकोन";
        const customerRef = doc(
          db,
          "Customers",
          `${custName}_${custPhone}_${custInvoice}`
        );
        await updateDoc(customerRef, {
          // first page details
          // customerName,
          // customerPhone,
          // customerGender,
          // customerInvoice: `000${totalCustCount}`,
          // customerShirtDetails,
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
          <FormattedMessage id="updateSuccess" />
        );

        //
        goBack();
      } else {
        // console.log("NO NEED TO UPDATE!!!");
        //do not update db un-neccessory
      }
    } catch (e) {
      console.log("Error", e);
      openNotificationWithIcon(
        "error",
        "Error",
        <FormattedMessage id="updateFailed" />
      );
    } finally {
      setSpinning(false);
    }
  };
  return (
    <>
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
            <Text style={{ fontSize: "25px" }}>Edit</Text>
          </Row>
          <Form
            // ref={formRef}
            name="onFinishOfEditForm"
            // className="login-form"
            onFinish={onFinishOfEditForm}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ padding: "10px" }}
          >
            {spinning && <Loader spinning={spinning} percent={percent} />}
            <ImageSection
              getImages={getImages}
              alreadySelectedClientImage={custImg}
              alreadySelectedClothImage={clothImg}
            />
            <NameSection
              deliveryDate={item.dueDate}
              deliveryRemainderDate={item.dueDateRemeber}
              currentTotalAmt={item.totalAmt}
              currentAdvancAmt={item.advanceAmt}
            />

            <IsShirtCircleContext.Provider
              value={{ isShirtCircle, setIsShirtCircle }}
            >
              <ShirtSection
                prevShirtType={item.shirtType}
                prevHeightSize={item.height}
                prevBahiSize={item.bahi}
                prevStomachSize={item.stomach}
                prevChestSize={item.chest}
                prevShoulderSize={item.shoulder}
                preCollarSize={item.collar}
                prevCupSize={item.cup}
                prevMundaSize={item.munda}
                preDandGearSize={item.DandGear}
                prevHipSize={item.hip}
                prevPocketsSize={item.pocketCount}
              />
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
                  Update
                </Button>
              </Form.Item>
            </Row>
          </Form>
        </Col>
      </Context.Provider>
    </>
  );
};

export default EditOrder;
