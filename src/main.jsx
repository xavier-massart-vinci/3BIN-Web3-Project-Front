import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter  } from "react-router-dom";

import App from './Components/Pages/App/App'
import Home from './Components/Pages/Home/Home'
import Login from './Components/Pages/Login/Login'
import Register from './Components/Pages/Register/Register'
import PrivateRoute from './Components/PrivateRoute/PrivateRoute'
import Chat from './Components/Chat/Chat'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <PrivateRoute/>,
      },
      {
        path: "*",
        element: <PrivateRoute/>,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        element: <PrivateRoute><Home/></PrivateRoute>,
        children: [
          {
            path: "chat/:userId",
            element: <Chat />,
          },
        ]
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}/>  
  </React.StrictMode>
);
