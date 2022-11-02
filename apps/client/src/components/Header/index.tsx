import Image from "next/image";
import React from "react";
import logo from "@public/assets/logo.png";
import * as styles from "./styles";

const Header = () => (
  <styles.Header>
    <Image src={logo} alt="blue circle" priority width={40} />
    <styles.Title>Four in a Row</styles.Title>
  </styles.Header>
);

export default Header;
