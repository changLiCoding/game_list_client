import React from 'react';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';
import { store } from './app/store';
import { apolloClient } from './graphql';

function ContextWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
        <BrowserRouter>{children}</BrowserRouter>
      </ApolloProvider>
    </Provider>
  );
}

export default ContextWrapper;
