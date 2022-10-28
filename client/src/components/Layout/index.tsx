import Footer from "@components/Footer";
import Header from "@components/Header";
import * as styles from "./style";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => (
  <styles.App>
    <Header />
    {children}
    <Footer />
  </styles.App>
);

export default Layout;
