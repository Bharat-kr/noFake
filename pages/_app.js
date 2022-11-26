import { useRouter } from "next/router";
import "../styles/globals.css";
import Layout from "../components/Layout";
import { Toaster } from "react-hot-toast";
import { Web3Provider } from "../context/Web3Context";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  let isLayout = router.pathname != "/" && router.pathname != "/auth";
  return (
    <>
      <Head>
        <title>NoFake</title>
      </Head>
      <Toaster />
      <Web3Provider>
        {isLayout ? (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        ) : (
          <Component {...pageProps} />
        )}
      </Web3Provider>
    </>
  );
}

export default MyApp;
