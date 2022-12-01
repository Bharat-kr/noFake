import React, { useEffect, useState } from "react";
import ProdCard from "../components/ProdCard";
import { useWeb3 } from "../context/Web3Context";

const Dashboard = () => {
  const { noFakeInstance } = useWeb3();
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (search) {
      setProducts(
        products.filter((item) => {
          return item.name.toLowerCase().includes(search.toLowerCase());
        })
      );
    } else {
      setProducts(allProducts);
    }
  }, [search, filter]);

  useEffect(() => {
    const init = async () => {
      try {
        const p = await noFakeInstance.methods.getAllProducts().call();
        console.log(p);
        setAllProducts(p);
        setProducts(p);
      } catch (error) {
        console.log(error);
      }
    };
    init();
  }, [noFakeInstance]);
  const changeFilter = (val) => {
    setFilter(val);
    setShow(false);
  };

  return (
    <div>
      <section className="flex flex-col m-2 ">
        {/* header section start here */}
        <div className="flex justify-around w-full items-center">
          <h1 className="w-full text-3xl font-bold">All Prodcuts</h1>
          <button
            className="relative flex items-center justify-center w-full px-0 md:px-8 py-2 text-white transition-colors duration-200 transform bg-black rounded-md h-fit focus:outline-none sm:w-auto sm:mx-1 hover:bg-black focus:bg-black focus:ring focus:ring-black focus:ring-opacity-40"
            onClick={() => {
              setShow((prev) => !prev);
            }}
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
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            <span className="mx-1">Filter</span>
            {show && (
              <div className="absolute flex-col z-[999] right-0 top-12 bg-slate-900 rounded cursor-pointer w-full">
                <div
                  className="w-full text-center px-4 py-2 hover:bg-slate-500 rounded-t text-white"
                  onClick={() => {
                    changeFilter("Mobile");
                  }}
                >
                  Mobiles
                </div>
                <div
                  className="w-full text-center px-4 py-2 hover:bg-slate-500 text-white"
                  onClick={() => {
                    changeFilter("Laptop");
                  }}
                >
                  Laptops
                </div>
                <div
                  className="w-full text-center px-4 py-2 hover:bg-slate-500 rounded-b text-white"
                  onClick={() => {
                    changeFilter("TV");
                  }}
                >
                  TVs
                </div>
              </div>
            )}
          </button>
        </div>
        {/* header section end here */}
        {/* ----------------------------------------------------- */}
        {/* search bar start */}
        <div className="flex items-center">
          <div></div>
          <div className="flex w-3/4">
            <section className="relative w-full py-4 rounded-md">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <input
                  type="text"
                  className="w-full py-3 pl-10 pr-4 text-gray-700 bg-white border border-1 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-800 focus:border-black dark:focus:border-black focus:outline-none"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  placeholder="Type products name or code..."
                />
              </div>
            </section>
          </div>
        </div>
        {/* search bar end here */}
        <div className="w-full flex flex-wrap">
          {products.map((item) => {
            return <ProdCard key={item.uuid} item={item} />;
          })}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
