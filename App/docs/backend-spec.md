# Pump.Fun Bundler - Backend Technical Specification

## Architecture Overview

The backend is a TypeScript-based Node.js application that leverages the Solana blockchain ecosystem to create, manage, and execute token launch bundles on Pump.Fun with advanced anti-detection and optimization features.

## Core Dependencies

### Blockchain & Token Infrastructure
```json
{
  "@solana/web3.js": "^1.87.6",          // Solana blockchain interactions
  "@solana/spl-token": "^0.3.9",         // SPL token operations
  "@coral-xyz/anchor": "^0.29.0",        // Solana program framework
  "@raydium-io/raydium-sdk": "^1.3.1-beta.47", // Raydium DEX integration
  "jito-ts": "^3.0.1",                   // Jito bundle execution
  "bs58": "^5.0.0"                       // Base58 encoding
}
```

### Development & Utilities
```json
{
  "typescript": "^5.3.3",                // Type safety
  "prompt-sync": "^4.2.0",              // CLI input handling
  "axios": "^1.6.8",                    // HTTP client
  "bn.js": "^5.2.1"                     // Big number operations
}
```

## Module Architecture

### 1. Configuration Layer (`config.ts`)

**Purpose**: Central configuration management for blockchain connections and program addresses.

```typescript
// Core exports
export const wallet: Keypair;           // Deployer wallet
export const payer: Keypair;            // Fee payer wallet
export const connection: Connection;     // Solana RPC connection
export const rpc: string;              // RPC endpoint URL

// Program addresses
export const PUMP_PROGRAM: PublicKey;   // Pump.Fun program ID
export const RayLiqPoolv4: PublicKey;   // Raydium v4 pool program
export const global: PublicKey;         // Global account
export const mintAuthority: PublicKey;  // Mint authority
```

**Key Features**:
- Separation of deployer and fee payer roles
- Configurable RPC endpoints
- Hardcoded program addresses for reliability
- Environment-based configuration loading

### 2. Keypair Management (`src/createKeys.ts`)

**Purpose**: Comprehensive wallet generation and management system.

```typescript
interface IPoolInfo {
  [key: string]: any;
  numOfWallets?: number;
}

// Core functions
export async function createKeypairs(): Promise<void>;
export function loadKeypairs(): Keypair[];
```

**Features**:
- Generates exactly 24 buyer keypairs
- Saves keypairs as JSON files in `src/keypairs/` directory
- Manages pool information in `keyInfo.json`
- Supports existing keypair loading
- Regex-based keypair file validation

**File Structure**:
```
src/
├── keypairs/
│   ├── keypair1.json
│   ├── keypair2.json
│   └── ...keypair24.json
└── keyInfo.json              // Pool metadata and wallet info
```

### 3. Address Lookup Table Management (`src/createLUT.ts`)

**Purpose**: Optimizes transaction costs through custom LUT implementation.

```typescript
export async function createLUT(): Promise<void>;
export async function extendLUT(): Promise<void>;
```

**Technical Implementation**:
- Creates new LUT for each token launch
- Extends LUT with all relevant addresses (mint, ATAs, program accounts)
- Chunks addresses into groups of 30 for transaction limits
- Integrates vanity address support
- Uses custom LookupTableProvider for optimization

**Address Categories**:
- Program addresses (Pump.Fun, SPL Token, Metadata)
- Mint and associated token accounts
- User wallet public keys and ATAs
- System program accounts

### 4. Bundle Creation Engine (`src/jitoPool.ts`)

**Purpose**: Core token launch and bundling functionality.

```typescript
export async function buyBundle(): Promise<void>;
export async function sendBundle(bundledTxns: VersionedTransaction[]): Promise<void>;
```

**Launch Process**:
1. **Metadata Upload**: Uploads token image and metadata to IPFS via Pump.Fun API
2. **Token Creation**: Creates SPL token mint with Pump.Fun program
3. **Developer Buy**: Executes initial developer purchase
4. **Buyer Coordination**: Creates chunked buyer transactions (6 wallets per chunk)
5. **Bundle Submission**: Submits all transactions as Jito bundle

**Transaction Structure**:
- Uses VersionedTransaction with Address Lookup Tables
- Implements proper instruction chunking
- Includes Jito tip transactions
- Supports transaction simulation (disabled by default)

### 5. Pre-Launch Management (`src/senderUI.ts`)

**Purpose**: Comprehensive pre-launch setup and wallet management.

```typescript
interface Buy {
  pubkey: PublicKey;
  solAmount: Number;
  tokenAmount: BN;
  percentSupply: number;
}

export async function sender(): Promise<void>;
```

**Menu Options**:
1. **Create LUT**: Initialize lookup table
2. **Extend LUT Bundle**: Add addresses to existing LUT
3. **Simulate Buys**: Calculate and validate buy amounts
4. **Send Simulation SOL Bundle**: Distribute SOL to buyer wallets
5. **Reclaim Buyers Sol**: Return unused SOL from wallets

**SOL Distribution Logic**:
- Calculates required SOL per wallet (buy amount + fees + buffer)
- Adds 1.5% buffer for transaction fees
- Implements chunked transfer processing
- Includes Jito tip distribution

### 6. Selling Functions (`src/sellFunc.ts`, `src/sellRay.ts`)

#### Pump.Fun Selling (`sellFunc.ts`)
```typescript
export async function sellXPercentagePF(): Promise<void>;
```
- Percentage-based token selling on Pump.Fun
- Uses bonding curve for price calculations
- Transfers tokens to fee payer before selling
- Implements chunked selling for multiple wallets

