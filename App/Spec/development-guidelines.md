# Development Guidelines - PumpFun Bundler

## CODE STANDARDS

### TypeScript Guidelines
```typescript
// Use strict TypeScript configuration
{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  }
}

// Prefer interfaces over types for object shapes
interface User {
  id: string
  name: string
  email: string
}

// Use const assertions for immutable data
const NETWORKS = ['mainnet', 'devnet', 'testnet'] as const
type Network = typeof NETWORKS[number]

// Proper error typing
class APIError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public code: string
  ) {
    super(message)
    this.name = 'APIError'
  }
}
```

### React Best Practices
```tsx
// Use functional components with hooks
const WalletCard: React.FC<WalletCardProps> = ({ wallet, onSelect }) => {
  const [isLoading, setIsLoading] = useState(false)
  
  const handleClick = useCallback(() => {
    onSelect(wallet.id)
  }, [wallet.id, onSelect])
  
  return (
    <Card onClick={handleClick}>
      {/* Component content */}
    </Card>
  )
}

// Custom hooks for business logic
const useWalletBalance = (walletId: string) => {
  return useQuery({
    queryKey: ['wallet-balance', walletId],
    queryFn: () => fetchWalletBalance(walletId),
    enabled: !!walletId
  })
}
```

### File Naming Conventions
```
// Components: PascalCase
WalletCard.tsx
BundleCreator.tsx
TokenSelector.tsx

// Hooks: camelCase with 'use' prefix
useWalletBalance.ts
useBundleStatus.ts
useTokenPrice.ts

// Utilities: camelCase
formatCurrency.ts
validateWallet.ts
apiClient.ts

// Constants: UPPER_SNAKE_CASE
API_ENDPOINTS.ts
VALIDATION_RULES.ts
```

## GIT WORKFLOW

### Branch Strategy
```bash
# Main branches
main                    # Production-ready code
develop                # Integration branch

# Feature branches
feature/wallet-management
feature/bundle-creator
feature/token-deployment

# Hotfix branches
hotfix/critical-bug-fix

# Release branches
release/v1.0.0
```

### Commit Message Format
```bash
# Format: <type>(<scope>): <description>
feat(wallet): add wallet generation functionality
fix(bundle): resolve transaction size optimization
docs(api): update endpoint documentation
refactor(ui): improve component structure
test(integration): add bundle execution tests

# Breaking changes
feat(api)!: change wallet creation endpoint structure

BREAKING CHANGE: The wallet creation endpoint now requires
a 'type' field to specify generation method.
```

### Pull Request Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] Documentation updated
```

## TESTING STRATEGY

### Unit Testing (Frontend)
```typescript
// Component testing with React Testing Library
import { render, screen, fireEvent } from '@testing-library/react'
import { WalletCard } from './WalletCard'

describe('WalletCard', () => {
  const mockWallet = {
    id: '1',
    name: 'Test Wallet',
    balance: 1.5
  }

  it('displays wallet information correctly', () => {
    render(<WalletCard wallet={mockWallet} onSelect={jest.fn()} />)
    
    expect(screen.getByText('Test Wallet')).toBeInTheDocument()
    expect(screen.getByText('1.5 SOL')).toBeInTheDocument()
  })

  it('calls onSelect when clicked', () => {
    const mockOnSelect = jest.fn()
    render(<WalletCard wallet={mockWallet} onSelect={mockOnSelect} />)
    
    fireEvent.click(screen.getByRole('button'))
    expect(mockOnSelect).toHaveBeenCalledWith('1')
  })
})
```

### API Testing (Backend)
```python
import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_create_wallet():
    response = client.post("/api/wallets", json={
        "name": "Test Wallet",
        "type": "generated"
    })
    assert response.status_code == 201
    assert response.json()["data"]["name"] == "Test Wallet"

def test_wallet_validation():
    response = client.post("/api/wallets", json={
        "name": "",  # Invalid empty name
        "type": "generated"
    })
    assert response.status_code == 422
```

### Integration Testing
```typescript
// End-to-end test with Playwright
import { test, expect } from '@playwright/test'

test('complete bundle creation flow', async ({ page }) => {
  await page.goto('/bundles/create')
  
  // Step 1: Select token
  await page.click('[data-testid="token-selector"]')
  await page.click('[data-testid="token-option-0"]')
  
  // Step 2: Select wallets
  await page.click('[data-testid="wallet-checkbox-0"]')
  await page.click('[data-testid="wallet-checkbox-1"]')
  
  // Step 3: Configure amounts
  await page.fill('[data-testid="buy-amount-0"]', '0.1')
  await page.fill('[data-testid="buy-amount-1"]', '0.2')
  
  // Step 4: Execute bundle
  await page.click('[data-testid="execute-bundle"]')
  
  await expect(page.locator('[data-testid="success-message"]')).toBeVisible()
})
```

## PERFORMANCE GUIDELINES

### Frontend Optimization
```typescript
// Use React.memo for expensive components
const ExpensiveComponent = React.memo(({ data }) => {
  return <ComplexVisualization data={data} />
})

// Implement virtual scrolling for large lists
import { FixedSizeList as List } from 'react-window'

