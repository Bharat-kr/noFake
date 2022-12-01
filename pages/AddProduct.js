import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import { useWeb3 } from "../context/Web3Context";

const AddProduct = () => {
  const { getRootProps, getInputProps } = useDropzone();

  const { account, noFakeInstance } = useWeb3();
  const [name, setName] = useState("");
  const [productNo, setProductNo] = useState(uuidv4());
  const [ownersAddress, setOwnersAddress] = useState("");
  const [type, setType] = useState("");
  const [issuersName, setIssuersName] = useState("");
  const [country, setCountry] = useState("US");
  const [loading, setLoading] = useState(false);

  const registerProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await noFakeInstance.methods
        .registerProduct(
          uuidv4(),
          name,
          ownersAddress,
          ownersAddress,
          account,
          type,
          issuersName,
          country
        )
        .send({
          from: account,
        })
        .on("receipt", function (receipt) {
          // toast.success(
          //   `Transaction completed. ${receipt.transactionHash.slice(0, 10)}...`
          // );
          setName("");
          setProductNo("");
          setIssuersAddress("");
          setIssuersAddress("");
          setIssuersName("");
          setCountry("");
        });
      toast.success("Product Added");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="w-full text-3xl font-bold">Add Products</h1>
      {/* Form */}
      <form className="mt-10 w-full">
        <div className="relative mb-4">
          <label htmlFor="name" className="leading-7 text-md text-gray-600">
            Product Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>

        <div className="flex mb-4">
          <div className="relative mb-4 mr-5 w-1/5">
            <label
              htmlFor="productNo"
              className="leading-7 text-md text-gray-600"
            >
              Product No.
            </label>
            <input
              type="text"
              id="productNo"
              name="productNo"
              value={productNo}
              onChange={(e) => {
                setProductNo(e.target.value);
              }}
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>

          <div className="relative mb-4 w-1/3 flex flex-col mr-5">
            <label
              htmlFor="ownerAddress"
              className="leading-7 text-md text-gray-600"
            >
              Owner Address
            </label>
            <input
              type="text"
              id="ownerAddress"
              name="ownerAddress"
              value={ownersAddress}
              onChange={(e) => {
                setOwnersAddress(e.target.value);
              }}
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
            <div>
              <input
                type="checkbox"
                className="border-gray-300 rounded mr-3 mt-2"
                onChange={(e) => {
                  if (e.target.checked == true) {
                    setOwnersAddress(account);
                  } else {
                    setOwnersAddress("");
                  }
                }}
              />
              <span className="text-slate-600">Same as current Owner</span>
            </div>
          </div>

          <div className="relative mb-4 mr-5 w-2/5">
            <label
              htmlFor="issuersAddress"
              className="leading-7 text-md text-gray-600"
            >
              Product Type
            </label>
            <select
              id="countries"
              value={type}
              onChange={(e) => {
                setType(e.target.value);
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option selected>Choose a category</option>

              <option value="Mobile">Mobile</option>
              <option value="TV">TV</option>
              <option value="Laptop">Laptop</option>
            </select>
          </div>
        </div>

        <div className="flex mb-4">
          <div className="relative mb-4 mr-5 w-2/5">
            <label
              htmlFor="issuersName"
              className="leading-7 text-md text-gray-600"
            >
              Issuers Name
            </label>
            <input
              type="text"
              id="issuersName"
              name="issuersName"
              value={issuersName}
              onChange={(e) => {
                setIssuersName(e.target.value);
              }}
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>

          <div className="relative mb-4 mr-5 w-2/5">
            <div>
              <label
                hhtmlFor="countries"
                className="leading-7 text-md text-gray-600"
              >
                Country
              </label>
              <select
                id="countries"
                value={country}
                onChange={(e) => {
                  setCountry(e.target.value);
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option selected>Choose a country</option>
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="FR">France</option>
                <option value="DE">Germany</option>
              </select>
            </div>
          </div>
        </div>
        {/* <span className="leading-7 text-md text-gray-600">
          Upload Certificates and Images
        </span>
        <section className="container w-full h-40 my-3 rounded-lg hover:border-dotted hover:border-teal-400 hover:border-4 text-gray-500 text-center bg-slate-100 flex justify-center items-center">
          <div className="" {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            <p>
              Drag n drop some files here,
              <br />
              or click to select files
            </p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 mx-auto mt-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m0-3l-3-3m0 0l-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75"
              />
            </svg>
          </div>
        </section> */}
        <button
          type="submit"
          className="bg-black rounded-lg text-white hover:bg-gray-800 hover:text-grey-600 py-4 w-full flex justify-center items-center"
          onClick={registerProduct}
          disabled={loading}
        >
          {loading && (
            <span className="mr-3 font-semibold leading-7">Registering...</span>
          )}
          {!loading && (
            <>
              <span className="mr-3 font-semibold leading-7">Register</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 -rotate-45"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                />
              </svg>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
