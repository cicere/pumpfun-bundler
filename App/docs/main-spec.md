# Pump.Fun Bundler - Main Specification

## Project Overview

The Pump.Fun Bundler is an advanced, open-source solution for efficient token bundling on the Pump.Fun platform with sophisticated profile creation and anti-bubble map features. It provides creators with tools to launch tokens while avoiding common pitfalls like sniper attacks and MEV front-running.

## TECHNOLOGY STACK

### Backend:
- **Runtime**: Node.js with TypeScript
- **Blockchain**: Solana Web3.js
- **Token Standards**: SPL Token Program
- **DEX Integration**: Pump.Fun Protocol, Raydium SDK
- **Bundle Processing**: Jito Block Engine
- **Anchor Framework**: For Solana program interactions
- **Key Dependencies**:
  - `@solana/web3.js` - Solana blockchain interactions
  - `@solana/spl-token` - SPL token operations
  - `@coral-xyz/anchor` - Solana program framework
  - `@raydium-io/raydium-sdk` - Raydium DEX integration
  - `jito-ts` - Jito bundle submission
  - `bs58` - Base58 encoding/decoding
  - `axios` - HTTP client for API calls

### Frontend:
- **Status**: Not implemented (CLI-based interface)
- **Interface**: Command-line interface with interactive prompts
- **User Experience**: Menu-driven navigation system

## Core Architecture

### Application Structure
```
App/
├── backend/                 # Main application logic
│   ├── src/                # Source code
│   │   ├── clients/        # External service clients
│   │   └── *.ts           # Core modules
│   ├── config.ts          # Global configuration
│   ├── main.ts            # Application entry point
│   └── package.json       # Dependencies
└── docs/                  # Documentation
```

## Main Application Flow

### 1. Entry Point (`main.ts`)
The application provides a menu-driven interface with 5 core functions:
1. **Create Keypairs** - Generate or load buyer wallets
2. **Pre Launch Checklist** - Setup and validation tools
3. **Create Pool Bundle** - Execute token launch bundle
4. **Sell % on Pump.Fun** - Partial selling on Pump.Fun
5. **Sell % on Raydium** - Partial selling on Raydium DEX

### 2. Core Modules

#### Keypair Management (`createKeys.ts`)
- Generates up to 24 buyer keypairs
- Saves keypairs to local JSON files
- Manages keypair loading and validation
- Updates pool information with wallet details

#### Bundle Creation (`jitoPool.ts`)
- Creates token launch bundles
- Handles metadata upload to IPFS
- Manages Pump.Fun pool initialization
- Coordinates multi-wallet buy transactions
- Implements Jito bundle submission

#### Lookup Table Management (`createLUT.ts`)
- Creates and extends Address Lookup Tables (LUT)
- Optimizes transaction size and costs
- Manages on-chain address references
- Enables efficient multi-wallet operations

#### Sender Interface (`senderUI.ts`)
- Provides pre-launch setup tools
- Manages SOL distribution to wallets
- Handles buy simulation and configuration
- Implements wallet return functionality

#### Selling Functions (`sellFunc.ts`, `sellRay.ts`)
- Enables partial token selling
- Supports both Pump.Fun and Raydium
- Manages token transfer and swap operations
- Implements percentage-based selling logic

## Key Features

### 1. Multi-Wallet Bundling
- Supports up to 24 buyer wallets
- Coordinated transaction execution
- Optimized bundle submission via Jito

### 2. Address Lookup Table (LUT) Optimization
- Custom LUT implementation for cost efficiency
- Reduces transaction overhead by ~80%
- Persistent on-chain structure for wallet reuse

### 3. Profile Generation
- Creates authentic-looking wallet profiles
- Randomized usernames and transaction patterns
- Diverse token holding histories
- Anti-detection measures

### 4. Bundle Management
- Jito integration for MEV protection
- Bundle simulation and validation
- Automatic retry mechanisms
- Real-time bundle status tracking

### 5. Market Integration
- Native Pump.Fun protocol support
- Raydium DEX integration for post-graduation
- Automated pool creation and management
- Market data fetching and analysis

## Configuration Management

### Environment Variables
- RPC endpoint configuration
- Private key management (deployer/fee payer)
- Jito tip account rotation
- Block engine URL configuration

### Runtime Configuration
- Token metadata (name, symbol, description)
- Social media links (Twitter, Telegram, Website)
- Buy amounts and distribution strategies
- Tip amounts and fee structures

## Security Considerations

### Private Key Management
- Local keypair storage in JSON format
- Base58 encoded private keys
- Separation of deployer and fee payer roles
- Warning systems for key overwrites

### Transaction Security
- Bundle simulation before submission
- Error handling and retry logic
- Tip account randomization
- Transaction size validation

## Performance Characteristics

### Transaction Success Rate
- >99.7% success rate in real-world testing
- Sub-500ms execution times for bundles
- Intelligent retry mechanisms for edge cases

### Scalability
- Chunk-based transaction processing
- Configurable batch sizes (6-45 instructions)
- Memory-efficient bundle creation
- Optimized RPC usage patterns

## Future Roadmap

### Planned Enhancements
1. **Frontend Development** - Web-based interface
2. **Advanced Analytics** - Real-time market analysis
3. **Enhanced Profiles** - More sophisticated profile generation
4. **Multi-Chain Support** - Expansion beyond Solana
5. **API Integration** - RESTful API for external tools