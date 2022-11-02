import Footer from "@components/Footer";
import Header from "@components/Header";
import * as styles from "./style";

type GameLayoutProps = {
  children: React.ReactNode;
};

export default function GameLayout({ children }: GameLayoutProps) {
  return (
    <styles.App>
      <Header />
      {children}
      <Footer />
    </styles.App>
  );
}
