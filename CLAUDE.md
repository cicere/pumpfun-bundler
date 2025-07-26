# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Pump.Fun Bundler application built in TypeScript/Node.js for Solana blockchain interactions. The application enables token bundling operations on the Pump.Fun platform with advanced features for profile creation, anti-sniper protection, and sophisticated trading strategies.

## Key Commands

### Development & Running
- `npm run start` - Start the application (main entry point)
- `npm install` - Install dependencies

### TypeScript Compilation
- Use `ts-node` for direct TypeScript execution (configured in start script)
- The project uses TypeScript with standard configuration (`tsconfig.json`)

## Architecture Overview

### Main Application Structure
- **Entry Point**: `main.ts` - CLI menu system with 5 main options
- **Core Modules**:
  - `src/createKeys.ts` - Keypair generation and management
  - `src/senderUI.ts` - Pre-launch checklist and wallet operations (LUT creation, funding, simulation)
  - `src/jitoPool.ts` - Pool bundling operations using Jito
  - `src/sellFunc.ts` - Pump.Fun selling strategies
  - `src/sellRay.ts` - Raydium selling strategies

### Key Architecture Components

#### Configuration System
- **Primary Config**: `config.ts` - Contains hardcoded wallet keypairs, RPC endpoints, and Solana program addresses
- **Environment Config**: Uses `.env` file for sensitive keys and settings
- **Metadata Config**: `metadata.json` for token metadata
- **Smart Selling Config**: `smart-config.json` for automated selling parameters

#### Client Architecture
- **Jito Integration**: `src/clients/jito.ts` - Jito block engine client for MEV protection
- **Lookup Tables**: `src/clients/LookupTableProvider.ts` - Address lookup table management
- **Pool Management**: `src/clients/poolKeysReassigned.ts` - Raydium pool key handling

#### Transaction Management
- Uses Solana's Versioned Transactions with Address Lookup Tables (LUT)
- Implements transaction bundling through Jito for front-running protection
- Supports chunked transaction processing (typically 24-45 instructions per transaction)

#### Wallet System
- Supports up to 20 sub-wallets stored in `src/keypairs/` directory
- Uses `keyInfo.json` to track wallet configurations and buy amounts
- Implements SOL distribution and token consolidation across multiple wallets

### Core Functionality Patterns

#### Bundle Operations
1. **Wallet Generation** - Creates keypairs and stores them locally
2. **LUT Setup** - Creates and extends Address Lookup Tables for efficient transactions  
3. **Funding** - Distributes SOL from funder wallet to sub-wallets
4. **Buy Simulation** - Calculates token acquisition and supply percentages
5. **Bundle Execution** - Simultaneous token purchases across multiple wallets
6. **Selling Strategies** - Various selling modes (dump, delay, percentage-based, smart selling)

#### Anti-MEV Protection
- Uses Jito bundles to prevent front-running
- Implements lookup tables to reduce transaction size and cost
- Supports strategic timing and distribution patterns

## Important Files & Directories

### Configuration Files
- `.env` - Environment variables (not tracked in git)
- `config.ts` - Main configuration with wallet keys and endpoints
- `metadata.json` - Token metadata for launches
- `smart-config.json` - Smart selling configuration
- `whitelist.txt` - Wallets excluded from smart selling triggers

### Key Data Files
- `src/keyInfo.json` - Wallet configuration and buy amounts
- `src/keypairs/` - Directory storing generated wallet keypairs
- `pumpfun-IDL.json` - Pump.Fun program interface definition
- `blockengine.json` - Jito block engine configuration

### Source Structure
- `src/createKeys.ts` - Keypair generation utilities
- `src/createLUT.ts` - Lookup table creation and management
- `src/senderUI.ts` - Wallet management and pre-launch operations
- `src/jitoPool.ts` - Main bundling logic for token launches
- `src/sellFunc.ts` - Pump.Fun selling strategies
- `src/sellRay.ts` - Raydium/DEX selling strategies

## Key Dependencies

### Solana Ecosystem
- `@solana/web3.js` - Core Solana SDK
- `@solana/spl-token` - SPL token operations
- `jito-ts` - Jito block engine integration
- `@raydium-io/raydium-sdk` - Raydium DEX integration

### Anchor Framework
- `@coral-xyz/anchor` and `@project-serum/anchor` - Solana program interaction
- Custom IDL for Pump.Fun program interactions

### Utilities
- `bs58` - Base58 encoding/decoding for Solana addresses
- `bn.js` - Big number handling for precise calculations
- `prompt-sync` - CLI user input handling

## Development Notes

### Testing & Simulation
- The application includes extensive simulation modes for testing buy strategies
- Use option 2 (Pre Launch Checklist) -> option 3 (Simulate Buys) to test scenarios
- Always simulate before executing real transactions

### Transaction Safety
- All transactions use versioned transactions with lookup tables
- Implements retry mechanisms and error handling
- Includes transaction size validation (must be < 1232 bytes)

### MEV Protection Strategy
- Primary protection through Jito bundle submission
- Secondary protection via lookup tables reducing transaction predictability
- Strategic timing variations in staggered operations

## Common Workflows

### Token Launch Workflow
1. Generate keypairs (main menu option 1)
2. Set up LUT and fund wallets (main menu option 2)
3. Simulate and configure buy amounts (pre-launch checklist)
4. Execute bundle launch (main menu option 3)
5. Monitor and execute selling strategy (main menu options 4/5)

### Development Setup
1. Configure `.env` file with wallet keys and RPC endpoints
2. Set up `metadata.json` for token information
3. Run `npm install` to install dependencies
4. Use `npm run start` to launch the CLI interface

## Security Considerations

- Private keys are stored in configuration files - ensure proper file permissions
- The application handles significant SOL amounts - always test with small amounts first
- RPC endpoints should be reliable and preferably private for best performance
- Jito tips should be configured appropriately for network conditions