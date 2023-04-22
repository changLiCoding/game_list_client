import React from "react";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "./graphql";
import { BrowserRouter } from "react-router-dom";

const ContextWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
        <BrowserRouter>{children}</BrowserRouter>
      </ApolloProvider>
    </Provider>
  );
};

export default ContextWrapper;
