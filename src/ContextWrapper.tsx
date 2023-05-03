import React from 'react';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { store } from './app/store';
import { apolloClient } from './graphql';

function ContextWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#91caff',
            },
          }}
        >
          <BrowserRouter>{children}</BrowserRouter>
        </ConfigProvider>
      </ApolloProvider>
    </Provider>
  );
}

export default ContextWrapper;
