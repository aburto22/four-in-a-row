import Footer from "@components/Footer";
import Header from "@components/Header";
import * as styles from "./style";

type GameLayoutProps = {
  children: React.ReactNode;
};

const GameLayout = ({ children }: GameLayoutProps) => (
  <styles.App>
    <Header />
    {children}
    <Footer />
  </styles.App>
);

export default GameLayout;
