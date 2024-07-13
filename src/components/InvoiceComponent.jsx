import { Modal, Typography, Row, Col, Image, Button, Input, Avatar } from "antd";
import Loader from "./Loader";
import { useContext, useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import useLoader from "../customeHooks/Loader";
import { useToImage } from "@hcorta/react-to-image";
import { FaArrowLeft, FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { InvoiceContext } from "../context/InvoiceContext";
import { getDownloadURL, ref as fRef, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";
import { convertToBlobObject, convertToBlobObjectPng } from "../func/blob";
import html2canvas from "html2canvas";
import { useNavigate } from "react-router-dom";

const { Text, Paragraph } = Typography;

/*

*/
const InvoiceComponent = ({ item, custImg, clothImg }) => {
  const name = item.customerName;
  const customerInvoice = item.customerInvoice;
  const { isInvoice, setIsInvoice } = useContext(InvoiceContext);
  const [urltoShare, setUrlToShare] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const { spinning, setSpinning, percent, setPercent, showLoader } =
    useLoader();
  const [currentPhone, setCurrentPhone] = useState(item.customerPhone)

  const nameOfTheInvoice = `${name}_${item.customerPhone}_${customerInvoice}`;

  const navigate = useNavigate();

  useEffect(() => {
    saveImageLocally();
  }, []);

  const saveImageInFirebase = async (blob) => {
    try {
      if (storage) {
        const b = convertToBlobObjectPng(blob);
        const storageRef = fRef(storage, `Invoices/${nameOfTheInvoice}`);
        // Upload blob to Firebase Storage
        const snapshot = await uploadBytes(storageRef, b);
        // Get download URL
        const downloadURL = await getDownloadURL(snapshot.ref);
        console.log("File available at", downloadURL);
        setUrlToShare(downloadURL);
        // return ;
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  const { ref, getPng, getJpeg, isLoading, getBlob, getCanvas, getPixelData } =
    useToImage(
      {
        backgroundColor: "#FFFFFF",
        quality: 100,
      },
      function (data) {
        // downloadImage(data.data, "data");
        checkIfInvoicePresent(nameOfTheInvoice, data.data);
        // setOpenModal(true);
        // open the modal
      }
    );

  const downloadImage = (data, filename) => {
    const link = document.createElement("a");
    link.href = data;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const saveImageLocally = async () => {
    try {
      //   await getPng();
      await getPng();
    } catch (e) {
    } finally {
      setSpinning(false);
    }
  };

  const checkIfInvoicePresent = async (name, data) => {
    try {
      const url = await getDownloadURL(fRef(storage, `Invoices/${name}`));
      setUrlToShare(url);
    } catch (e) {
      saveImageInFirebase(data);
    }
  };


  const sendTheMessage = () => {
    // Construct the SMS URL
    const smsUrl = `sms:${currentPhone}?&body=${encodeURIComponent(
      urltoShare
    )}`;
    // Open the SMS app with the pre-filled information
    window.location.href = smsUrl;
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(urltoShare);
      const blob = await response.blob();

      // Create a URL for the blob
      const blobUrl = URL.createObjectURL(blob);

      // Create a hidden anchor element and trigger download
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = blobUrl;
      a.download = `${nameOfTheInvoice}.png`; // Set the file name here
      document.body.appendChild(a);
      a.click();

      // Clean up
      URL.revokeObjectURL(blobUrl);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  const onPhoneNumberChange = (v) => {
    // console.log("val", v.target.value)
    setCurrentPhone(v.target.value)
  }

  const goBack = () => {
    navigate("/tailor/incompletOrders");
  };

  return (
    <>
      {isLoading && <Loader spinning={true} percent={percent} />}
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
      <Col
        id={"print"}
        ref={ref}
        style={{ backgroundColor: "#FFFFFF", margin: "10px" }}
      >
        <Row justify={"center"} align={"middle"}>
          <Text
            style={{
              fontSize: "26px",
              fontWeight: "bold",
              color: "#1677ff",
              textAlign: "center",
            }}
          >
            <FormattedMessage id="firmName" />
          </Text>
        </Row>
        <hr />
        {/* images */}
        <Row justify={"space-around "}>
          <Image
            preview={false}
            src={clothImg}
            style={{
              width: "150px",
              height: "150px",
              borderRadius: "50%",
            }}
          />
          <Image
            preview={false}
            src={custImg}
            style={{
              width: "150px",
              height: "150px",
              borderRadius: "50%",
            }}
          />
        </Row>
        {/* customer details */}
        <Row
          style={{
            border: "1px solid #A3A3A3",
            padding: "10px",
            marginTop: "10px",
          }}
          align={"middle"}
        >
          <Col>
            <Row>
              <Text style={{ paddingRight: "10px", fontSize: "20px" }}>
                <FormattedMessage id="name" />
              </Text>
              <Text style={{ fontWeight: "bold", fontSize: "20px" }}>
                {item.customerName}
              </Text>
            </Row>

            <Row>
              <Text style={{ paddingRight: "10px", fontSize: "20px" }}>
                <FormattedMessage id="phone" />
              </Text>
              <Text style={{ fontWeight: "bold", fontSize: "20px" }}>
                {item.customerPhone}
              </Text>
            </Row>
            <Row>
              <Text style={{ paddingRight: "10px", fontSize: "20px" }}>
                <FormattedMessage id="invoice" />
              </Text>
              <Text
                style={{ fontWeight: "bold", fontSize: "20px" }}
              >{`#${item.customerInvoice}`}</Text>
            </Row>

            <Row>
              <Text style={{ paddingRight: "10px", fontSize: "20px" }}>
                <FormattedMessage id="dueDate" />
              </Text>
              <Text style={{ fontWeight: "bold", fontSize: "20px" }}>
                {item.dueDate}
              </Text>
            </Row>

            <Row>
              <Text style={{ paddingRight: "10px", fontSize: "20px" }}>
                <FormattedMessage id="remaining" />
              </Text>
              <Text style={{ fontWeight: "bold", fontSize: "20px" }}>
                {item.remainingAmt}
              </Text>
            </Row>
          </Col>
        </Row>
        {/* cloth details */}
        <Row style={{ marginTop: "10px" }}>
          <Col span={24}>
            <Row
              style={{
                backgroundColor: "#1677ff",
                padding: "15px",
                color: "white",
              }}
              justify={"space-between"}
            >
              <Col span={6}>
                <Text style={{ fontSize: "20px", color: "white" }}>
                  <FormattedMessage id="clothType" />
                </Text>
              </Col>
              <Col span={6}>
                <Text style={{ fontSize: "20px", color: "white" }}>
                  <FormattedMessage id="unitPrice" />
                </Text>
              </Col>
              <Col span={6}>
                <Text style={{ fontSize: "20px", color: "white" }}>
                  <FormattedMessage id="qty" />
                </Text>
              </Col>
              <Col span={6}>
                <Text style={{ fontSize: "20px", color: "white" }}>
                  <FormattedMessage id="totalPrice" />
                </Text>
              </Col>
            </Row>

            {/* shirt */}
            <Row justify="space-around" style={{ padding: "15px" }}>
              <Col span={6}>
                <Text style={{ fontSize: "20px" }}>
                  <FormattedMessage id="shirt" />
                </Text>
              </Col>
              <Col span={6}>
                <Text style={{ fontSize: "20px" }}>{item.totalAmt}</Text>
              </Col>
              <Col span={6}>
                <Text style={{ fontSize: "20px" }}>1</Text>
              </Col>
              <Col span={6}>
                <Text style={{ fontSize: "20px" }}>{item.totalAmt}</Text>
              </Col>
            </Row>
          </Col>
        </Row>
        <hr />
        {/* amount details */}

        <Row style={{ marginLeft: "10px" }}>
          <Col>
            <Text style={{ fontSize: "20px" }}>
              <FormattedMessage id="totalAmount" />
            </Text>

            <Text style={{ paddingLeft: "10px", fontSize: "20px" }}>
              {item.totalAmt}
            </Text>
          </Col>

          <Col span={24}>
            <Text style={{ fontSize: "20px" }}>Advance</Text>
            <Text style={{ paddingLeft: "10px", fontSize: "20px" }}>
              {item.advanceAmt}
            </Text>
          </Col>
          <Col span={24}>
            <Text style={{ fontSize: "20px" }}>
              <FormattedMessage id="remaining" />
            </Text>
            <Text
              style={{
                paddingLeft: "10px",
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              {item.remainingAmt}
            </Text>
          </Col>
        </Row>
        {/* other details */}
        <Row style={{ marginTop: "10px", marginLeft: "10px" }}>
          <Col span={24}>
            <Text style={{ fontSize: "20px" }}>
              <FormattedMessage id="dueDateRemeber" />
            </Text>

            <Text
              style={{
                paddingLeft: "10px",
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              {item.dueDateRemeber}
            </Text>
          </Col>
          <Col span={24}>
            <Text style={{ fontSize: "20px" }}>
              <FormattedMessage id="dueDate" />
            </Text>

            <Text
              style={{
                paddingLeft: "10px",
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              {item.dueDate}
            </Text>
          </Col>
        </Row>

        {/* shop details */}
        <hr />
        <Row justify={"space-between"}>
          <Col span={8} style={{ textAlign: "center" }}>
            <FaLocationDot style={{ fontSize: "30px", color: "#1677ff" }} />
            <Paragraph style={{ fontSize: "15px" }}>
              <FormattedMessage id="shopAddress" />
            </Paragraph>
          </Col>

          <Col span={8} style={{ textAlign: "center" }}>
            <MdEmail style={{ fontSize: "30px", color: "#1677ff" }} />
            <Paragraph style={{ fontSize: "15px" }}>
              <FormattedMessage id="shopEmail" />
            </Paragraph>
          </Col>

          <Col span={8} style={{ textAlign: "center" }}>
            <FaPhoneAlt style={{ fontSize: "30px", color: "#1677ff" }} />
            <Paragraph style={{ fontSize: "15px" }}>
              <FormattedMessage id="shopPhone" />
            </Paragraph>
          </Col>
        </Row>
      </Col>
      <Row align={"middle"} justify={"center"}>
        <Col span={9} style={{ marginRight: "10px" }}>
          <Input
            type="number"
            maxLength={10}
            size="large"
            style={{ fontSize: "20px" }}
            placeholder={item.customerPhone}
            onChange={onPhoneNumberChange}
          />
        </Col>

        <Button
          style={{ marginRight: "10px" }}
          size="large"
          type="primary"
          onClick={sendTheMessage}
        >
          Share
        </Button>

        <Button
          size="large"
          style={{ marginRight: "5px" }}
          onClick={handleDownload}
        >
          Download
        </Button>
      </Row>
      ,
    </>
  );
};

export default InvoiceComponent;
