/* eslint-disable import/no-extraneous-dependencies */
import { query } from "./resolvers";
import { manifest, Query, Oracle_PriceData } from "./w3";

import {
  Client,
  Plugin,
  PluginPackageManifest,
  PluginFactory,
} from "@web3api/core-js";
import { ethers, BigNumber } from "ethers";

export class OraclePlugin extends Plugin {
  public static manifest(): PluginPackageManifest {
    return manifest;
  }

  public getModules(_client: Client): {
    query: Query.Module;
  } {
    return {
      query: query(this),
    };
  }

  public async getPrice(
    alchemyKey: string,
    tokenA: string,
    tokenB: string
  ): Promise<Oracle_PriceData> {
    const oracleAddress = this.getOracleAddress(tokenA, tokenB);
    const alchemyRpcUrl = `https://eth-mainnet.alchemyapi.io/v2/${alchemyKey}`;
    const provider = new ethers.providers.JsonRpcProvider(alchemyRpcUrl);

    if (!oracleAddress)
      return {
        price: ethers.BigNumber.from("0").toString(),
        decimals: ethers.BigNumber.from("0").toString(),
      };

    const oracleContract = this.getOracleContract(provider, oracleAddress);

    const { answer: price } = await oracleContract.latestRoundData();

    const decimals = this.getDecimals(tokenA, tokenB).toString();

    return { price, decimals };
  }

  private getOracleAddress(tokenA: string, tokenB: string): string | null {
    // X / ETH
    if (tokenB == "ETH") {
      switch (tokenA) {
        case "MKR":
          return "0x24551a8Fb2A7211A25a17B1481f043A8a8adC7f2";
        case "UNI":
          return "0xD6aA3D25116d8dA79Ea0246c4826EB951872e02e";
        case "PAX":
          return "0x3a08ebBaB125224b7b6474384Ee39fBb247D2200";
        case "YFI":
          return "0x7c5d4F8345e66f68099581Db340cd65B078C41f4";
        case "MKR":
          return "0x24551a8Fb2A7211A25a17B1481f043A8a8adC7f2";
        case "OCEAN":
          return "0x9b0FC4bb9981e5333689d69BdBF66351B9861E62";
        case "SUSHI":
          return "0xe572CeF69f43c2E488b33924AF04BDacE19079cf";
      }
    }
    // X / USD
    if (tokenB == "USD") {
      switch (tokenA) {
        case "BTC":
          return "0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c";
        case "BAL":
          return "0xdF2917806E30300537aEB49A7663062F4d1F2b5F";
        case "AAVE":
          return "0x547a514d5e3769680Ce22B2361c10Ea13619e8a9";
        case "1INCH":
          return "0xc929ad75B72593967DE83E7F7Cda0493458261D9";
      }
    }

    return null;
  }

  private getOracleContract(
    provider: ethers.providers.JsonRpcProvider,
    oracleAddress: string
  ): ethers.Contract {
    const oracleAbi = [
      {
        inputs: [],
        name: "latestRoundData",
        outputs: [
          { internalType: "uint80", name: "roundId", type: "uint80" },
          { internalType: "int256", name: "answer", type: "int256" },
          { internalType: "uint256", name: "startedAt", type: "uint256" },
          { internalType: "uint256", name: "updatedAt", type: "uint256" },
          { internalType: "uint80", name: "answeredInRound", type: "uint80" },
        ],
        stateMutability: "view",
        type: "function",
      },
    ];

    return new ethers.Contract(oracleAddress, oracleAbi, provider);
  }

  private getDecimals(tokenA: string, tokenB: string): BigNumber {
    if (tokenB == "USD") return ethers.BigNumber.from("8");
    if (tokenB == "ETH") return ethers.BigNumber.from("18");
    return ethers.BigNumber.from("0");
  }
}

export const oraclePlugin: PluginFactory<{}> = () => {
  return {
    factory: () => new OraclePlugin(),
    manifest: manifest,
  };
};
export const plugin = oraclePlugin;
