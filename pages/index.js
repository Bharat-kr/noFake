import Head from "next/head";
import { HomepageSaver } from "../assests/HomepageSaver";
import { useWeb3 } from "../context/Web3Context";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const { account, setAccount, setConnecting, noFakeInstance } = useWeb3();
  const router = useRouter();

  useEffect(() => {
    if (account) {
      router.push("/dashboard");
    }
  }, [account]);

  const getAccount = async (_event) => {
    setConnecting(true);
    try {
      const val = await ethereum.request({ method: "eth_requestAccounts" });
      if (val.length > 0) {
        setAccount(val[0]);
        toast.success("Account Found");
      }
    } catch (error) {
      toast.error(error.message);
      setConnecting(false);
    }
  };
  return (
    <div className="body w-full h-screen">
      <Head>
        <title>NoFake</title>
        <meta
          name="description"
          content="Validate Fake products, powered by Blockchain Technology"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="text-gray-600 body-font mx-10 flex items-center">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            <span className="ml-3 text-xl">NoFake</span>
          </a>
        </div>

        <div className="w-44 md:w-32">
          <div class="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
            <input
              type="checkbox"
              name="toggle"
              id="toggle"
              class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
            />
            <label
              for="toggle"
              class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
            ></label>
          </div>
          <label for="toggle" class="text-xs text-gray-700">
            Dark Mode
          </label>
        </div>
      </header>

      <section className="text-gray-600 body-font mx-10">
        <div className="container mx-auto flex px-5 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              Register your product with
              <br className="hidden lg:inline-block" />
              secure blockchain based system
            </h1>
            <p className="mb-8 w-3/4 leading-relaxed leading-7 font-semibold text-justify">
              Secure product registration gateway, enables manufacturers to
              identify leaks in product distributions with compability to
              identify fake product.
            </p>
            <div className="flex justify-center">
              <Link href="/auth">
                <button className="inline-flex text-white bg-gray-800 border-0 py-3 px-6 focus:outline-none hover:bg-gray-600 rounded text-lg">
                  Create Account
                </button>
              </Link>
              <button
                className="inline-flex ml-4 bg-white text-black border-2 border-black py-3 px-6 rounded text-lg font-semibold"
                onClick={getAccount}
              >
                Login
              </button>
            </div>
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <HomepageSaver />
          </div>
        </div>
      </section>
    </div>
  );
}
