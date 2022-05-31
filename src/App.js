import logo from './logo.svg';
import './App.css';
import { ethers } from "ethers";

const tokenJson = [
  {
    constant: true,
    inputs: [],
    name: "name",
    outputs: [
      {
        name: "",
        type: "string",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "_spender",
        type: "address",
      },
      {
        name: "_value",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "_from",
        type: "address",
      },
      {
        name: "_to",
        type: "address",
      },
      {
        name: "_value",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [
      {
        name: "",
        type: "uint8",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "_owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        name: "balance",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [
      {
        name: "",
        type: "string",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "_to",
        type: "address",
      },
      {
        name: "_value",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "_owner",
        type: "address",
      },
      {
        name: "_spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    payable: true,
    stateMutability: "payable",
    type: "fallback",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
];

function App() {
  const providerUrl = "https://rpc.api.moonbase.moonbeam.network/";
  const provider = new ethers.providers.StaticJsonRpcProvider(providerUrl, {
    chainId: 1287,
    name: "moonbase-alphanet",
  });
  const metamask = new ethers.providers.Web3Provider(window.ethereum)
  const signer = metamask.getSigner();
  const contract = new ethers.Contract(
    "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    tokenJson,
    signer,
  )

  const changeNetwork = async () => {
    await window.ethereum.request({
      method:"wallet_addEthereumChain",
      params: [{
          chainId: "0x507",
          rpcUrls: ["https://rpc.api.moonbase.moonbeam.network/"],
          chainName: "moonbase-alphanet",
          nativeCurrency: {
              name: "GMLR",
              symbol: "GMLR",
              decimals: 18
          },
          blockExplorerUrls: ["https://moonbase-blockscout.testnet.moonbeam.network/"]
      }]
    });
  }

  const mintNft = async ()=>{
    console.log(metamask);
    if (metamask._network.chainId !== provider.chainId) {
      console.log("Wrong network!");
      await changeNetwork();
    }
    // console.log(contract);
    const tokenWithSigner = contract.connect(signer);
    var tx = tokenWithSigner.transfer("0x6B175474E89094C44Da98b954EedeAC495271d0F", 1);
    console.log(tx);
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={mintNft}>Send</button>
      </header>
    </div>
  );
}

export default App;
