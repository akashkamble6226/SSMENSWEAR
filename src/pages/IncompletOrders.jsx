import { Col, FloatButton, Typography, Spin, notification } from "antd";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { FormattedMessage } from "react-intl";
import { IoAddOutline } from "react-icons/io5";
import useAllIncompletOrders from "../customeHooks/AllIncompleteOrders";
import AllIncompleteOrders from "../components/AllIncompletOrders";
import useAllCustomerImages from "../customeHooks/AllCustomerImages";
import { useNavigate } from "react-router-dom";
const Context = React.createContext({
  name: "Default",
});

const IncompleteOrders = () => {
  const { allInCompletOrdersData, loadingData } = useAllIncompletOrders();
  const [api, contextHolder] = notification.useNotification();
  const nav = useNavigate();
  const {
    customerImageUrls,
    loadingCustomerImages,
    clothImageUrls,
    loadingClothImages,
  } = useAllCustomerImages();

  const openAddCustomerPage = () => {
    nav("/tailor/newCustomer");
  };

  const contextValue = useMemo(
    () => ({
      name: "Ant Design",
    }),
    []
  );

  return (
    <Context.Provider value={contextValue}>
      {contextHolder}
      <>
        {!loadingCustomerImages &&
        !loadingClothImages &&
        !loadingData &&
        allInCompletOrdersData.length === 0 ? (
          <FormattedMessage id="noRecords" />
        ) : (
          <Col span={24} style={{ paddingRight: "10px" }}>
            {loadingCustomerImages && loadingClothImages && loadingData ? (
              <Spin />
            ) : (
              <AllIncompleteOrders
                docs={allInCompletOrdersData}
                customerImageUrls={customerImageUrls}
                clothImageUrls={clothImageUrls}
              />
            )}
          </Col>
        )}
        <FloatButton
          onClick={openAddCustomerPage}
          shape="circle"
          type="primary"
          tooltip={<FormattedMessage id="addUser" />}
          style={{
            right: 30,
            backgroundColor: "#E17B2B",
            width: "60px",
            height: "60px",
          }}
          icon={<IoAddOutline />}
        />
      </>
    </Context.Provider>
  );
};
export default IncompleteOrders;
