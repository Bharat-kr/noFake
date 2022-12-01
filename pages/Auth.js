import React, { useEffect, useState } from "react";
import { useWeb3 } from "../context/Web3Context";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";

const Auth = () => {
  const { noFakeInstance, setAccount, user } = useWeb3();
  const [name, setName] = useState("");
  const [naccount, setnAccount] = useState("");
  const [isCustomer, setIsCustomer] = useState("company");
  const [phoneNo, setPhoneNo] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (user && user?.phone_number) {
      router.push("/dashboard");
    }
  }, []);

  const signUp = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const val = await ethereum.request({ method: "eth_requestAccounts" });
      if (val.length > 0) {
        console.log(val[0], naccount);
        await noFakeInstance.methods
          .createUser(name, isCustomer, phoneNo, naccount)
          .send({
            from: naccount,
          })
          .on("receipt", function (receipt) {
            setAccount(naccount);
            setUser({
              name: name,
              type: isCustomer,
              phone_number: phoneNo,
            });
            toast.success(`Transaction completed. ${receipt.transactionHash}`);
            setLoading(false);
            router.push("/dashboard");
          });
      } else {
        toast.error("Enter correct Address");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <div className="bg-slate-300 min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Sign up</h1>
          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="fullname"
            placeholder="Full Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />

          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="Account ID"
            placeholder="Account ID"
            value={naccount}
            onChange={(e) => {
              setnAccount(e.target.value);
            }}
          />

          <select
            className="block border border-grey-light w-full p-3 rounded mb-4"
            value={isCustomer}
            onChange={(e) => {
              setIsCustomer(e.target.value);
            }}
          >
            <option value="company">Company</option>
            <option value="individual">Individual</option>
          </select>

          <input
            type="number"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="number"
            placeholder="Phone Number"
            value={phoneNo}
            onChange={(e) => {
              setPhoneNo(e.target.value);
            }}
          />

          <button
            type="submit"
            className="w-full text-center py-3 rounded bg-slate-300 text-black hover:bg-green-dark focus:outline-none my-1"
            onClick={signUp}
            disabled={loading}
          >
            {loading ? "Creating.." : "Create Account"}
          </button>

          {/* <div className="text-center text-sm text-grey-dark mt-4">
                        By signing up, you agree to the 
                        <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                            Terms of Service
                        </a> and 
                        <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                            Privacy Policy
                        </a>
                    </div> */}
        </div>

        {/* <div className="text-grey-dark mt-6">
                    Already have an account? 
                    <a className="no-underline border-b border-blue text-blue" href="../login/">
                        Log in
                    </a>.
                </div> */}
      </div>
    </div>
  );
};

export default Auth;
