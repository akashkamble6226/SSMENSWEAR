import { Col, Row, Typography } from "antd";
import { FormattedMessage } from "react-intl";

const { Text } = Typography;

const SinglePersonalDataRow = ({ fieldName, value, collarType = 0 }) => {
  return (
    <Row justify="start" align="middle">
      <Col style={{fontSize:"20px", fontWeight:"bold"}} span={12}>{fieldName}</Col>
      <Col span={8}>
        <div
          style={{
            // paddingLeft: "10px",
            // paddingRight: "10px",
            // width: "60px",
            // textAlign: "center",
            fontSize:"20px"
          }}
        >
          <Text  style={{fontSize:"20px"}}>{value}</Text>
        </div>
      </Col>

      {collarType !== 0 && <Text  style={{fontSize:"20px"}}>{collarType}</Text>}
    </Row>
  );
};

export default SinglePersonalDataRow;
