import { Footer, Header } from "antd/es/layout/layout";
import { Layout, Typography } from "antd";
import { Outlet } from "react-router";
import { useSelector } from "react-redux";
import MainMenu from "../menu/MainMenu";
const { Title } = Typography;

const Root = () => {
  const isLoggedIn = useSelector((state) => state.authentication.isLogged);
  return (
    <>
      <Layout>
        {isLoggedIn && <MainMenu />}
        <Outlet />
      </Layout>
    </>
  );
};

export default Root;
