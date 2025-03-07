import React from "react";
import { RouterProvider } from "react-router";
import { router } from "./router/router";
import { Provider } from "react-redux";
import store from "./store/store";

export function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}
