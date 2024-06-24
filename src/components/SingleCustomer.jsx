import { Card, Col, Row } from "antd";


const SingleCustomer = (item) => {
  return (
    <>
      <Row gutter={16}>
        <Col span={8}>
          <Card title="Card Title">
            <div key={item.id}>{item.customerName}</div>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default SingleCustomer;
