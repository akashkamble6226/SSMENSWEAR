import { Col, Row, Typography, Image } from "antd";
import { FormattedMessage } from "react-intl";
import user from "../assets/user.png";
import cloth from "../assets/cloth.png";
import { useState } from "react";
import { useSelector } from "react-redux";

const { Text } = Typography;

const ImageSection = () => {
  const [stream, setStream] = useState(null);
  // open camera
 

  const openCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      setStream(mediaStream);
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };
  return (
    
    <>
      <Col
        style={{
          padding: "10px",
          marginBottom: "10px",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.7)",
          borderRadius: "10px",
          height: "150px",
        }}
      >
     
        <Row justify="space-around" align={"middle"}>
          <Col
            style={{
              width: "100px",
              height: "100px",
              backgroundColor: "#A3A3A3",
              borderRadius: "50%",
            }}
            onClick={openCamera}
          >
            <Image src={user} preview={false} />
            <Text
              style={{
                display: "flex",
                justifyContent: "center",
                fontSize: "12px",
              }}
            >
              <FormattedMessage id="photo" />
            </Text>
          </Col>
          <Col
            style={{
              width: "100px",
              height: "100px",
              backgroundColor: "#A3A3A3",
              borderRadius: "50%",
            }}
            onClick={openCamera}
          >
            <Image src={cloth} preview={false} />
            <Text
              style={{
                display: "flex",
                justifyContent: "center",
                fontSize: "12px",
              }}
            >
              <FormattedMessage id="cloth" />
            </Text>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default ImageSection;
