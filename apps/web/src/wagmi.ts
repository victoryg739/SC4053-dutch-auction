import { configureChains, createConfig, sepolia } from "wagmi";
import { localhost, mainnet } from "wagmi/chains";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

// configure supported chains based on environment variables and context
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    mainnet,
    // add Sepolia testnet only if Alchemy API key is available
    ...(process.env.NEXT_PUBLIC_ALCHEMY_API_KEY ? [sepolia] : []),
    // include localhost chain only in development mode
    ...(process.env.NODE_ENV === "development" ? [localhost] : []),
  ],
  process.env.NEXT_PUBLIC_ALCHEMY_API_KEY
    ? [
        // Use Alchemy provider only when API key is specified
        alchemyProvider({
          apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
        }),
        publicProvider(),
      ]
    : [publicProvider()],
);

// Configuration settings for application with MetaMask connection
export const config = createConfig({
  autoConnect: true,
  connectors: [new MetaMaskConnector({ chains })],
  publicClient,
  webSocketPublicClient,
});
