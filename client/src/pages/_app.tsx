import type { AppProps } from "next/app";
import GlobalStyle from "@/styles/global";
import store from "@store";
import { Provider } from "react-redux";
import Layout from "@components/Layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
