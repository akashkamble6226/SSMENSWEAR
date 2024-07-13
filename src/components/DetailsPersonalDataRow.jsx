import { Card, Col, Radio, Row, Typography } from "antd";
import { FormattedMessage } from "react-intl";
import SinglePersonalDataRow from "./SinglePersonalDataRow";

const { Text } = Typography;

const DetailsPersonalDataRow = ({ item }) => {
  const collarType = item.shirtIsCircleOrSquare;
  return (
    <>
      <Card
        style={{
          position: "relative",
          marginTop: "50px",
          paddingLeft: "10px",
          paddingRight: "10px",
        }}
      >
        <Row justify={"space-between"}>
          <Text style={{ fontSize: "20px", fontWeight:"bold" }}>
            <FormattedMessage id="phone" />
          </Text>
          <Text style={{ fontSize: "20px" }}>{item.customerPhone}</Text>
        </Row>

        <Row justify={"space-between"}>
          <Text style={{ fontSize: "20px", fontWeight:"bold" }}>
            <FormattedMessage id="dueDate" />
          </Text>
          <Text style={{ fontSize: "20px" }}>{item.dueDate}</Text>
        </Row>

        <Row justify={"space-between"}>
          <Text style={{ fontSize: "20px", fontWeight:"bold"}}>
            <FormattedMessage id="dueDateRemeber" />
          </Text>
          <Text style={{ fontSize: "20px" }}>{item.dueDateRemeber}</Text>
        </Row>
      </Card>
      <Card
        style={{
          position: "relative",
          paddingLeft: "10px",
          paddingRight: "10px",
          border: "1px solid #1677ff",
          margin: "10px",
        }}
      >
        <Row
          justify={"center"}
          style={{ paddingBottom: "15px", fontSize: "20px", fontWeight:"bold" }}
        >
          <FormattedMessage id="paymentStatus" />
        </Row>
        <Row justify={"space-between"}>
          <Col>
            <Row>
              <Text style={{ fontSize: "20px" }}>
                <FormattedMessage id="totalAmount" />
              </Text>
            </Row>
            <Row justify={"center"} style={{ fontSize: "20px" }}>
              {item.totalAmt}
            </Row>
          </Col>

          <Col>
            <Row>
              {/* <FormattedMessage id="advance" /> */}
              <Text style={{ fontSize: "20px" }}>Advance</Text>
            </Row>
            <Row justify={"center"} style={{ fontSize: "20px" }}>
              {item.advanceAmt}
            </Row>
          </Col>

          <Col>
            <Row style={{ fontSize: "20px" }}>
              <FormattedMessage id="remaining" />
            </Row>
            <Row justify={"center"} style={{ fontSize: "20px" }}>
              {item.remainingAmt}
            </Row>
          </Col>
        </Row>
      </Card>

      <Row
        justify={"space-between"}
        style={{
          paddingLeft: "10px",
          paddingRight: "10px",
          paddingTop: "10px",
          fontSize: "23px",
          fontWeight: "bold",
        }}
      >
        <FormattedMessage id="shirt" />
        <Text style={{ fontSize: "23px" }}>1</Text>
      </Row>

      <Card
        style={{
          position: "relative",
          paddingLeft: "10px",
          paddingRight: "10px",
        }}
      >
        <SinglePersonalDataRow
          fieldName={<FormattedMessage id="choseShirtType" />}
          value={item.shirtType}
          collarType={collarType}
        />

        <SinglePersonalDataRow
          fieldName={<FormattedMessage id="height" />}
          value={item.height}
        />

        <SinglePersonalDataRow
          fieldName={<FormattedMessage id="shoulder" />}
          value={item.shoulder}
        />

        <SinglePersonalDataRow
          fieldName={<FormattedMessage id="bahi" />}
          value={item.bahi}
        />

        <SinglePersonalDataRow
          fieldName={<FormattedMessage id="chest" />}
          value={item.chest}
        />

        <SinglePersonalDataRow
          fieldName={<FormattedMessage id="stomach" />}
          value={item.stomach}
        />

        <SinglePersonalDataRow
          fieldName={<FormattedMessage id="hip" />}
          value={item.hip}
        />

        <SinglePersonalDataRow
          fieldName={<FormattedMessage id="collar" />}
          value={item.collar}
        />
        <SinglePersonalDataRow
          fieldName={<FormattedMessage id="cup" />}
          value={item.cup}
        />
        <SinglePersonalDataRow
          fieldName={<FormattedMessage id="munda" />}
          value={item.munda}
        />

        <SinglePersonalDataRow
          fieldName={<FormattedMessage id="DandGear" />}
          value={item.DandGear}
        />

        <SinglePersonalDataRow
          fieldName={<FormattedMessage id="pockets" />}
          value={item.pocketCount}
        />

        {/* <SinglePersonalDataRow
          fieldName={"शर्टचा प्रकार"}
          value={item.shirtType}
          englishFieldName={""}
        /> */}

        {/* collar type */}
        {/* <Row
          align="middle"
          style={{ marginTop: "10px" }}
          justify={"space-between"}
        >
          <Col>
            <Text>
              <FormattedMessage id="collarType" />
            </Text>
          </Col>
          <Col>
            <Radio.Group
              size="small"
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
              }}
              value={collarType}
            >
              <div
                style={{
                  width: "100px",
                  textAlign: "center",
                }}
              >
                <Radio value={1}>
                  <Text style={{ fontSize: "11px" }}>
                    <FormattedMessage id="circle" />
                  </Text>
                </Radio>
              </div>
              <div
                style={{
                  width: "100px",
                  textAlign: "center",
                }}
              >
                <Radio value={2}>
                  <Text style={{ fontSize: "11px" }}>
                    <FormattedMessage id="square" />
                  </Text>
                </Radio>
              </div>
            </Radio.Group>
          </Col>
        </Row> */}
      </Card>
    </>
  );
};

export default DetailsPersonalDataRow;
