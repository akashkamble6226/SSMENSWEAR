import { Col, Image, Row } from "antd";

const DetailsImageSection = ({ custImg, clothImg }) => {
  return (
    <Col style={{ position: "relative", width: "100%", height: "200px" }}>
      <Row style={{ width: "100%" }} justify={"center"}>
        <Image
          preview={false}
          src={clothImg}
          style={{ height: "200px", width:"100%", justifyContent: "center", }}
        />
      </Row>
      <Row
        style={{
          position: "absolute",
          bottom: "0px",
          left: "50%",
          transform: "translate(-50%, 50%)",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Image
          preview={false}
          src={custImg}
          width={110}
          height={110}
          style={{
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
      </Row>
    </Col>
  );
};

export default DetailsImageSection;
