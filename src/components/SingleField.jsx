import { Col, Row, Form, Typography, Input, Select } from "antd";
import { FormattedMessage } from "react-intl";

const { Text } = Typography;

const SingleField = ({ labelName, formItmeName, prevData }) => {
  let name;
  // if (isMarathiName) {
  //   name = <FormattedMessage id={labelName} />;
  // } else {
  //   name = labelName;
  // }
  // const items = [
  //   {
  //     key: "1",
  //     label: <Text style={{ fontSize: "18px" }}>0</Text>,
  //   },
  //   {
  //     key: "2",
  //     label: <Text style={{ fontSize: "18px" }}>1/4</Text>,
  //   },
  //   {
  //     key: "3",
  //     label: <Text style={{ fontSize: "18px" }}>1/2</Text>,
  //   },
  //   {
  //     key: "4",
  //     label: <Text style={{ fontSize: "18px" }}>3/4</Text>,
  //   },
  // ];
  return (
    <>
      <Row align={"middle"} style={{ marginBottom: "10px" }}>
        <Col span={10}>
          <Text style={{ fontSize: "18px" }}>
            <FormattedMessage id={labelName} />
          </Text>
        </Col>
        <Col span={14}>
          <Form.Item
            labelAlign="left"
            // label=<FormattedMessage id="name" />
            name={formItmeName}
            noStyle={true}
            rules={[
              {
                required: prevData !== "" ? false : true,
                message: <FormattedMessage id="length" />,
              },
            ]}
          >
            <Input
              // type="number"
              size="large"
              placeholder={prevData !== "" ? prevData : "0"}
              style={{
                width: "100%",
                paddingLeft: "4px",
                paddingRight: "2px",
              }}
            />
          </Form.Item>
        </Col>
        {/* <Col span={6}>
          <Select
            placeholder={"0"}
            style={{ width: "100%", marginRight: "10px" }}
            onChange={onClick}
            options={items}
            size="large"
            value={lengthSize}
          />
        </Col> */}
      </Row>
    </>
  );
};

export default SingleField;
