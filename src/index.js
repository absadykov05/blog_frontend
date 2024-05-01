import React from "react";
import * as ReactDOM from "react-dom/client";
import CssBaseline from "@mui/material/CssBaseline";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AddPost, FullPost, Home, Login, Registration } from "./pages";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import "./index.scss";
import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./App";
import Markdown from "react-markdown";

const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/posts",
        element: <FullPost />,
      },
      {
        path: "/posts/:id",
        element: <FullPost />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Registration />,
      },
      {
        path: "/posts/create",
        element: <AddPost />,
      },
      {
        path: "/posts/:id/edit",
        element: <AddPost/>
      },
    ],
  },
]);

root.render(
  <>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ThemeProvider>
  </>
);
