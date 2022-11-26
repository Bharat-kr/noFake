import { useRouter } from "next/router";
import "../styles/globals.css";
import Layout from "../utils/Layout";
import { Toaster } from "react-hot-toast";
import { Web3Provider } from "../context/Web3Context";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  let isLayout = router.pathname != "/" && router.pathname != "/auth";
  return (
    <div>
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
    </div>
  );
}

export default MyApp;
