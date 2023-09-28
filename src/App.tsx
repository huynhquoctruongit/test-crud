import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SWRConfig } from "swr";
import { NextUIProvider } from "@nextui-org/react";
import AxiosClient, { fetcherClient } from "./libs/api/axios-client";
import ManageUser from "./pages/manager/manage-user";

function App() {
  return (
    <NextUIProvider>
      <SWRConfig
        value={{
          revalidateIfStale: false,
          revalidateOnFocus: false,
          fetcher: fetcherClient,
        }}
      >
        <RoutesWrap />
      </SWRConfig>
    </NextUIProvider>
  );
}

const RoutesWrap = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ManageUser />} path="/manage-user" />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
