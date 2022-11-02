import Footer from "@components/Footer";
import Header from "@components/Header";
import * as styles from "./style";

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => (
  <styles.App>
    <Header />
    {children}
    <Footer />
  </styles.App>
);

export default MainLayout;
