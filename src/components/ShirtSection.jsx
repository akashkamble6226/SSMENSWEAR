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
} from "antd";
import { FormattedMessage } from "react-intl";

import { useEffect, useState } from "react";

const { Text } = Typography;
const ShirtSection = ({ getDetails }) => {
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
      key: "1",
      label: "0",
    },
    {
      key: "2",
      label: "1",
    },
    {
      key: "3",
      label: "2",
    },
    {
      key: "4",
      label: "3",
    },
    {
      key: "5",
      label: "4",
    },
  ];

  // const onClickOfPocketSize = (item) => {
  //   const currentItem = pockets.filter((i) => i.key === item);
  //   const selectedSize = currentItem[0].label;
  //   setPocketsSize(selectedSize);
  // };

  useEffect(() => {
    getDetails(
      collarType,
      pocketsSize,
      lengthSize,
      chestSize,
      weistSize,
      shoulderSize,
      collarSize,
      lengthOfHandSize,
      handFourSideSize,
      wriestSize,
      hipSize
    );
  },);

  const onClick = (item, type) => {
    if (type !== "pockets") {
      const currentItem = items.filter((i) => i.key === item);
      const selectedSize = currentItem[0].label;
      switch (type) {
        case "length":
          setLengthSize(selectedSize);
          break;
        case "chest":
          setChestSize(selectedSize);
          break;
        case "weist":
          setWeistSize(selectedSize);
          break;
        case "shoulder":
          setShoulderSize(selectedSize);
          break;
        case "collar":
          setCollarSize(selectedSize);
          break;
        case "lengthOfHand":
          setLengthOfHandSize(selectedSize);
          break;
        case "handFourSide":
          setHandFourSideSize(selectedSize);
          break;
        case "wrist":
          setWriestSize(selectedSize);
          break;
        case "hip":
          setHipSize(selectedSize);
          break;
      }
    } else {
      const currentItem = pockets.filter((i) => i.key === item);
      const selectedSize = currentItem[0].label;
      setPocketsSize(selectedSize);
    }
  };

  const onChange = (e) => {
    setCollarType(e.target.value);
  };

  return (
    <>
      <Col>
        <Row justify={"space-between"}>
          <Text style={{ fontSize: "12px" }}>
            <FormattedMessage id="shirt" />
          </Text>
          <Text style={{ fontSize: "12px" }}>{"1"}</Text>
        </Row>

        <Col
          style={{
            padding: "10px",
            marginBottom: "10px",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.7)",
            borderRadius: "10px",
          }}
        >
          {/* length */}
          <Row style={{ marginTop: "10px" }}>
            <Col
              style={{
                padding: "10px",
              }}
            >
              <Row align={"middle"}>
                <Col span={12}>
                  <Text style={{ fontSize: "11px" }}>
                    <FormattedMessage id="length" />
                  </Text>
                </Col>
                <Col span={8}>
                  <Form.Item
                    labelAlign="left"
                    // label=<FormattedMessage id="name" />
                    name="length"
                    noStyle={true}
                    rules={[
                      {
                        required: true,
                        message: <FormattedMessage id="length" />,
                      },
                    ]}
                  >
                    <Input
                      placeholder="0"
                      style={{
                        width: "70%",
                        paddingLeft: "4px",
                        paddingRight: "2px",
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col span={2}>
                  <Dropdown
                    menu={{
                      items,
                      onClick: (item) => onClick(item.key, "length"),
                    }}
                  >
                    <Text
                      style={{
                        fontSize: "12px",
                        borderBottom: "1px solid #A3A3A3",
                      }}
                    >
                      {lengthSize}
                    </Text>
                  </Dropdown>
                </Col>
              </Row>
              {/* chest */}
              <Row align={"middle"} style={{ marginTop: "5px" }}>
                <Col span={12}>
                  <Text style={{ fontSize: "11px" }}>
                    <FormattedMessage id="chest" />
                  </Text>
                </Col>
                <Col span={8}>
                  <Form.Item
                    labelAlign="left"
                    noStyle={true}
                    // label=<FormattedMessage id="name" />
                    name="chest"
                    rules={[
                      {
                        required: true,
                        message: <FormattedMessage id="chest" />,
                      },
                    ]}
                  >
                    <Input
                      placeholder="0"
                      style={{
                        width: "70%",
                        paddingLeft: "4px",
                        paddingRight: "2px",
                      }}
                    />
                  </Form.Item>
                </Col>

                <Col span={2}>
                  <Dropdown
                    menu={{
                      items,
                      onClick: (item) => onClick(item.key, "chest"),
                    }}
                  >
                    <Text
                      style={{
                        fontSize: "12px",
                        borderBottom: "1px solid #A3A3A3",
                      }}
                    >
                      {chestSize}
                    </Text>
                  </Dropdown>
                </Col>
              </Row>

              {/* waist */}
              <Row align={"middle"} style={{ marginTop: "5px" }}>
                <Col span={12}>
                  <Text style={{ fontSize: "11px" }}>
                    <FormattedMessage id="waist" />
                  </Text>
                </Col>
                <Col span={8}>
                  <Form.Item
                    labelAlign="left"
                    noStyle={true}
                    // label=<FormattedMessage id="name" />
                    name="waist"
                    rules={[
                      {
                        required: true,
                        message: <FormattedMessage id="waist" />,
                      },
                    ]}
                  >
                    <Input
                      placeholder="0"
                      style={{
                        width: "70%",
                        paddingLeft: "4px",
                        paddingRight: "2px",
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col span={2}>
                  <Dropdown
                    menu={{
                      items,
                      onClick: (item) => onClick(item.key, "weist"),
                    }}
                  >
                    <Text
                      style={{
                        fontSize: "12px",
                        borderBottom: "1px solid #A3A3A3",
                      }}
                    >
                      {weistSize}
                    </Text>
                  </Dropdown>
                </Col>
              </Row>
              {/* shoulder */}
              <Row align={"middle"} style={{ marginTop: "5px" }}>
                <Col span={12}>
                  <Text style={{ fontSize: "11px" }}>
                    <FormattedMessage id="shoulder" />
                  </Text>
                </Col>
                <Col span={8}>
                  <Form.Item
                    labelAlign="left"
                    noStyle={true}
                    // label=<FormattedMessage id="name" />
                    name="shoulder"
                    rules={[
                      {
                        required: true,
                        message: <FormattedMessage id="shoulder" />,
                      },
                    ]}
                  >
                    <Input
                      placeholder="0"
                      style={{
                        width: "70%",
                        paddingLeft: "4px",
                        paddingRight: "2px",
                      }}
                    />
                  </Form.Item>
                </Col>

                <Col span={2}>
                  <Dropdown
                    menu={{
                      items,
                      onClick: (item) => onClick(item.key, "shoulder"),
                    }}
                  >
                    <Text
                      style={{
                        fontSize: "12px",
                        borderBottom: "1px solid #A3A3A3",
                      }}
                    >
                      {shoulderSize}
                    </Text>
                  </Dropdown>
                </Col>
              </Row>
              {/* collar */}
              <Row align={"middle"} style={{ marginTop: "5px" }}>
                <Col span={12}>
                  <Text style={{ fontSize: "11px" }}>
                    <FormattedMessage id="collar" />
                  </Text>
                </Col>
                <Col span={8}>
                  <Form.Item
                    labelAlign="left"
                    noStyle={true}
                    // label=<FormattedMessage id="name" />
                    name="collar"
                    rules={[
                      {
                        required: true,
                        message: <FormattedMessage id="collar" />,
                      },
                    ]}
                  >
                    <Input
                      placeholder="0"
                      style={{
                        width: "70%",
                        paddingLeft: "4px",
                        paddingRight: "2px",
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col span={2}>
                  <Dropdown
                    menu={{
                      items,
                      onClick: (item) => onClick(item.key, "collar"),
                    }}
                  >
                    <Text
                      style={{
                        fontSize: "12px",
                        borderBottom: "1px solid #A3A3A3",
                      }}
                    >
                      {collarSize}
                    </Text>
                  </Dropdown>
                </Col>
              </Row>
              {/* collar types */}
              <Row align={"middle"} style={{ marginTop: "10px" }}>
                <Col span={12}>
                  <Text style={{ fontSize: "11px" }}>
                    <FormattedMessage id="collarType" />
                  </Text>
                </Col>
                <Col span={8}>
                  {/* <Form.Item
                    labelAlign="left"
                    noStyle={true}
                    // label=<FormattedMessage id="name" />
                    name="collarTypes"
                    rules={[
                      {
                        required: true,
                        // message: <FormattedMessage id="collar" />,
                      },
                    ]}
                  > */}
                  <Radio.Group
                    size="small"
                    onChange={onChange}
                    value={collarType}
                    // style={{ paddingTop: "10px" }}
                  >
                    <Radio value={1}>
                      <Text style={{ fontSize: "11px" }}>
                        <FormattedMessage id="circle" />
                      </Text>
                    </Radio>
                    <Radio value={2}>
                      <Text style={{ fontSize: "11px" }}>
                        <FormattedMessage id="square" />
                      </Text>
                    </Radio>
                  </Radio.Group>
                  {/* </Form.Item> */}
                </Col>
              </Row>
              {/* length Of hand */}
              <Row align={"middle"} style={{ marginTop: "5px" }}>
                <Col span={12}>
                  <Text style={{ fontSize: "11px" }}>
                    <FormattedMessage id="lengthOfHand" />
                  </Text>
                </Col>
                <Col span={8}>
                  <Form.Item
                    labelAlign="left"
                    noStyle={true}
                    // label=<FormattedMessage id="name" />
                    name="lengthOfHand"
                    rules={[
                      {
                        required: true,
                        message: <FormattedMessage id="lengthOfHand" />,
                      },
                    ]}
                  >
                    <Input
                      placeholder="0"
                      style={{
                        width: "70%",
                        paddingLeft: "4px",
                        paddingRight: "2px",
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col span={2}>
                  <Dropdown
                    menu={{
                      items,
                      onClick: (item) => onClick(item.key, "lengthOfHand"),
                    }}
                  >
                    <Text
                      style={{
                        fontSize: "12px",
                        borderBottom: "1px solid #A3A3A3",
                      }}
                    >
                      {lengthOfHandSize}
                    </Text>
                  </Dropdown>
                </Col>
              </Row>
              {/* handFourSide */}
              <Row align={"middle"} style={{ marginTop: "5px" }}>
                <Col span={12}>
                  <Text style={{ fontSize: "11px" }}>
                    <FormattedMessage id="handFourSide" />
                  </Text>
                </Col>
                <Col span={8}>
                  <Form.Item
                    labelAlign="left"
                    noStyle={true}
                    // label=<FormattedMessage id="name" />
                    name="handFourSide"
                    rules={[
                      {
                        required: true,
                        message: <FormattedMessage id="handFourSide" />,
                      },
                    ]}
                  >
                    <Input
                      placeholder="0"
                      style={{
                        width: "70%",
                        paddingLeft: "4px",
                        paddingRight: "2px",
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col span={2}>
                  <Dropdown
                    menu={{
                      items,
                      onClick: (item) => onClick(item.key, "handFourSide"),
                    }}
                  >
                    <Text
                      style={{
                        fontSize: "12px",
                        borderBottom: "1px solid #A3A3A3",
                      }}
                    >
                      {handFourSideSize}
                    </Text>
                  </Dropdown>
                </Col>
              </Row>
              {/* wriest */}
              <Row align={"middle"} style={{ marginTop: "5px" }}>
                <Col span={12}>
                  <Text style={{ fontSize: "11px" }}>
                    <FormattedMessage id="wrist" />
                  </Text>
                </Col>
                <Col span={8}>
                  <Form.Item
                    labelAlign="left"
                    noStyle={true}
                    // label=<FormattedMessage id="name" />
                    name="wrist"
                    rules={[
                      {
                        required: true,
                        message: <FormattedMessage id="wrist" />,
                      },
                    ]}
                  >
                    <Input
                      placeholder="0"
                      style={{
                        width: "70%",
                        paddingLeft: "4px",
                        paddingRight: "2px",
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col span={2}>
                  <Dropdown
                    menu={{
                      items,
                      onClick: (item) => onClick(item.key, "wrist"),
                    }}
                  >
                    <Text
                      style={{
                        fontSize: "12px",
                        borderBottom: "1px solid #A3A3A3",
                      }}
                    >
                      {wriestSize}
                    </Text>
                  </Dropdown>
                </Col>
              </Row>
              {/* hip */}
              <Row align={"middle"} style={{ marginTop: "5px" }}>
                <Col span={12}>
                  <Text style={{ fontSize: "11px" }}>
                    <FormattedMessage id="hip" />
                  </Text>
                </Col>
                <Col span={8}>
                  <Form.Item
                    labelAlign="left"
                    // label=<FormattedMessage id="name" />
                    noStyle={true}
                    name="hip"
                    rules={[
                      {
                        required: true,
                        message: <FormattedMessage id="hip" />,
                      },
                    ]}
                  >
                    <Input
                      placeholder="0"
                      style={{
                        width: "70%",
                        paddingLeft: "4px",
                        paddingRight: "2px",
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col span={2}>
                  <Dropdown
                    menu={{
                      items,
                      onClick: (item) => onClick(item.key, "hip"),
                    }}
                  >
                    <Text
                      style={{
                        fontSize: "12px",
                        borderBottom: "1px solid #A3A3A3",
                      }}
                    >
                      {hipSize}
                    </Text>
                  </Dropdown>
                </Col>
              </Row>
              {/* pockets */}
              <Row align={"middle"} style={{ marginTop: "5px" }}>
                <Col span={12}>
                  <Text style={{ fontSize: "11px" }}>
                    <FormattedMessage id="pockets" />
                  </Text>
                </Col>
                <Col span={2}>
                  <Dropdown
                    menu={{
                      items: pockets,
                      onClick: (item) => onClick(item.key, "pockets"),
                    }}
                  >
                    <Text
                      style={{
                        fontSize: "12px",
                        borderBottom: "1px solid #A3A3A3",
                      }}
                    >
                      {pocketsSize}
                    </Text>
                  </Dropdown>
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
