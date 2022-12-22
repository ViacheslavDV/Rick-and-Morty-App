import Head from "next/head";
import { PropsWithChildren, FC } from "react";
import Header from "../Header/Header";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Rick and Morty</title>
      </Head>
      <Header />
      <main>{children}</main>
    </>
  );
};

export default Layout;
