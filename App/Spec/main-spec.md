# PumpFun Bundler - Main Project Specification

## PROJECT OVERVIEW
A sophisticated Solana token bundling platform that enables users to create tokens on Pump.Fun with advanced bundling capabilities for market making and liquidity provision.

## TECHNOLOGY STACK:
- **Backend Core**: Node.js, TypeScript, Anchor Framework
- **Blockchain**: Solana Web3.js, SPL Token, Jito MEV Protection
- **Frontend**: Next.js 14, TypeScript, Shadcn UI, Tailwind CSS
- **Backend API**: FastAPI, Local Storage (JSON files), SQLAlchemy (optional for file management)
- **Authentication**: No authentication required - public API
- **Deployment**: No Docker - runs locally

## PROJECT ARCHITECTURE
```
pumpfun-bundler/
├── src/                    # Core blockchain logic
├── App/                    # Web application
│   ├── frontend/          # Next.js frontend
│   ├── backend/           # FastAPI backend
│   └── Spec/              # This documentation
├── config.ts              # Blockchain configuration
├── main.ts               # CLI interface
└── package.json          # Dependencies
```

## PROJECT PHASES:
1. **Setup both projects** (1 hour)
   - Environment configuration
   - Dependency installation
   - Initial project structure

2. **design frontend UI** (3 hours)
   - Component creation
   - Responsive design implementation
   - UI/UX polish

3. **Build backend API with local storage** (2 hours)
   - API endpoint creation
   - Data persistence layer
   - Business logic implementation

4. **Connect frontend to backend** (2 hours)
   - API integration
   - State management
   - Error handling

5. **Polish and testing** (1 hour)
   - Bug fixes
   - Performance optimization
   - User experience refinement

## CORE FEATURES
- **Token Creation**: Deploy tokens on Pump.Fun with metadata
- **Bundle Trading**: Execute multiple buy/sell transactions atomically
- **MEV Protection**: Jito integration for front-running protection
- **Wallet Management**: Generate and manage multiple keypairs
- **Smart Selling**: Automated selling based on market conditions
- **Lookup Tables**: Transaction optimization through address lookup tables

## GIT RULES:
- Commit often with meaningful changes
- Descriptive commit messages following conventional commits
- Tag working versions for releases
- Create feature branches for major changes
- Squash commits before merging to main

## DEVELOPMENT GUIDELINES
- Follow TypeScript strict mode
- Use ESLint and Prettier for code formatting
- Write unit tests for critical functions
- Document all public APIs
- Handle errors gracefully with proper logging
- Use environment variables for sensitive data

## SECURITY REQUIREMENTS
- Never commit private keys or sensitive data
- Use .env files for configuration
- Validate all user inputs
- Implement proper error handling
- Use secure RPC endpoints
- Implement rate limiting for API calls

## PERFORMANCE REQUIREMENTS
- Transaction bundling under 1232 bytes
- Sub-second API response times
- Efficient memory usage for large keypair sets
- Optimize for high-frequency trading scenarios