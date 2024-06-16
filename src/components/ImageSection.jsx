import { Col, Row, Typography, Image } from "antd";
import { FormattedMessage } from "react-intl";
import user from "../assets/user.png";
import cloth from "../assets/cloth.png";
import { useEffect, useState } from "react";

const { Text } = Typography;

const ImageSection = ({ getImages }) => {
  const [selectedClientImage, setSelectedClientImage] = useState(null);
  const [selectedClothImage, setSelectedClothImage] = useState(null);
  // open camera

  const handleClientImageCapture = async (event) => {
    event.preventDefault();
    const fileInput = event.target;
    const file = fileInput.files[0];

    // Display the selected image with lower resolution
    const reader = new FileReader();
    reader.onload = (e) => {
      console.log("e", e);
      setSelectedClientImage(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (selectedClientImage && selectedClothImage) {
      getImages(selectedClientImage, selectedClothImage);
    }
  }, [selectedClientImage, selectedClothImage]);

  const handleClothImageCapture = async (event) => {
    event.preventDefault();
    const fileInput = event.target;
    const file = fileInput.files[0];

    // Display the selected image with lower resolution
    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedClothImage(e.target.result);
    };
    reader.readAsDataURL(file);
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
              backgroundColor: !selectedClientImage && "#A3A3A3",
              borderRadius: "50%",
            }}
            onClick={() => document.getElementById("fileInput").click()}
          >
            <Image
              src={selectedClientImage ? selectedClientImage : user}
              preview={false}
              width={100}
              style={{ display: "flex", justifyContent: "center" }}
            />
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleClientImageCapture}
              style={{ display: "none" }}
            />
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
              backgroundColor: !selectedClothImage && "#A3A3A3",
              borderRadius: "50%",
            }}
            onClick={() => document.getElementById("fileInput2").click()}
          >
            <Image
              src={selectedClothImage ? selectedClothImage : cloth}
              preview={false}
              width={100}
              style={{ display: "flex", justifyContent: "center" }}
            />
            <input
              id="fileInput2"
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleClothImageCapture}
              style={{ display: "none" }}
            />
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
