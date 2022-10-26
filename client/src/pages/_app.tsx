import "@styles/globals.css";
import type { AppProps } from "next/app";
import GlobalStyle from "@/styles/global";
import store from "@store";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <Component {...pageProps} />
    </Provider>
  );
}
