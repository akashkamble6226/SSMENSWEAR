import { Col, Form, Radio, Row, Select, Typography } from "antd";
import { useContext } from "react";
import { FormattedMessage } from "react-intl";
import { IsShirtCircleContext } from "../context/ShirtContext";
const { Text } = Typography;
const items = [
  {
    value: "1",
    label: (
      <Text style={{ fontSize: "20px" }}>
        <FormattedMessage id="shirtTypeMenila" />
      </Text>
    ),
  },

  {
    value: "2",
    label: <Text style={{ fontSize: "20px" }}>Apple Cut</Text>,
  },

  {
    value: "3",
    label: <Text style={{ fontSize: "20px" }}>Open Shirt</Text>,
  },

  {
    value: "4",
    label: <Text style={{ fontSize: "20px" }}>3 Button Shirt</Text>,
  },
];

const RadioField = ({ prevShirtType = "" }) => {
  const { isShirtCircle, setIsShirtCircle } = useContext(IsShirtCircleContext);
  const onChange = (val) => {
    setIsShirtCircle(val.target.value);
  };
  return (
    <>
      <Row align={"middle"} style={{ marginTop: "10px" }}>
        <Form.Item
          labelAlign="left"
          name={"shirtType"}
          noStyle={true}
          rules={[
            {
              required:  prevShirtType !== "" ? false : true,
              message: <FormattedMessage id="length" />,
            },
          ]}
        >
          <Select
            placeholder={
              prevShirtType !== "" ? (
                prevShirtType
              ) : (
                <FormattedMessage id="chooseOne" />
              )
            }
            style={{ width: "45%", marginRight: "10px" }}
            // onChange={onChange}

            options={items}
            size="middle"
          />
        </Form.Item>

        <Col>
          <Radio.Group
            size="large"
            onChange={onChange}
            value={isShirtCircle}
            // style={{ paddingTop: "10pxZ" }}
          >
            <Radio value={1}>
              <Text style={{ fontSize: "18px" }}>
                <FormattedMessage id="circle" />
              </Text>
            </Radio>
            <Radio value={2}>
              <Text style={{ fontSize: "18px" }}>
                <FormattedMessage id="square" />
              </Text>
            </Radio>
          </Radio.Group>
          {/* </Form.Item> */}
        </Col>
      </Row>
    </>
  );
};
export default RadioField;
