import React, { PropsWithChildren } from 'react';
import { render, renderHook } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import type { PreloadedState } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { ConfigProvider } from 'antd';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { setupStore, type AppStore, type RootState } from '../app/store';
import { apolloClient } from '@/graphql';
// As a basic setup, import your same slice reducers

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

export function renderVite(
  ui: React.ReactElement,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<object>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

export function renderCypress(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<object>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...cy.mount(<Wrapper>{ui}</Wrapper>) };
}

type MockedProviderType = {
  mocks?:
    | readonly MockedResponse<Record<string, any>, Record<string, any>>[]
    | undefined;
  addTypename?: boolean;
};

export function DefaultFullProvider({
  children,
  mocks,
  addTypename,
}: PropsWithChildren<MockedProviderType>) {
  const store = setupStore({});
  return (
    <Provider store={store}>
      <MockedProvider mocks={mocks} addTypename={addTypename}>
        <ConfigProvider>
          <BrowserRouter>{children}</BrowserRouter>
        </ConfigProvider>
      </MockedProvider>
    </Provider>
  );
}

export function DefaultMockedProvider({
  children,
  mocks,
  addTypename,
}: PropsWithChildren<MockedProviderType>) {
  return (
    <MockedProvider mocks={mocks} addTypename={addTypename}>
      <ConfigProvider>
        <BrowserRouter>{children}</BrowserRouter>
      </ConfigProvider>
    </MockedProvider>
  );
}

export function Default({ children }: PropsWithChildren<object>) {
  return (
    <ApolloProvider client={apolloClient}>
      <ConfigProvider>
        <BrowserRouter>{children}</BrowserRouter>
      </ConfigProvider>
    </ApolloProvider>
  );
}
