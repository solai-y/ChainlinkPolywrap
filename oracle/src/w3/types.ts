// @ts-noCheck
import * as Types from "./";

import {
  Client,
  InvokeApiResult
} from "@web3api/core-js";

export type UInt = number;
export type UInt8 = number;
export type UInt16 = number;
export type UInt32 = number;
export type Int = number;
export type Int8 = number;
export type Int16 = number;
export type Int32 = number;
export type Bytes = Uint8Array;
export type BigInt = string;
export type Json = string;
export type String = string;
export type Boolean = boolean;

/// Imported Objects START ///

/* URI: "ens/ethereum.web3api.eth" */
export interface Ethereum_Connection {
  node?: String | null;
  networkNameOrChainId?: String | null;
}

/* URI: "ens/oracle.eth" */
export interface Oracle_PriceData {
  price: BigInt;
  decimals: BigInt;
}

/// Imported Objects END ///

/// Imported Queries START ///

/* URI: "ens/oracle.eth" */
interface Oracle_Query_Input_getPrice extends Record<string, unknown> {
  alchemyKey: String;
  tokenA: String;
  tokenB: String;
}

/* URI: "ens/oracle.eth" */
export const Oracle_Query = {
  getPrice: async (
    input: Oracle_Query_Input_getPrice,
    client: Client
  ): Promise<InvokeApiResult<Types.Oracle_PriceData>> => {
    return client.invoke<Types.Oracle_PriceData>({
      uri: "ens/oracle.eth",
      module: "query",
      method: "getPrice",
      input
    });
  }
}

/// Imported Queries END ///
