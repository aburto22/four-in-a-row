import Header from "@components/Header";
import { StyledDiv } from "./style";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => (
  <StyledDiv>
    <Header />
    {children}
  </StyledDiv>
);

export default Layout;