#### Raydium Selling (`sellRay.ts`)
```typescript
export async function sellXPercentageRAY(): Promise<void>;
```
- Post-graduation selling on Raydium DEX
- Requires manual market ID input
- Derives pool keys from market information
- Implements AMM swap instructions

### 7. Client Services (`src/clients/`)

#### Jito Integration (`clients/jito.ts`)
```typescript
export const searcherClient: SearcherClient;
export const privateKey: Keypair;
```
- Manages Jito block engine connections
- Handles bundle submission and status tracking
- Implements multiple region support
- Provides geyser client for real-time data

#### Configuration Management (`clients/config.ts`)
```typescript
export function getRandomTipAccount(): PublicKey;
```
- Manages Jito tip accounts with rotation
- Provides configuration validation
- Handles environment variable processing

#### Pool Key Derivation (`clients/poolKeysReassigned.ts`)
```typescript
export async function derivePoolKeys(marketId: PublicKey): Promise<IPoolKeys>;
export interface IPoolKeys { /* Comprehensive pool structure */ }
```
- Derives all necessary Raydium pool addresses
- Fetches market information from on-chain data
- Calculates associated token accounts
- Implements SPL token layout parsing

#### Lookup Table Provider (`clients/LookupTableProvider.ts`)
```typescript
class LookupTableProvider {
  computeIdealLookupTablesForAddresses(addresses: PublicKey[]): AddressLookupTableAccount[];
}
```
- Caches lookup table accounts
- Computes optimal LUT usage for address sets
- Manages address-to-LUT mappings
- Provides fast lookup table retrieval

## Data Flow Architecture

### 1. Launch Preparation Flow
```
User Input → Keypair Generation → LUT Creation → LUT Extension → SOL Distribution
```

### 2. Token Launch Flow
```
Metadata Upload → Token Creation → Bundle Assembly → Jito Submission → Status Monitoring
```

### 3. Selling Flow
```
Wallet Enumeration → Token Transfer → Sell Instructions → Bundle Execution
```

## Key Technical Innovations

### 1. Custom Address Lookup Tables
- **Problem**: High transaction costs for multi-wallet operations
- **Solution**: Pre-computed LUT with all relevant addresses
- **Result**: ~80% reduction in transaction overhead

### 2. Chunked Transaction Processing
- **Problem**: Solana transaction size limits
- **Solution**: Intelligent instruction chunking (6-45 instructions per transaction)
- **Result**: Reliable execution of large bundle operations

### 3. Jito Integration
- **Problem**: MEV attacks and front-running
- **Solution**: Private mempool submission via Jito bundles
- **Result**: Protected launches with guaranteed execution order

### 4. Profile Simulation
- **Problem**: Obvious bot detection on launches
- **Solution**: Varied buy amounts and wallet behavior patterns
- **Result**: Natural-looking wallet activity

## Error Handling & Resilience

### Transaction Simulation
```typescript
// Disabled by default but available for debugging
const simulationResult = await connection.simulateTransaction(tx);
```

### Bundle Status Monitoring
```typescript
searcherClient.onBundleResult((result) => {
  console.log('Bundle result:', result);
});
```

### Retry Mechanisms
- Automatic retry for failed RPC calls
- Bundle resubmission on timeout
- Intelligent error categorization

## Performance Optimizations

### 1. Connection Management
- Persistent RPC connections
- Configurable request rate limiting
- Efficient batch processing

### 2. Memory Management
- Streaming transaction creation
- Efficient keypair loading
- Garbage collection optimization

### 3. Network Efficiency
- Minimal RPC calls through LUT usage
- Batched account info fetching
- Compressed transaction serialization

## Security Features

### 1. Private Key Protection
- Local file-based storage
- Base58 encoding
- Separation of concerns (deployer vs payer)

### 2. Transaction Validation
- Pre-submission simulation capability
- Size limit enforcement
- Instruction count validation

### 3. Tip Account Rotation
- Random selection from 8 predefined accounts
- Prevents tip concentration
- Maintains bundle submission reliability

## Configuration Schema

### Environment Variables
```typescript
{
  RPC_URL: string;              // Solana RPC endpoint
  BLOCK_ENGINE_URLS: string[]; // Jito block engine URLs
  AUTH_KEYPAIR_PATH: string;   // Jito auth keypair file
  GEYSER_URL: string;          // Jito geyser endpoint
  GEYSER_ACCESS_TOKEN: string; // Geyser access token
}
```

### Runtime Configuration
```typescript
{
  jitoTipAmount: number;       // Tip in SOL
  buyAmounts: number[];        // Per-wallet buy amounts
  sellPercentage: number;      // Percentage to sell
  chunkSize: number;           // Transactions per chunk
}
```

## Testing & Validation

### Simulation Capabilities
- Full transaction simulation before execution
- Bundle validation and size checking
- Account state verification

### Monitoring Tools
- Real-time bundle status tracking
- Transaction success rate monitoring
- Performance metrics collection

## Future Enhancement Areas

### 1. Performance Improvements
- Parallel transaction creation
- Advanced LUT optimization
- Dynamic chunk size calculation

### 2. Feature Additions
- Multi-token launch support
- Advanced selling strategies
- Real-time market analysis

### 3. Security Enhancements
- Hardware wallet integration
- Enhanced key management
- Audit trail implementation
