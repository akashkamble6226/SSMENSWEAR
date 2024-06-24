import { Card, Col, Radio, Row, Typography } from "antd";
import { FormattedMessage } from "react-intl";

const { Text } = Typography;

const DetailsPersonalDataRow = ({ item }) => {
    const collarType = item.collarType;
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
          <Text style={{ fontSize: "18px" }}>
            <FormattedMessage id="phone" />
          </Text>
          <Text style={{ fontSize: "18px" }}>{item.customerPhone}</Text>
        </Row>

        <Row justify={"space-between"}>
          <Text style={{ fontSize: "18px" }}>
            <FormattedMessage id="dueDate" />
          </Text>
          <Text style={{ fontSize: "18px" }}>{item.dueDate}</Text>
        </Row>

        <Row justify={"space-between"}>
          <Text style={{ fontSize: "18px" }}>
            <FormattedMessage id="dueDateRemeber" />
          </Text>
          <Text style={{ fontSize: "18px" }}>{item.dueDateRemeber}</Text>
        </Row>
      </Card>
      <Card
        style={{
          position: "relative",
          paddingLeft: "10px",
          paddingRight: "10px",
          border: "1px solid #1677ff",
        }}
      >
        <Row justify={"center"} style={{ paddingBottom: "15px" }}>
          <FormattedMessage id="paymentStatus" />
        </Row>
        <Row justify={"space-between"}>
          <Col>
            <Row>
              <FormattedMessage id="totalAmount" />
            </Row>
            <Row justify={"center"}>{item.totalAmt}</Row>
          </Col>

          <Col>
            <Row>
              <FormattedMessage id="advance" />
            </Row>
            <Row justify={"center"}>{item.advanceAmt}</Row>
          </Col>

          <Col>
            <Row>
              <FormattedMessage id="remaining" />
            </Row>
            <Row justify={"center"}>{item.remainingAmt}</Row>
          </Col>
        </Row>
      </Card>

      <Row
        justify={"space-between"}
        style={{
          paddingLeft: "10px",
          paddingRight: "10px",
          paddingTop: "10px",
          fontSize: "18px",
          fontWeight: "bold",
        }}
      >
        <FormattedMessage id="shirt" />
        <Text>1</Text>
      </Row>

      <Card
        style={{
          position: "relative",
          paddingLeft: "10px",
          paddingRight: "10px",
        }}
      >
        <Row justify="space-between" align="middle">
          <Col>
            <FormattedMessage id="length" />
          </Col>
          <Col
            style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}
          >
            <div
              style={{
                paddingLeft: "10px",
                paddingRight: "10px",
                width: "60px", // Fixed width for both columns
                textAlign: "center",
              }}
            >
              <Text>{item.length.length}</Text>
            </div>
            <div
              style={{
                paddingLeft: "10px",
                paddingRight: "10px",
                width: "60px", // Fixed width for both columns
                textAlign: "center",
              }}
            >
              <Text>{item.length.lengthSize}</Text>
            </div>
          </Col>
        </Row>

        {/* chest */}
        <Row justify="space-between" align="middle">
          <Col>
            <FormattedMessage id="chest" />
          </Col>
          <Col
            style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}
          >
            <div
              style={{
                paddingLeft: "10px",
                paddingRight: "10px",
                width: "60px",
                textAlign: "center",
              }}
            >
              <Text>{item.chest.chest}</Text>
            </div>
            <div
              style={{
                paddingLeft: "10px",
                paddingRight: "10px",
                width: "60px",
                textAlign: "center",
              }}
            >
              <Text>{item.chest.chestSize}</Text>
            </div>
          </Col>
        </Row>

        {/* waist */}
        <Row justify="space-between" align="middle">
          <Col>
            <FormattedMessage id="waist" />
          </Col>
          <Col
            style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}
          >
            <div
              style={{
                paddingLeft: "10px",
                paddingRight: "10px",
                width: "60px",
                textAlign: "center",
              }}
            >
              <Text>{item.weist.weist}</Text>
            </div>
            <div
              style={{
                paddingLeft: "10px",
                paddingRight: "10px",
                width: "60px",
                textAlign: "center",
              }}
            >
              <Text>{item.weist.weistSize}</Text>
            </div>
          </Col>
        </Row>
        {/* shoulder */}
        <Row justify="space-between" align="middle">
          <Col>
            <FormattedMessage id="shoulder" />
          </Col>
          <Col
            style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}
          >
            <div
              style={{
                paddingLeft: "10px",
                paddingRight: "10px",
                width: "60px",
                textAlign: "center",
              }}
            >
              <Text>{item.shoulder.shoulder}</Text>
            </div>
            <div
              style={{
                paddingLeft: "10px",
                paddingRight: "10px",
                width: "60px",
                textAlign: "center",
              }}
            >
              <Text>{item.shoulder.shoulderSize}</Text>
            </div>
          </Col>
        </Row>

        {/* collar */}
        <Row justify="space-between" align="middle">
          <Col>
            <FormattedMessage id="collar" />
          </Col>
          <Col
            style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}
          >
            <div
              style={{
                paddingLeft: "10px",
                paddingRight: "10px",
                width: "60px",
                textAlign: "center",
              }}
            >
              <Text>{item.collar.collar}</Text>
            </div>
            <div
              style={{
                paddingLeft: "10px",
                paddingRight: "10px",
                width: "60px",
                textAlign: "center",
              }}
            >
              <Text>{item.collar.collar}</Text>
            </div>
          </Col>
        </Row>

        {/* collar type */}
        <Row
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
        </Row>

        {/* collar */}
        <Row justify="space-between" align="middle">
          <Col>
            <FormattedMessage id="collar" />
          </Col>
          <Col
            style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}
          >
            <div
              style={{
                paddingLeft: "10px",
                paddingRight: "10px",
                width: "60px",
                textAlign: "center",
              }}
            >
              <Text>{item.collar.collar}</Text>
            </div>
            <div
              style={{
                paddingLeft: "10px",
                paddingRight: "10px",
                width: "60px",
                textAlign: "center",
              }}
            >
              <Text>{item.collar.collarSize}</Text>
            </div>
          </Col>
        </Row>

        {/* lengthOfHand */}
        <Row justify="space-between" align="middle">
          <Col>
            <FormattedMessage id="lengthOfHand" />
          </Col>
          <Col
            style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}
          >
            <div
              style={{
                paddingLeft: "10px",
                paddingRight: "10px",
                width: "60px",
                textAlign: "center",
              }}
            >
              <Text>{item.lengthOfHand.lengthOfHand}</Text>
            </div>
            <div
              style={{
                paddingLeft: "10px",
                paddingRight: "10px",
                width: "60px",
                textAlign: "center",
              }}
            >
              <Text>{item.lengthOfHand.lengthOfHandSize}</Text>
            </div>
          </Col>
        </Row>

        {/* handFourSide */}
        <Row justify="space-between" align="middle">
          <Col>
            <FormattedMessage id="handFourSide" />
          </Col>
          <Col
            style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}
          >
            <div
              style={{
                paddingLeft: "10px",
                paddingRight: "10px",
                width: "60px",
                textAlign: "center",
              }}
            >
              <Text>{item.handFourSide.handFourSide}</Text>
            </div>
            <div
              style={{
                paddingLeft: "10px",
                paddingRight: "10px",
                width: "60px",
                textAlign: "center",
              }}
            >
              <Text>{item.handFourSide.handFourSideSize}</Text>
            </div>
          </Col>
        </Row>

         {/* wrist */}
         <Row justify="space-between" align="middle">
          <Col>
            <FormattedMessage id="wrist" />
          </Col>
          <Col
            style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}
          >
            <div
              style={{
                paddingLeft: "10px",
                paddingRight: "10px",
                width: "60px",
                textAlign: "center",
              }}
            >
              <Text>{item.wrist.wrist}</Text>
            </div>
            <div
              style={{
                paddingLeft: "10px",
                paddingRight: "10px",
                width: "60px",
                textAlign: "center",
              }}
            >
              <Text>{item.wrist.wriestSize}</Text>
            </div>
          </Col>
        </Row>

        {/* hip */}
        <Row justify="space-between" align="middle">
          <Col>
            <FormattedMessage id="hip" />
          </Col>
          <Col
            style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}
          >
            <div
              style={{
                paddingLeft: "10px",
                paddingRight: "10px",
                width: "60px",
                textAlign: "center",
              }}
            >
              <Text>{item.hip.hip}</Text>
            </div>
            <div
              style={{
                paddingLeft: "10px",
                paddingRight: "10px",
                width: "60px",
                textAlign: "center",
              }}
            >
              <Text>{item.hip.hipSize}</Text>
            </div>
          </Col>
        </Row>

         {/* pockets */}
         <Row justify="space-between" align="middle">
          <Col>
            <FormattedMessage id="pockets" />
          </Col>
          <Col
            style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}
          >
            <div
              style={{
                paddingLeft: "10px",
                paddingRight: "10px",
                width: "60px",
                textAlign: "center",
              }}
            >
              <Text>{item.pocketsSize}</Text>
            </div>
            
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default DetailsPersonalDataRow;