const WalletList = ({ wallets }) => (
  <List
    height={400}
    itemCount={wallets.length}
    itemSize={80}
    itemData={wallets}
  >
    {WalletRow}
  </List>
)

// Lazy load heavy components
const BundleAnalytics = lazy(() => import('./BundleAnalytics'))
```

### Backend Optimization
```python
# Use async/await for I/O operations
async def get_wallet_balance(wallet_id: str) -> float:
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{RPC_URL}/balance/{wallet_id}")
        return response.json()["balance"]

# Implement caching for expensive operations
from functools import lru_cache

@lru_cache(maxsize=100)
def calculate_bundle_costs(bundle_config: str) -> float:
    # Expensive calculation
    return result
```

## SECURITY GUIDELINES

### Input Validation
```typescript
// Frontend validation with Zod
const walletSchema = z.object({
  name: z.string().min(1).max(50),
  privateKey: z.string().regex(/^[1-9A-HJ-NP-Za-km-z]{44,88}$/).optional()
})

// Backend validation with Pydantic
class WalletCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=50)
    private_key: Optional[str] = Field(None, regex=r"^[1-9A-HJ-NP-Za-km-z]{44,88}$")
```

### Sensitive Data Handling
```typescript
// Never log sensitive information
const sanitizeForLogging = (obj: any) => {
  const sensitive = ['privateKey', 'secretKey', 'password']
  return omit(obj, sensitive)
}

// Use environment variables for secrets
const config = {
  rpcUrl: process.env.RPC_URL,
  jitoEndpoint: process.env.JITO_ENDPOINT,
  encryptionKey: process.env.ENCRYPTION_KEY
}
```

## DOCUMENTATION STANDARDS

### Code Documentation
```typescript
/**
 * Creates a new bundle for token trading
 * @param tokenId - The unique identifier of the token
 * @param walletIds - Array of wallet IDs to include in the bundle
 * @param buyAmounts - Array of SOL amounts for each wallet
 * @returns Promise resolving to the created bundle
 * @throws {ValidationError} When input parameters are invalid
 * @throws {InsufficientFundsError} When wallets lack sufficient balance
 * 
 * @example
 * ```typescript
 * const bundle = await createBundle(
 *   'token_123',
 *   ['wallet_1', 'wallet_2'],
 *   [0.1, 0.2]
 * )
 * ```
 */
async function createBundle(
  tokenId: string,
  walletIds: string[],
  buyAmounts: number[]
): Promise<Bundle>
```

### API Documentation
```python
from fastapi import FastAPI
from pydantic import BaseModel, Field

class WalletResponse(BaseModel):
    """Response model for wallet operations"""
    id: str = Field(..., description="Unique wallet identifier")
    name: str = Field(..., description="User-friendly wallet name")
    balance: float = Field(..., description="Current SOL balance")
    
    class Config:
        schema_extra = {
            "example": {
                "id": "wallet_123",
                "name": "My Trading Wallet",
                "balance": 1.5
            }
        }

@app.post("/wallets", response_model=WalletResponse)
async def create_wallet(wallet: WalletCreate):
    """
    Create a new wallet
    
    Creates a new wallet with the specified configuration.
    Supports both generated and imported wallet types.
    
    - **name**: Display name for the wallet
    - **type**: Either 'generated' for new keypair or 'imported' for existing
    """
```

## DEPLOYMENT CHECKLIST

### Pre-deployment
- [ ] All tests passing (unit, integration, e2e)
- [ ] Code review completed and approved
- [ ] Performance benchmarks met
- [ ] Security scan completed
- [ ] Documentation updated
- [ ] Environment variables configured
- [ ] Database migrations (if any) tested

### Post-deployment
- [ ] Health checks passing
- [ ] Monitoring alerts configured
- [ ] Performance metrics baseline established
- [ ] Error tracking enabled
- [ ] Rollback plan tested
- [ ] Team notified of deployment

## MONITORING & ALERTING

### Key Metrics to Track
```typescript
// Frontend metrics
const trackUserAction = (action: string, metadata?: object) => {
  analytics.track(action, {
    timestamp: Date.now(),
    user_id: getCurrentUserId(),
    ...metadata
  })
}

// Backend metrics
import time
from prometheus_client import Counter, Histogram

REQUEST_COUNT = Counter('api_requests_total', 'Total API requests', ['method', 'endpoint'])
REQUEST_DURATION = Histogram('api_request_duration_seconds', 'API request duration')

@REQUEST_DURATION.time()
def process_request():
    REQUEST_COUNT.inc()
    # Process request
```

### Error Reporting
```typescript
// Frontend error boundary
class ErrorBoundary extends React.Component {
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Report to error tracking service
    Sentry.captureException(error, {
      contexts: {
        react: errorInfo
      }
    })
  }
}

// Backend error handling
import logging
from sentry_sdk import capture_exception

logger = logging.getLogger(__name__)

try:
    # Risky operation
    result = perform_blockchain_operation()
except Exception as e:
    logger.error(f"Blockchain operation failed: {str(e)}")
    capture_exception(e)
    raise APIError("Operation failed", 500, "BLOCKCHAIN_ERROR")
```
