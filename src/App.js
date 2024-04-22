import { useSelector } from "react-redux";
import Login from "./pages/Login";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./menu/MainMenu";
import Tailor from "./pages/Tailor";
import Fabric from "./pages/Fabric";
import Root from "./pages/Root";

function App() {
  const isLoggedIn = useSelector((state) => state.authentication.isLogged);
  console.log("isLoggedIn", isLoggedIn);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [

        { path: "/", element: isLoggedIn ? <Home /> : <Login /> },
        { path: "/tailor", element: isLoggedIn ? <Tailor /> : <Login /> },
        { path: "/fabric", element: isLoggedIn ? <Fabric /> : <Login /> },
      ],
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
