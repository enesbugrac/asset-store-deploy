import Layout from "@/components/ui/layout/layout";
import "@/styles/globals.css";
import { Ubuntu } from "@next/font/google";
import type { AppProps } from "next/app";

const ubuntu = Ubuntu({
  weight: ["300", "700", "500", "400"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout className={ubuntu.className}>
      <Component {...pageProps} />
    </Layout>
  );
}
