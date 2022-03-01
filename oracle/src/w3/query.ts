// @ts-noCheck
import {
  UInt,
  UInt8,
  UInt16,
  UInt32,
  Int,
  Int8,
  Int16,
  Int32,
  Bytes,
  BigInt,
  Json,
  String,
  Boolean
} from "./types";
import * as Types from "./types";

import {
  Client,
  PluginModule,
  MaybeAsync
} from "@web3api/core-js";

export interface Input_getPrice extends Record<string, unknown> {
  alchemyKey: String;
  tokenA: String;
  tokenB: String;
}

export interface Module extends PluginModule {
  getPrice(
    input: Input_getPrice,
    client: Client
  ): MaybeAsync<Types.Oracle_PriceData>;
}
