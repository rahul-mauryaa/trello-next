// app/providers.tsx
"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PersistGate } from "redux-persist/es/integration/react";

export function ProvidersChakra({ children }: { children: React.ReactNode }) {
  return <ChakraProvider>{children}</ChakraProvider>;
}

export function ProvidersRedux({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}

export function ProvidersPersistRedux({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PersistGate persistor={persistor}>{children}</PersistGate>;
}

export function Tostifycontainer() {
  return <ToastContainer />;
}
