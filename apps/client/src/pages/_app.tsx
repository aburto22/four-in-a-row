import type { AppProps } from "next/app";
import GlobalStyle from "@/styles/global";
import store from "@store";
import { Provider } from "react-redux";
import type { NextPage } from "next";
import React from "react";

export type NextPageWithLayout<P = unknown, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <Provider store={store}>
      <GlobalStyle />
      {getLayout(<Component {...pageProps} />)}
    </Provider>
  );
}
