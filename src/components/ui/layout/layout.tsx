import { GlobalContextProvider } from "@/contexts/globalContext";
import Head from "next/head";
import Navbar from "../header/navbar";

type LayoutProps = {
  children: React.ReactNode;
  className: string;
};
export default function Layout({ children, className }: LayoutProps) {
  return (
    <>
      <Head>
        <title>Assetstore | Spica</title>
        <meta name="description" content="Assetstore for Spica" />
        <link rel="icon" href="/fav.png" />
      </Head>
      <main className={className}>
        <GlobalContextProvider>
          <Navbar />
          {children}
        </GlobalContextProvider>
      </main>
    </>
  );
}
