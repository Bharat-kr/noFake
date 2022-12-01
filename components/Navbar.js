import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useWeb3 } from "../context/Web3Context";

const Navbar = () => {
  const router = useRouter();

  const { account, noFakeInstance, user, setUser } = useWeb3();

  useEffect(() => {
    if (noFakeInstance && !user?.phone_number) {
      router.push("/");
    }
  }, [user]);

  const logout = () => {
    setUser({
      name: "",
      phone_number: "",
      type: "",
    });
  };

  useEffect(() => {
    const init = async () => {
      try {
        const cuser = await noFakeInstance.methods.getUser(account).call();
        setUser({
          name: cuser["0"],
          type: cuser["1"],
          phone_number: cuser["2"],
        });
      } catch (error) {
        console.log(error);
      }
    };
    init();
  }, [account]);

  return (
    <div className="flex flex-col w-64 h-screen py-8 bg-white border-r dark:bg-gray-800 dark:border-gray-600">
      <h2 className="text-3xl font-semibold text-center text-gray-800 dark:text-white">
        NoFake
      </h2>
      <div className="flex flex-col items-center mt-6 -mx-2">
        <img
          className="object-cover w-24 h-24 mx-2 rounded-full"
          src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
          alt="avatar"
        />
        <h4 className="mx-2 mt-2 font-medium text-gray-800 dark:text-gray-200 hover:underline">
          {user?.name}
        </h4>
        <p className="mx-2 mt-1 text-sm font-medium text-gray-600 dark:text-gray-400 hover:underline w-36 turncate text-ellipsis overflow-hidden">
          {account}
        </p>
      </div>
      <div className="flex flex-col justify-between flex-1 mt-6">
        <nav>
          <Link href="/dashboard">
            <div
              className={`flex items-center justify-center px-4 py-2 ${
                router.asPath === "/dashboard"
                  ? "text-gray-700 bg-gray-200 dark:bg-gray-700 dark:text-gray-200"
                  : "text-gray-600  dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700"
              } cursor-pointer`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
              <span className="mx-4 font-medium">All Products</span>
            </div>
          </Link>
          {user?.type === "company" && (
            <Link href="/addProduct">
              <div
                className={`flex items-center justify-center px-4 py-2 my-2 ${
                  router.asPath === "/addProduct"
                    ? "text-gray-700 bg-gray-200 dark:bg-gray-700 dark:text-gray-200"
                    : "text-gray-600  dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700"
                } cursor-pointer`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="mx-4 font-medium">Add Product</span>
              </div>
            </Link>
          )}
          <Link href="/transferProduct">
            <div
              className={`flex items-center justify-center px-4 py-2 my-2 ${
                router.asPath === "/transferProduct"
                  ? "text-gray-700 bg-gray-200 dark:bg-gray-700 dark:text-gray-200"
                  : "text-gray-600  dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700"
              } cursor-pointer`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8zM12 15a1 1 0 100-2H6.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 15H12z" />
              </svg>
              <span className="mx-4 font-medium">Transfer Ownership</span>
            </div>
          </Link>
          <Link href="/validateProduct">
            <div
              className={`flex items-center justify-center px-4 py-2 ${
                router.asPath === "/validateProduct"
                  ? "text-gray-700 bg-gray-200 dark:bg-gray-700 dark:text-gray-200"
                  : "text-gray-600  dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700"
              } cursor-pointer`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="mx-4 font-medium">Validate Product</span>
            </div>
          </Link>
          <div
            div
            className="flex items-center justify-center px-4 py-2 text-gray-600 hover:text-red-500 cursor-pointer"
            onClick={logout}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span className="mx-4 font-medium">Logout</span>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
