import React from "react";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "./graphql";

const ContextWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
    </Provider>
  );
};

export default ContextWrapper;
