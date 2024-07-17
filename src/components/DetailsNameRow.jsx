import { Avatar, Col, Dropdown, Row, Space, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaEdit } from "react-icons/fa";
import { CiMenuKebab } from "react-icons/ci";
import { useContext } from "react";
import { InvoiceContext } from "../context/InvoiceContext";
import { deleteDoc, doc } from "firebase/firestore";
import { db, storage } from "../firebase";
import { CustomerNameFormat } from "../func/customerNameFormatting";
import { deleteObject, ref } from "firebase/storage";
const { Text } = Typography;
const DetailsNameRow = ({ item, custImg, clothImg }) => {
  const name = CustomerNameFormat(item.customerName);
  const customerInvoice = item.customerInvoice;
  const phone = item.customerPhone;

  const nameOfRecord = `${name}_${phone}_${customerInvoice}`;

  let navigate = useNavigate();

  const { isInvoice, setIsInvoice, setIsEditing } = useContext(InvoiceContext);

  const goBack = () => {
    navigate("/tailor/incompletOrders");
  };

  const openEditingPage = () => {
    const additionalData = {
      item,
      custImg,
      clothImg,
    };
    navigate(`/tailor/incompletOrders/edit/${customerInvoice}`, {
      state: { additionalData },
    });
  };

  const deleteRecord = async () => {
    try {
      await deleteDoc(doc(db, `Customers/${nameOfRecord}`));
      deleteImages("Invoices");
      deleteImages("clothImages");
      deleteImages("customerImages");
      goBack();
    } catch (e) {
      console.log(e);
    }
  };

  const deleteImages = (type) => {
    const invoiceRef = ref(
      storage,
      `${type}/${name}_${phone}_${customerInvoice}`
    );

    deleteObject(invoiceRef)
      .then(() => {
        console.log(`Deleted ${type}`);
      })
      .catch((e) => {
        if (e.code === "storage/object-not-found") {
          console.log(`${type} not present`);
        } else {
          console.log("An error occurred: ", e.message);
        }
      });
  };

  const performOperation = (e) => {
    console.log("click ", e.key);
    switch (e.key) {
      case "1":
        setIsInvoice(true);
        break;
      case "2":
        openEditingPage();
        break;
      case "3":
        deleteRecord();
        break;
    }
  };

  const items = [
    {
      key: "1",
      label: <Text style={{ fontSize: "20px" }}>Invoice</Text>,
    },
    {
      key: "2",
      label: <Text style={{ fontSize: "20px" }}>Edit</Text>,
    },
    {
      key: "3",
      label: <Text style={{ fontSize: "20px" }}>Delete</Text>,
    },
  ];

  return (
    <Row
      style={{ backgroundColor: "#ffffff", height: "60px" }}
      justify={"space-between"}
      align={"middle"}
    >
      <Col style={{ padding: "10px" }} onClick={goBack}>
        <Avatar
          shape="circle"
          size={"large"}
          style={{ backgroundColor: "#001529", cursor: "pointer" }}
          src={
            <FaArrowLeft
              color="#ffffff"
              style={{ fontSize: "20px", margin: "5px" }}
            />
          }
        />
      </Col>
      <Col>
        <Text
          style={{ fontSize: "20px", fontWeight: "bold" }}
        >{`${name} (${customerInvoice})`}</Text>
      </Col>
      <Col style={{ padding: "10px" }}>
        <Dropdown
          trigger={"click"}
          menu={{
            onClick: performOperation,
            items,
          }}
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <Avatar
                shape="circle"
                size={"large"}
                style={{ backgroundColor: "#001529", cursor: "pointer" }}
                src={
                  <CiMenuKebab color="#ffffff" style={{ fontSize: "20px" }} />
                }
              />
            </Space>
          </a>
        </Dropdown>
      </Col>
    </Row>
  );
};

export default DetailsNameRow;
