import { Spin } from "antd";
import { useState } from "react";

const Loader = ({spinning, percent}) => {
 
  return <Spin spinning={spinning} percent={percent} fullscreen />;
};

export default Loader;
