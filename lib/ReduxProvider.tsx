"use client";

import React from "react";
import { Provider } from "react-redux";
import store from "@/store";

type reduxProviderProps = {
  children: React.ReactNode;
  enableColorMode?: boolean;
};

export default function ReduxProvider({ children }: reduxProviderProps) {
  return <Provider store={store}>{children}</Provider>;
}
