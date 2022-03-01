export const schema: string = `### Web3API Header START ###
scalar UInt
scalar UInt8
scalar UInt16
scalar UInt32
scalar Int
scalar Int8
scalar Int16
scalar Int32
scalar Bytes
scalar BigInt
scalar JSON

directive @imported(
  uri: String!
  namespace: String!
  nativeType: String!
) on OBJECT | ENUM

directive @imports(
  types: [String!]!
) on OBJECT

directive @capability(
  type: String!
  uri: String!
  namespace: String!
) repeatable on OBJECT

directive @enabled_interface on OBJECT
### Web3API Header END ###

type Query implements Oracle_Query @imports(
  types: [
    "Ethereum_Connection",
    "Oracle_Query",
    "Oracle_PriceData"
  ]
) {
  getPrice(
    alchemyKey: String!
    tokenA: String!
    tokenB: String!
  ): Oracle_PriceData!
}

### Imported Queries START ###

type Oracle_Query @imported(
  uri: "ens/oracle.eth",
  namespace: "Oracle",
  nativeType: "Query"
) {
  getPrice(
    alchemyKey: String!
    tokenA: String!
    tokenB: String!
  ): Oracle_PriceData!
}

### Imported Queries END ###

### Imported Objects START ###

type Ethereum_Connection @imported(
  uri: "ens/ethereum.web3api.eth",
  namespace: "Ethereum",
  nativeType: "Connection"
) {
  node: String
  networkNameOrChainId: String
}

type Oracle_PriceData @imported(
  uri: "ens/oracle.eth",
  namespace: "Oracle",
  nativeType: "PriceData"
) {
  price: BigInt!
  decimals: BigInt!
}

### Imported Objects END ###
`;
