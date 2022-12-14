import React, { createContext, useState, useContext, useEffect } from "react";
import initWeb3 from "./web3";
import { toast } from "react-hot-toast";
import NoFakeFactory from "../smart_contract/artifacts/contracts/NoFake.sol/NoFake.json";

const Web3Context = createContext();

export const Web3Provider = ({ children }) => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState("");
  const [doneCheckingForMetaMask, setDoneCheckingForMetaMask] = useState(false);
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [isGoerliChain, setIsGoerliChain] = useState(false);
  const [user, setUser] = useState({});
  const [noFakeInstance, setNoFakeInstance] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function initWeb3WithProvider() {
      if (web3 === null) {
        if (!cancelled) {
          setDoneCheckingForMetaMask(false);
          const web3Instance = await initWeb3();
          if (web3Instance) {
            setWeb3(web3Instance);
          } else {
            toast("Please install Metamask!");
          }

          // Transactions done in this app must be done on the Goerli test network.
          try {
            const chainId = await ethereum.request({ method: "eth_chainId" });
            if (chainId === "0x5") {
              setIsGoerliChain(true);
            } else {
              toast.error("Please change to Goerli Testnet");
            }
          } catch (error) {
            toast.error(error.message);
          }

          setDoneCheckingForMetaMask(true);
        }
      }
    }

    initWeb3WithProvider();

    return () => {
      cancelled = true;
    };
  }, [connected]);

  useEffect(() => {
    const init = async () => {
      try {
        const accounts = await ethereum.request({ method: "eth_accounts" });
        if (accounts.length > 0 && ethereum.isConnected()) {
          setAccount(accounts[0]);
        }
      } catch (error) {
        console.error(error);
        // toast.error(error.message);
      }
    };

    init();
  }, [connected]);
  useEffect(() => {
    if (web3) {
      var instance = new web3.eth.Contract(
        NoFakeFactory.abi,
        "0x4424D189A9e91c0b8290e14850f3123fC258F8ed" //deployed factory code
      );
      console.log(instance);
      setNoFakeInstance(instance);
    }
  }, [web3]);

  return (
    <Web3Context.Provider
      value={{
        web3,
        doneCheckingForMetaMask,
        connected,
        connecting,
        isGoerliChain,
        setConnected,
        setConnecting,
        setDoneCheckingForMetaMask,
        setIsGoerliChain,
        setWeb3,
        account,
        setAccount,
        noFakeInstance,
        user,
        setUser,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => useContext(Web3Context);
