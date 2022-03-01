import { Web3ApiClient } from "@web3api/client-js";
import { ethers } from "ethers";
import { oraclePlugin } from "../";
import { Oracle_PriceData } from "../w3";

require("dotenv").config();
const ALCHEMYKEY = process.env.ALCHEMYKEY;

describe("e2e", () => {
  let client: Web3ApiClient;
  const uri = "ens/oracle.eth";

  beforeAll(() => {
    client = new Web3ApiClient({
      plugins: [
        {
          uri: uri,
          plugin: oraclePlugin({}),
        },
      ],
    });
  });

  it("get BTC/USD", async () => {
    const oracleResult = await client.invoke({
      uri,
      module: "query",
      method: "getPrice",
      input: {
        alchemyKey: ALCHEMYKEY,
        tokenA: "BTC",
        tokenB: "USD",
      },
    });

    const priceData = oracleResult.data as Oracle_PriceData;
    expect(Number(priceData.decimals)).toBe(8);
    expect(Number(priceData.price)).toBeGreaterThan(40000); // Dont dump ples

    const btcPrice = ethers.BigNumber.from(priceData.price).div(
      ethers.BigNumber.from("10").pow(priceData.decimals)
    );

    console.log("BTC/USD : $", btcPrice.toString());
  });

  it("get UNI/ETH", async () => {
    const oracleResult = await client.invoke({
      uri,
      module: "query",
      method: "getPrice",
      input: {
        alchemyKey: ALCHEMYKEY,
        tokenA: "UNI",
        tokenB: "ETH",
      },
    });

    const priceData = oracleResult.data as Oracle_PriceData;
    expect(Number(priceData.decimals)).toBe(18);

    console.log("UNI/ETH : ", priceData.price.toString(), "1e-18");
  });
});
