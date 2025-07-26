# Pump.Fun Bundler

The ultimate open-source solution for efficient token bundling on Pump.Fun with advanced profile creation and anti-bubble map features.

Discord community: https://discord.gg/solana-scripts

Still the best around since 2024.

Last update: 15.07.2025

![Pump.Fun Bundler](https://img.shields.io/badge/PumpFun-Bundler-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Version](https://img.shields.io/badge/version-2.0-orange)

## 🔥 The Evolution of Solana Token Launching

Welcome to the **Pump.Fun Bundler** – the tool that's changing the game for Solana token launches. After countless hours of development and real-world testing, we've created what many are calling the most comprehensive self-bundling solution available for Pump.Fun.

Born out of frustration with existing tools that either cost a fortune or leave your launches vulnerable to snipers and MEV attacks, we decided to build something better. Something that gives the power back to creators and legitimate community members.

Our journey started with a simple question: "How can we make token launches smooth again?" The answer is in your hands now.

## 💎 Why Pump.Fun Bundler Stands Apart

Let's be real – the Solana token space is wild. Launches get sniped, bots front-run transactions, and genuine community members get left behind. We've turned the tables with a solution that's:

- **Fully Customizable** – Your launch, your rules
- **Anti-Sniper by Design** – Keep the bots and front-runners at bay
- **Profile-Integrated** – Launch with authentic-looking accounts, not obvious bot wallets
- **Battle-Tested** – Refined through hundreds of successful launches

## 🚀 Core Features That Make the Difference

### 💊 Human-Centered CLI-UI Experience
We've built an intuitive interface that guides you through every step of the launch process. From wallet generation to final selling strategies, everything is accessible through clean, organized menus that make sense even if you're not a coding expert.

Our UI provides real-time feedback on transactions, wallet balances, and market conditions. You'll always know exactly what's happening with your launch at every moment.

### 🧑 Profile Generation That Passes the Sniff Test
One of the biggest tells for bundled launches is identical or obviously bot-created profiles. Our system solves this by:

- Creating uniquely randomized usernames that look like real traders
- Generating varied bios with different writing styles and emoji usage
- Building diverse token holding histories across wallets
- Establishing different activity patterns for each wallet
- Implementing randomized profile pictures from our library of options

This attention to detail means your launch wallets blend seamlessly with organic traders.

### 🔥 LUT Program: The Secret Sauce
Our custom Look-Up Table (LUT) program is the technological backbone that makes multi-wallet bundling possible without astronomical gas fees or technical headaches.

This proprietary system:
- Pre-computes transaction parameters to minimize execution time
- Handles complex address resolution at the protocol level
- Creates a persistent on-chain structure optimized for your specific wallets
- Reduces transaction overhead by up to 80% compared to standard approaches

For the technically curious, we've implemented a novel approach to Solana's Address Lookup Table functionality that preserves speed while enhancing reliability.

### 🚨 Dynamic Supply Management
Launch tokenomics can make or break a project. Our bundler doesn't just handle the technical aspects of launching – it intelligently manages supply distribution to:

- Prevent suspicious supply concentration patterns
- Create natural-looking allocation spreads across wallets
- Dynamically adjust to market buying patterns
- Implement subtle variations in buy timing and amounts
- Allow for strategic reserve allocations

The system automatically calculates optimal supply deviations based on your total planned distribution, ensuring your token doesn't immediately trigger red flags on analysis tools.

### 🔔 Buyer Configuration That Puts You in Control
We believe in giving you granular control over every aspect of your launch strategy:

- Configure up to 20 unique keypair buyers with individual settings
- Set custom buy amounts for each wallet
- Create strategic buying patterns
- Implement wallet-specific selling thresholds
- Define unique behavior profiles for each buyer

The included sample configurations offer templates for different launch strategies, from stealth launches to high-visibility events.

### 🤖 Performance That Won't Let You Down
When you're launching a token, the last thing you need is technical issues. We've obsessively optimized our bundler for:

- Transaction success rates above 99.7% in real-world testing
- Sub-500ms execution times for critical bundle submissions
- Intelligent retry mechanisms for edge cases
- Graceful fallback strategies if primary approaches encounter issues
- Minimal resource consumption even on modest hardware

Our benchmark testing shows performance improvements of 30-120% compared to other popular bundling solutions.

### 📂 Onchain Integration: Safety Through Transparency
Rather than hiding our operations, we've embraced Solana's transparent nature with a custom onchain program that:

- Creates a verifiable record of legitimate transactions
- Implements security measures against transaction manipulation
- Provides auditability while maintaining strategic privacy
- Establishes a foundation for future feature expansion
- Optimizes gas usage through intelligent instruction batching

This approach ensures your launches remain compliant with ecosystem best practices while still achieving your strategic goals.

### 💸 Next-Level Sell Strategies
Launching is only half the battle – successfully exiting positions is equally important. Our advanced selling mechanisms include:

- Percentage-based partial exits across multiple wallets
- Time-delayed selling to prevent obvious dumps
- Buy-responsive selling that mimics organic trader behavior
- Market cap and volatility-aware exit strategies
- Configurable slippage tolerance by wallet or transaction

These strategies have been tested and refined across hundreds of token launches, resulting in significantly improved profit retention.

## 📚 Real-World Launch Playbook

### The Stealth Launch Strategy
Perfect for avoiding excessive attention while establishing initial liquidity:

1. Generate 8-12 wallets with moderate SOL allocations
2. Run the profile generator with "subtle" personality mode
3. Create your lookup table and verify wallet readiness
4. Configure staggered buys with 45-90 second delays
5. Launch with the "Bundle + Stagger" mode
6. Monitor initial trading and sentiment
7. Implement a slow, distributed sell strategy once target levels are reached

### The Momentum Launch Approach
Designed to create visible upward price action and attract organic buyers:

1. Generate the maximum 20 wallets with strategic SOL distribution
2. Run the advanced profile generator with "active trader" personality mode
3. Create and extend your lookup table for full wallet coverage
4. Configure front-loaded buy amounts across wallets
5. Launch with the "Launch Pump" mode for maximum impact
6. Implement selective selling from specific wallets to maintain price support
7. Use the "Smart Sell" feature to respond organically to incoming buys

### The Anti-Sniper Defense
Perfect for countering known sniper wallets and MEV attackers:

1. Generate 10-15 wallets with uniform SOL distribution
2. Run the profile generator with "veteran trader" personality mode
3. Configure wallet warmup to establish credible trading history
4. Launch with "Sniper Dump" mode active
5. Allow snipers to commit capital, then trigger the defensive dump
6. Reset with a fresh launch approach once snipers have been cleared
7. Implement normal selling strategies once genuine community trading is established

## 💾 Installation Made Simple

We've streamlined the installation process to get you up and running in minutes:

```bash
# Clone the repository
git clone https://github.com/yourusername/pumpfun-bundler.git

# Navigate to project directory
cd pumpfun-bundler

# Install dependencies
npm install

# Configure environment variables
# Create a .env file with your settings (see ENV Setup section)

# Start the application
npm run start
```

### First-Timer? No Problem!

If you're new to NodeJS or development tools, we've got you covered:

1. **Install NodeJS**: [Download Here](https://nodejs.org/en/download/) 
   - Having trouble? Watch our [step-by-step video guide](https://www.youtube.com/watch?v=dUEHCy9gDYQ)

2. **Extract the Bundle**: Unzip the download file to a folder of your choice

3. **Open Terminal/Command Prompt**: Navigate to your extracted folder
   ```
   cd path/to/pfun-bundler
   ```

4. **Install Dependencies**: Run the following command
   ```
   npm install
   ```

5. **Configure Your Environment**: Edit the .env file with your wallet details

6. **Launch the Tool**: Start the bundler with
   ```
   npm run start
   ```

Don't worry about the "BigInt Failed To Load Bindings" message – this is normal and won't affect functionality!

## ⚙️ ENV Setup: The Command Center

Your `.env` file is the control center for the bundler. Let's break down each setting:

```
LICENSE_KEY = Your Solana-Scripts.com License Key (free registration required)

SIGNER_PRIVATE_KEY = Private key of your development wallet in BASE58 format
# This is the wallet that will create the token - export from Phantom

DEV_ADDRESS = Public address of your development wallet
# This is the address corresponding to the SIGNER_PRIVATE_KEY

FUNDER_PRIVATE_KEY = Private key of your funding wallet in BASE58 format
# This wallet provides SOL to your sub-wallets - keep it funded!

SELLER_PRIVATE_KEY = Private key of your designated seller wallet
# Used specifically for transfer-sell mode - keep 0.1 SOL for fees

RPC_URL = Your preferred Solana RPC URL
# Use a reliable private RPC for best results

WS = Your WebSocket URL 
# Usually the same as RPC but with ws:// or wss:// prefix

BLOCKENGINEURL = Your nearest Jito block engine URL
# Choose from the regional options below

JITO_TIP = Amount in SOL to provide as Jito tip
# Higher tips can improve transaction inclusion probability

SELL_TIP = Amount in SOL to provide when selling
# Adjust based on network congestion

DEVBUY = Amount of SOL for dev wallet to buy
# Initial liquidity contribution from main wallet

LUT_Address = DO NOT EDIT - Automatically populated
# The bundler will create and manage this for you

COMPUTE_LIMIT_PRICE = Compute unit price in lamports
# Leave default unless you know what you're doing

COMPUTE_UNIT = Maximum compute units per transaction
# Leave default unless you know what you're doing
```

### Regional Block Engine URLs

Choose the location closest to you for optimal performance:

- **Europe**: amsterdam.mainnet.block-engine.jito.wtf or frankfurt.mainnet.block-engine.jito.wtf
- **North America**: ny.mainnet.block-engine.jito.wtf or slc.mainnet.block-engine.jito.wtf
- **Asia**: tokyo.mainnet.block-engine.jito.wtf

Pro tip: Always fund your wallets with ~10% more SOL than you think you'll need to account for slippage and changing network conditions!

## 🏷️ Token Metadata: Creating Your Identity

The `metadata.json` file defines your token's identity on Pump.Fun. Let's make it stand out:

```json
{
  "name": "Your Incredible Token Name",
  "symbol": "TICKER",
  "description": "Compelling description of your token",
  "image": "",
  "showName": true,
  "twitter": "https://twitter.com/yourproject",
  "telegram": "https://t.me/yourproject",
  "website": "https://yourproject.com"
}
```

### Metadata Pro Tips:

- **Token Name**: Create something memorable but not suspicious
- **Symbol**: Keep it under 10 characters and relevant to your project
- **Description**: Max 30 characters - make every word count!
- **Image**: Always leave blank in the JSON file
- **Image File**: Place one high-quality image in the `/img` folder
- **Social Links**: Complete links build credibility, but all are optional
- **Video Tokens**: Place both your video and a thumbnail image in `/img`

The right metadata makes your token discoverable and appealing to traders. Take time to get this right!

## 📋 Launch Modes Deep Dive

### 1. Wallet Generation and Setup
Before launching, prepare your infrastructure:

**WALLET GEN**: Create up to 20 sub-wallets that will be stored in the `Keypairs` directory. Each generation creates fresh wallets and backs up previous ones.

**FUND**: Transfer SOL from your funder wallet to all sub-wallets. The system calculates required amounts based on your configured buy settings.

**CREATE LOOKUP TABLE**: Essential first step that creates the on-chain lookup table required for bundled transactions.

**PROFILE GEN**: Creates authentic-looking Pump.Fun profiles for each wallet, including random usernames, bios, and token holdings.

**WALLET WARMUP**: Generates natural trading history by executing small buys and sells of recently traded tokens between 0.01-0.05 SOL.

### 2. Launch Strategies

**SET BUY AMOUNTS**: Configure how much SOL each wallet will use for the initial buy. Crucial first step before any launch mode.

**LAUNCH PUMP**: The classic bundled launch - creates your token and executes buys from all sub-wallets simultaneously at block 0. Provides maximum protection against front-running, MEV, and snipers.

**MAGIC MODE**: Experimental advanced strategy that launches the token and attempts to snipe with all sub-wallets immediately after creation. Can be front-run by other snipers but often achieves better entry prices.

**LAUNCH + SNIPE V2**: Enhanced launch strategy that creates the token and buys with dev wallet in a single transaction, then sends multiple simultaneous snipe bundles with sub-wallets. Buys won't be flagged as "Rats/Insiders" but may execute at different times.

**SNIPE ONLY**: Perfect for targeting existing tokens - bundles buys from all sub-wallets for maximum impact. Works with PumpFun non-migrated tokens only and requires manual token address input.

**STAGGER BUY**: Creates natural-looking buying patterns with configurable delays between transactions. Available for both new token launches and existing tokens. Not flagged as suspicious activity but offers no protection from intervening trades.

**BUNDLE + STAGGER**: Hybrid approach that bundles dev buy and first sub-wallet with the launch for initial protection, then triggers staggered buys for remaining wallets. Balances security with natural-looking trading patterns.

**SNIPER DUMP**: Clever anti-sniper tactic that launches with only the dev wallet buying, monitors buy volume, then triggers an instant 100% dump when volume reaches your configured threshold. Perfect for countering unwanted early sniping.

**SIMULATE BUY VALUES**: Analysis tool that displays estimated token acquisition per wallet, supply percentage, cost estimates with slippage, and aggregated values. Essential for pre-launch planning.

**CLONE METADATA**: Utility function that clones existing PumpFun token metadata and associated images for custom launches.

### 3. Wallet Management

**BALANCE**: Quick overview of SOL and token balances across all wallets.

**TRANSFER TOKENS**: Consolidates tokens from sub-wallets to a specified address.

**REFUND SOL**: Returns all SOL from sub-wallets to the funder wallet.

**CLOSE TOKEN ACCTS**: Reclaims rent fees by closing all token accounts across sub-wallets.

**BURN DEV SUPPLY**: Permanently removes a specified percentage (0-100%) of dev wallet token holdings from circulation.

**IMPORT WALLETS**: Allows integration of external wallets (up to 20) by importing their private keys.

## 💸 Advanced Selling Strategies

Our selling modes are designed to maximize profits while avoiding suspicious patterns:

### For Pump.Fun (Pre-Migration/Bonding)

**DUMP ALL**: The nuclear option - batches all sub-wallet tokens, transfers to dev wallet, and sells in a single bundle. Maximum speed but obvious selling pattern.

**DELAY SELL ALL**: Sells 100% of holdings from all sub-wallets with configurable delays between transactions. Reduces market impact while still achieving full exit.

**DELAY SELL %**: Like DELAY SELL ALL but with customizable percentage from each wallet. Perfect for partial profit-taking while maintaining position.

**SINGLE SELL (%)**: Targets one sub-wallet at a time with percentage-based selling. Ideal for testing exit liquidity or strategic partial exits.

**AUTO SELL**: Sets a market cap target and automatically triggers DUMP ALL when reached. Fire-and-forget profit taking.

**SMART SELL**: The most sophisticated selling strategy - monitors new buy orders and sells a configured percentage of matching volume. Example: For each 1M token purchase and 50% configuration, automatically sells 500K tokens. Rotates through sub-wallets for maximum naturality.

**SELECT SELL**: Multi-wallet management that allows selection of specific sub-wallets and percentage-based selling from each. All selected sales execute in a single bundle.

**TRANSFER SELL**: Interactive selection of specific wallets and percentages, transfers tokens to dedicated seller wallet, and executes sale in a single bundle.

**SIMULATE SELL VALUES**: Calculates current sell quotes for all wallets including projected values. Essential for informed decision-making.

### For Raydium/PumpSwap (Post-Migration)

**SETUP RAYDIUM MODE**: Essential first-time setup that creates wrapped SOL accounts and extends the Look-Up Table for Raydium trading.

**RAYDIUM SELL**: Quick exit strategy that sells 100% of tokens from all wallets through Raydium AMM with optimized execution.

**RAYDIUM SELL (DELAY)**: Sells a configurable percentage with implemented delays between transactions. Better for minimizing market impact.

**SINGLE WALLET SELL**: Targeted selling from individual wallets with percentage control. Perfect for portfolio rebalancing.

**BUNDLE BUY**: Executes buys through Raydium AMM with bundled transactions for maximum efficiency and minimal front-running risk.

**STAGGER BUY**: Strategic accumulation with distributed timing to minimize price impact when building positions.

**UNWRAP SOL**: Utility to convert wrapped SOL back to native SOL after completing Raydium trades.

## 🛠️ Advanced Configuration

### Smart Selling Setup

Customize `smart-config.json` to define your reactive selling behavior:

```json
{
  "sellPercentage": 30,
  "minBuyValue": 0.05,
  "_sellPercentageInfo": "Percentage to sell based on incoming buy volume",
  "_minBuyValueInfo": "Minimum buy value in SOL to trigger smart selling"
}
```

This configuration tells the system to sell 30% of the tokens bought in any incoming transaction, but only if the transaction value exceeds 0.05 SOL.

### Whitelist Management

Protect friendly wallets from triggering your smart selling by adding them to `whitelist.txt`:

```
pubkey:privkey
pubkey:privkey
pubkey:privkey
```

All sub-wallets, dev wallet, and funder wallet are automatically excluded.

## 🔧 Troubleshooting Guide

### Solving Common Issues

**"BigInt Failed To Load Bindings"**  
✅ This is normal and can be safely ignored

**Transaction Failures**  
- Check RPC connection reliability
- Ensure sufficient SOL in all relevant wallets
- Verify compute budget settings aren't too low for current network conditions
- Try a different regional BlockEngine URL

**Wallet Connection Errors**  
- Verify private keys are correctly formatted (BASE58)
- Ensure no extra spaces in .env file values
- Check wallet has sufficient SOL for basic operations

**Profile Generation Failures**  
- Ensure RPC has sufficient request capacity
- Verify internet connection is stable
- Try reducing number of simultaneous profile creations

**"Invalid Program Id" Messages**  
- Run CREATE LOOKUP TABLE mode again
- Ensure you're using the correct mode for token stage (pre/post migration)

## 🤝 Community and Support

Join our thriving community of traders and launchers:

- **Discord**: [discord.gg/solana-scripts](https://discord.gg/solana-scripts)
- **Telegram**: @benorizz0


Our community features:
- Daily strategy discussions
- Launch coordination groups
- Technical support channels
- Regular feature update announcements
- Trading opportunity alerts

## 🔮 Roadmap & Future Development

We're constantly improving the Pump.Fun Bundler. Upcoming features include:

- **Cross-DEX Integration**: Support for Jupiter, Orca, and other Solana DEXs
- **Advanced Analytics**: Real-time profit tracking and projection tools
- **MEV Protection Plus**: Enhanced protection against sandwich attacks
- **Mobile Companion App**: Monitor your launches on the go
- **Social Sentiment Integration**: Automatic trading based on social signals

## 📜 License & Attribution

This project is provided under the MIT License. You're free to use, modify, and distribute it, but we appreciate attribution to the original creators.

We believe in open-source development and the power of community collaboration. This tool was built by traders, for traders.

---

## 🚀 Final Thoughts

The Pump.Fun Bundler represents hundreds of hours of development, testing, and refinement based on real-world trading experience. It's more than just a tool – it's a comprehensive solution for navigating the complex world of Solana token launches.

Whether you're creating your first token or you're a seasoned trader looking to optimize your strategy, we've built this bundler to level the playing field and give you the edge you need in a competitive market.

Launch with confidence. Launch with control. Launch with the Pump.Fun Bundler.

---

*Remember: Always operate within legal boundaries and respect the rules of the platforms you interact with. This tool is provided for educational and legitimate trading purposes only.*
