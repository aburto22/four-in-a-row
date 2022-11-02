import GlobalStyle from "@styles/global";
import * as styles from "./layout.styles";
import Header from "@components/Header";
import Footer from "@components/Footer";
import Providers from "./Providers";

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <title>Four in a row</title>
        <GlobalStyle />
      </head>
      <body>
        <Providers>
          <styles.App>
            <Header />
            {children}
            <Footer />
          </styles.App>
        </Providers>
      </body>
    </html>
  );
}
