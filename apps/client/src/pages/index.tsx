import Home from "@components/Home";
import React from "react";
import type { NextPageWithLayout } from "./_app";
import MainLayout from "@layouts/Main";

const IndexPage: NextPageWithLayout = () => {
  return <Home />;
};

IndexPage.getLayout = (page: React.ReactElement) => (
  <MainLayout>{page}</MainLayout>
);

export default IndexPage;
