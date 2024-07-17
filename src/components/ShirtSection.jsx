import {
  Col,
  Row,
  Typography,
  Image,
  Input,
  Form,
  DatePicker,
  Radio,
  Dropdown,
  Button,
  message,
  Select,
} from "antd";
import { FormattedMessage } from "react-intl";

import { useContext, useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import RadioField from "./radioField";
import SingleField from "./SingleField";
import { IsShirtCircleContext } from "../context/ShirtContext";

const { Text } = Typography;
const ShirtSection = ({
  prevShirtType="",
  prevHeightSize = "",
  prevBahiSize = "",
  prevStomachSize = "",
  prevChestSize = "",
  prevShoulderSize = "",
  preCollarSize = "",
  prevCupSize = "",
  prevMundaSize = "",
  preDandGearSize = "",
  prevHipSize = "",
  prevPocketsSize = "",
}) => {
  const [heightSize, setHeightSize] = useState(prevHeightSize);
  const [bahiSize, setBahiSize] = useState(prevBahiSize);
  const [stomachSize, setStomachSize] = useState(prevStomachSize);
  const [chestSize, setChestSize] = useState(prevChestSize);
  const [shoulderSize, setShoulderSize] = useState(prevShoulderSize);
  const [collarSize, setCollarSize] = useState(preCollarSize);
  const [cupSize, setCupSize] = useState(prevCupSize);
  const [mundaSize, setMundaSize] = useState(prevMundaSize);
  const [dandGearSize, setDandGearSize] = useState(preDandGearSize);
  const [hipSize, setHipSize] = useState(prevHipSize);
  const [pocketsSize, setPocketsSize] = useState(prevPocketsSize);

  const items = [
    {
      key: "1",
      label: "0",
    },
    {
      key: "2",
      label: "1/4",
    },
    {
      key: "3",
      label: "1/2",
    },
    {
      key: "4",
      label: "3/4",
    },
  ];

  const pockets = [
    {
      value: "1",
      label: <Text style={{ fontSize: "18px" }}>0</Text>,
    },
    {
      value: "2",
      label: <Text style={{ fontSize: "18px" }}>1</Text>,
    },
    {
      value: "3",
      label: <Text style={{ fontSize: "18px" }}>2</Text>,
    },
    {
      value: "4",
      label: <Text style={{ fontSize: "18px" }}>3</Text>,
    },
    {
      value: "5",
      label: <Text style={{ fontSize: "18px" }}>4</Text>,
    },
  ];

  const onClick = (item, type) => {
    console.log("Item", item, type);
    console.log("pocket size", pocketsSize);

    const currentItem = pockets.filter((i) => i.key === item);
    const selectedSize = currentItem[0].label;
    setPocketsSize(selectedSize);
  };

  return (
    <>
      <Col>
        <Row justify={"space-between"}>
          <Text style={{ fontSize: "20px" }}>
            <FormattedMessage id="shirt" />
          </Text>
          <Text style={{ fontSize: "20px" }}>1</Text>
        </Row>

        <Col
          style={{
            padding: "10px",
            marginBottom: "10px",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.7)",
            borderRadius: "10px",
          }}
        >
          {/* NEW FIELD */}
          <RadioField prevShirtType={prevShirtType} />

          <Row style={{ marginTop: "10px" }}>
            <Col
              span={24}
              style={{
                padding: "10px",
              }}
            >
              <SingleField
                labelName={"height"}
                formItmeName={"height"}
                onClick={onClick}
                lengthSize={heightSize}
                prevData={prevHeightSize}
              />
              <SingleField
                labelName={"shoulder"}
                formItmeName={"shoulder"}
                onClick={onClick}
                lengthSize={shoulderSize}
                prevData={prevShoulderSize}
              />

              <SingleField
                labelName={"bahi"}
                formItmeName={"bahi"}
                onClick={onClick}
                lengthSize={bahiSize}
                prevData={prevBahiSize}
              />

              <SingleField
                labelName={"chest"}
                formItmeName={"chest"}
                onClick={onClick}
                lengthSize={chestSize}
                prevData={prevChestSize}
              />

              <SingleField
                labelName={"stomach"}
                formItmeName={"stomach"}
                onClick={onClick}
                lengthSize={stomachSize}
                prevData={prevStomachSize}
              />

              <SingleField
                labelName={"hip"}
                formItmeName={"hip"}
                onClick={onClick}
                lengthSize={hipSize}
                prevData={prevHipSize}
              />

              <SingleField
                labelName={"collar"}
                formItmeName={"collar"}
                onClick={onClick}
                lengthSize={collarSize}
                prevData={preCollarSize}
              />

              <SingleField
                labelName={"cup"}
                formItmeName={"cup"}
                onClick={onClick}
                lengthSize={cupSize}
                prevData={prevCupSize}
              />

              <SingleField
                labelName={"munda"}
                formItmeName={"munda"}
                onClick={onClick}
                lengthSize={mundaSize}
                prevData={prevMundaSize}
              />

              <SingleField
                labelName={"DandGear"}
                formItmeName={"DandGear"}
                onClick={onClick}
                lengthSize={dandGearSize}
                prevData={preDandGearSize}
              />

              {/* pockets */}
              <Row align={"middle"} style={{ marginTop: "5px" }}>
                <Col span={10}>
                  <Text style={{ fontSize: "18px" }}>
                    <FormattedMessage id="pockets" />
                  </Text>
                </Col>
                <Col span={8}>
                  <Form.Item
                    labelAlign="left"
                    name={"pocketCount"}
                    noStyle={true}
                    rules={[
                      {
                        required:prevPocketsSize !== "" ? false : true,
                        message: <FormattedMessage id="length" />,
                      },
                    ]}
                  >
                    <Select
                      placeholder={
                        prevPocketsSize !== "" ? prevPocketsSize : "0"
                      }
                      style={{ width: "100%", marginRight: "10px" }}
                      options={pockets}
                      size="large"
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Col>
    </>
  );
};

export default ShirtSection;
