# Integration Specification - PumpFun Bundler

## OVERVIEW
This document outlines the integration patterns, API contracts, and communication protocols between the frontend, backend, and blockchain components of the PumpFun Bundler system.

## SYSTEM ARCHITECTURE

### Component Interaction Flow
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │   Blockchain    │
│   (Next.js)     │◄──►│   (FastAPI)     │◄──►│   (Solana)      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │              ┌─────────────────┐
         │                       │              │   Pump.Fun      │
         │                       └─────────────►│   Program       │
         │                                      └─────────────────┘
         │              ┌─────────────────┐
         └─────────────►│   Jito MEV      │
                        │   Protection    │
                        └─────────────────┘
```

## API INTEGRATION CONTRACTS

### Authentication & Headers
```typescript
// Standard request headers
interface RequestHeaders {
  'Content-Type': 'application/json'
  'Accept': 'application/json'
  'X-Request-ID': string  // Unique request identifier
  'X-Client-Version': string
}

// No authentication required - public API
```

### Response Format Standards
```typescript
// Success response format
interface SuccessResponse<T> {
  success: true
  data: T
  message?: string
  timestamp: string
  request_id: string
}

// Error response format
interface ErrorResponse {
  success: false
  error: {
    code: string
    message: string
    details?: any
  }
  timestamp: string
  request_id: string
}
```

### API Endpoint Integration

#### Wallet Operations
```typescript
// Frontend -> Backend
const createWallet = async (walletData: WalletCreateRequest): Promise<Wallet> => {
  const response = await apiClient.post('/api/wallets', {
    name: walletData.name,
    type: walletData.type,
    private_key: walletData.privateKey // Optional for import
  })
  return response.data.data
}

// Backend -> Blockchain
const generateKeypair = (): WalletKeypair => {
  const keypair = Keypair.generate()
  return {
    publicKey: keypair.publicKey.toBase58(),
    privateKey: bs58.encode(keypair.secretKey)
  }
}
```

#### Token Operations
```typescript
// Frontend form data to backend
interface TokenCreateRequest {
  name: string
  symbol: string
  description: string
  image: File
  metadata: {
    website?: string
    twitter?: string
    telegram?: string
  }
}

// Backend to blockchain deployment
interface TokenDeployment {
  mint: PublicKey
  metadata_uri: string
  creator: PublicKey
  initial_supply: number
}
```

#### Bundle Execution Flow
```typescript
// 1. Frontend creates bundle request
const bundleRequest: BundleCreateRequest = {
  token_id: "token_uuid",
  wallet_ids: ["wallet1_uuid", "wallet2_uuid"],
  buy_amounts: [0.1, 0.2], // SOL amounts
  execution_strategy: "simultaneous"
}

// 2. Backend validates and prepares bundle
const preparedBundle: PreparedBundle = {
  transactions: VersionedTransaction[],
  estimated_cost: number,
  estimated_gas: number
}

// 3. Blockchain execution via Jito
const bundleResult: BundleExecutionResult = {
  bundle_id: string,
  transaction_signatures: string[],
  status: "confirmed" | "failed" | "pending"
}
```

## DATA FLOW PATTERNS

### Real-time Updates
```typescript
// WebSocket connection for live updates
interface WebSocketMessage {
  type: 'bundle_status' | 'wallet_balance' | 'token_price'
  data: any
  timestamp: string
}

// Frontend WebSocket client
const wsClient = new WebSocket('ws://localhost:8000/ws')
wsClient.onmessage = (event) => {
  const message: WebSocketMessage = JSON.parse(event.data)
  handleRealtimeUpdate(message)
}
```

### State Synchronization
```typescript
// Frontend state updates from backend
const syncWalletBalances = async () => {
  const wallets = await getWallets()
  updateWalletStore(wallets)
}

// Optimistic updates pattern
const createWalletOptimistic = async (walletData: WalletCreateRequest) => {
  // Immediately update UI
  const tempWallet = { ...walletData, id: 'temp', status: 'creating' }
  addWalletToStore(tempWallet)
  
  try {
    // Send request to backend
    const newWallet = await createWallet(walletData)
    updateWalletInStore(tempWallet.id, newWallet)
  } catch (error) {
    removeWalletFromStore(tempWallet.id)
    showError(error.message)
  }
}
```

## BLOCKCHAIN INTEGRATION

### Solana Connection Management
```typescript
// Backend blockchain service
class SolanaService {
  private connection: Connection
  private wallet: Keypair
  
  constructor() {
    this.connection = new Connection(
      process.env.RPC_URL,
      'confirmed'
    )
    this.wallet = this.loadWallet()
  }
  
