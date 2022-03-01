import { OraclePlugin } from "./";
import { Query, Oracle_PriceData } from "./w3";

export const query = (plugin: OraclePlugin): Query.Module => ({
  getPrice: async (input: Query.Input_getPrice): Promise<Oracle_PriceData> => {
    return await plugin.getPrice(input.alchemyKey, input.tokenA, input.tokenB);
  },
});