  async sendBundle(bundle: Bundle): Promise<string> {
    const jitoClient = new JitoClient()
    return await jitoClient.sendBundle(bundle.transactions)
  }
}
```

### Transaction Building
```typescript
// Standardized transaction creation
interface TransactionBuilder {
  createTokenTransaction(params: TokenCreateParams): VersionedTransaction
  createBuyTransaction(params: BuyParams): VersionedTransaction
  createSellTransaction(params: SellParams): VersionedTransaction
}

// Bundle transaction aggregation
const createBundleTransaction = (operations: Operation[]): VersionedTransaction[] => {
  return operations.map(op => {
    switch (op.type) {
      case 'token_create':
        return createTokenTransaction(op.params)
      case 'buy':
        return createBuyTransaction(op.params)
      case 'sell':
        return createSellTransaction(op.params)
    }
  })
}
```

## ERROR HANDLING INTEGRATION

### Error Propagation Chain
```typescript
// Blockchain errors -> Backend -> Frontend
interface BlockchainError {
  type: 'insufficient_funds' | 'transaction_failed' | 'network_error'
  message: string
  transaction_signature?: string
}

interface BackendError {
  type: 'validation_error' | 'blockchain_error' | 'internal_error'
  message: string
  details: any
}

interface FrontendError {
  type: 'api_error' | 'validation_error' | 'network_error'
  message: string
  userFriendlyMessage: string
}
```

### Retry Logic
```typescript
// Exponential backoff for failed requests
const retryWithBackoff = async <T>(
  operation: () => Promise<T>,
  maxRetries: number = 3
): Promise<T> => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation()
    } catch (error) {
      if (i === maxRetries - 1) throw error
      await new Promise(resolve => 
        setTimeout(resolve, Math.pow(2, i) * 1000)
      )
    }
  }
  throw new Error('Max retries exceeded')
}
```

## PERFORMANCE OPTIMIZATION

### Caching Strategy
```typescript
// Frontend caching with React Query
const useWallets = () => {
  return useQuery({
    queryKey: ['wallets'],
    queryFn: fetchWallets,
    staleTime: 30000, // 30 seconds
    cacheTime: 300000, // 5 minutes
  })
}

// Backend caching
const walletCache = new Map<string, Wallet>()
const getCachedWallet = (id: string): Wallet | null => {
  return walletCache.get(id) || null
}
```

### Batch Operations
```typescript
// Batch multiple API calls
const batchWalletOperations = async (operations: WalletOperation[]) => {
  const batches = chunk(operations, 10) // Process in batches of 10
  
  for (const batch of batches) {
    await Promise.all(
      batch.map(op => processWalletOperation(op))
    )
  }
}
```

## MONITORING & LOGGING

### Request Tracking
```typescript
// Request correlation ID
const generateRequestId = (): string => {
  return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

// Log request/response
const logAPICall = (method: string, url: string, requestId: string) => {
  console.log(`[${requestId}] ${method} ${url}`)
}
```

### Health Checks
```typescript
// System health monitoring
interface HealthCheck {
  frontend: boolean
  backend: boolean
  blockchain: boolean
  jito: boolean
}

const performHealthCheck = async (): Promise<HealthCheck> => {
  return {
    frontend: true, // Always true if code is running
    backend: await checkBackendHealth(),
    blockchain: await checkSolanaConnection(),
    jito: await checkJitoConnection()
  }
}
```

## SECURITY INTEGRATION

### Input Validation Chain
```typescript
// Frontend validation (Zod)
const walletSchema = z.object({
  name: z.string().min(1).max(50),
  type: z.enum(['generated', 'imported'])
})

// Backend validation (Pydantic)
class WalletCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=50)
    type: Literal['generated', 'imported']
```

### Sensitive Data Handling
```typescript
// Private key encryption at rest
const encryptPrivateKey = (privateKey: string): string => {
  return encrypt(privateKey, process.env.ENCRYPTION_KEY)
}

// Never log sensitive data
const sanitizeLogs = (data: any): any => {
  const sensitive = ['private_key', 'secret', 'password']
  return omit(data, sensitive)
}
```

## DEPLOYMENT INTEGRATION

### Environment Configuration
```typescript
// Shared environment variables
interface EnvironmentConfig {
  NODE_ENV: 'development' | 'production'
  API_URL: string
  RPC_URL: string
  JITO_ENDPOINT: string
  LOG_LEVEL: 'debug' | 'info' | 'warn' | 'error'
}
```

### Service Discovery
```typescript
// Service endpoint discovery
const getServiceEndpoints = () => ({
  backend: process.env.BACKEND_URL || 'http://localhost:8000',
  frontend: process.env.FRONTEND_URL || 'http://localhost:3000',
  blockchain: process.env.RPC_URL || 'https://api.mainnet-beta.solana.com'
})
```
