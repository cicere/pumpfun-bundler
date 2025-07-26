# Agent Instructions - PumpFun Bundler Development

## AGENT ROLES & RESPONSIBILITIES

### Frontend Development Agent
**Primary Focus**: React/Next.js UI development, user experience, and client-side functionality

**Key Responsibilities**:
- Implement React components using Shadcn UI and Tailwind CSS
- Create responsive, accessible user interfaces
- Integrate with backend APIs using proper error handling
- Implement form validation with React Hook Form and Zod
- Optimize performance with React best practices
- Write component tests with React Testing Library

**Tools & Technologies**:
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS + Shadcn UI
- Zustand for state management
- React Query for API calls
- React Hook Form + Zod validation

**Decision Authority**:
- UI/UX design decisions within established design system
- Component architecture and state management patterns
- Frontend performance optimizations
- Client-side routing and navigation

### Backend Development Agent
**Primary Focus**: FastAPI development, business logic, and data persistence

**Key Responsibilities**:
- Develop REST API endpoints with FastAPI
- Implement business logic for wallet and bundle operations
- Manage local JSON file storage system
- Validate input data with Pydantic models
- Handle errors and edge cases gracefully
- Write API tests and documentation

**Tools & Technologies**:
- Python 3.11+ with FastAPI
- Pydantic for data validation
- JSON file storage
- Uvicorn for ASGI server
- Pytest for testing

**Decision Authority**:
- API endpoint design and data models
- Business logic implementation
- Data persistence strategies
- Server configuration and deployment

### Blockchain Integration Agent
**Primary Focus**: Solana integration, transaction building, and blockchain operations

**Key Responsibilities**:
- Integrate with Solana Web3.js and Anchor framework
- Build and optimize transactions for Pump.Fun protocol
- Implement Jito MEV protection
- Manage wallet generation and key operations
- Handle blockchain errors and retries
- Optimize transaction bundling

**Tools & Technologies**:
- Solana Web3.js
- Anchor Framework
- Jito TypeScript SDK
- SPL Token library
- bs58 for key encoding

**Decision Authority**:
- Blockchain integration patterns
- Transaction optimization strategies
- MEV protection implementation
- Wallet security practices

### DevOps/Infrastructure Agent
**Primary Focus**: Development environment, build processes, and deployment

**Key Responsibilities**:
- Configure development environment
- Set up build and deployment pipelines
- Manage environment variables and secrets
- Monitor application health and performance
- Handle logging and error tracking
- Coordinate releases

**Tools & Technologies**:
- Node.js/npm ecosystem
- Git version control
- Environment configuration
- Local development setup

**Decision Authority**:
- Build and deployment strategies
- Environment configuration
- Monitoring and alerting setup
- Performance optimization

## COMMUNICATION PROTOCOLS

### Cross-Agent Collaboration
```typescript
// Shared interfaces between agents
interface AgentCommunication {
  sender: 'frontend' | 'backend' | 'blockchain' | 'devops'
  recipient: 'frontend' | 'backend' | 'blockchain' | 'devops'
  type: 'request' | 'update' | 'error' | 'question'
  data: any
  priority: 'low' | 'medium' | 'high' | 'critical'
}

// Example communication patterns
const frontendToBackend: AgentCommunication = {
  sender: 'frontend',
  recipient: 'backend',
  type: 'request',
  data: {
    message: 'Need API endpoint for wallet balance updates',
    requirements: ['real-time updates', 'error handling', 'caching']
  },
  priority: 'medium'
}
```

### Decision Escalation Matrix
```
┌─────────────────┬──────────────────┬──────────────────┐
│ Decision Type   │ Primary Agent    │ Consultation     │
├─────────────────┼──────────────────┼──────────────────┤
│ UI Components   │ Frontend         │ None required    │
│ API Design      │ Backend          │ Frontend review  │
│ Blockchain Ops  │ Blockchain       │ Backend review   │
│ Architecture    │ All agents       │ Group consensus  │
│ Security        │ All agents       │ Group consensus  │
│ Performance     │ Relevant agent   │ DevOps review    │
└─────────────────┴──────────────────┴──────────────────┘
```

## DEVELOPMENT WORKFLOW

### Task Assignment Process
1. **Task Identification**: Any agent can identify needed work
2. **Agent Assignment**: Based on primary expertise area
3. **Collaboration Check**: Determine if multiple agents needed
4. **Implementation**: Primary agent implements with consultation
5. **Review**: Other agents review relevant changes
6. **Integration**: DevOps agent coordinates integration

### Code Review Protocol
```typescript
interface CodeReviewRequest {
  agent: AgentRole
  files: string[]
  description: string
  reviewers: AgentRole[]
  priority: Priority
  deadline?: Date
}

// Example review request
const reviewRequest: CodeReviewRequest = {
  agent: 'frontend',
  files: ['components/WalletCard.tsx', 'hooks/useWalletBalance.ts'],
  description: 'New wallet management components with balance fetching',
  reviewers: ['backend', 'blockchain'],
  priority: 'medium'
}
```

### Integration Points
- **Frontend ↔ Backend**: API contracts and data models
- **Backend ↔ Blockchain**: Transaction building and wallet operations
- **All ↔ DevOps**: Environment setup and deployment coordination

## ERROR HANDLING & DEBUGGING

### Agent-Specific Error Handling
```typescript
// Frontend Agent Error Handling
const handleAPIError = (error: APIError) => {
  switch (error.type) {
    case 'validation_error':
      showFormValidationErrors(error.details)
      break
    case 'blockchain_error':
      showBlockchainErrorDialog(error.message)
      break
    case 'network_error':
      showNetworkErrorToast()
      break
    default:
      showGenericErrorDialog()
  }
}

// Backend Agent Error Handling
class ErrorHandler:
    def handle_blockchain_error(self, error: BlockchainError):
        logger.error(f"Blockchain operation failed: {error}")
        return {
            "error": "blockchain_error",
            "message": "Transaction failed on blockchain",
            "retry_possible": error.is_retryable
        }

// Blockchain Agent Error Handling
const handleTransactionError = (error: TransactionError) => {
  if (error.code === 'insufficient_funds') {
    return { type: 'user_error', message: 'Insufficient SOL balance' }
  } else if (error.code === 'network_congestion') {
    return { type: 'retry_error', message: 'Network congested, retry in 30s' }
  }
  return { type: 'system_error', message: 'Transaction failed' }
}
```

### Debug Information Sharing
```typescript
interface DebugContext {
  agent: AgentRole
  timestamp: string
  operation: string
  parameters: any
  error?: any
  stackTrace?: string
  environment: Record<string, any>
}

const createDebugContext = (operation: string, params: any): DebugContext => ({
  agent: 'frontend',
  timestamp: new Date().toISOString(),
  operation,
  parameters: sanitizeForLogging(params),
  environment: {
    userAgent: navigator.userAgent,
    url: window.location.href,
    localStorage: getRelevantStorageData()
  }
})
```

## TESTING COORDINATION

### Test Ownership Matrix
```
┌─────────────────┬──────────────────┬──────────────────┐
│ Test Type       │ Primary Agent    │ Supporting       │
├─────────────────┼──────────────────┼──────────────────┤
│ Unit Tests      │ Code author      │ None             │
│ Component Tests │ Frontend         │ None             │
│ API Tests       │ Backend          │ None             │
│ Integration     │ All agents       │ DevOps setup     │
│ E2E Tests       │ Frontend         │ Backend support  │
│ Performance     │ DevOps           │ All agents       │
└─────────────────┴──────────────────┴──────────────────┘
```

### Test Data Management
```typescript
// Shared test data for cross-agent testing
interface TestDataSet {
  wallets: TestWallet[]
  tokens: TestToken[]
  bundles: TestBundle[]
  blockchain_state: TestBlockchainState
}

const createTestEnvironment = (): TestDataSet => ({
  wallets: generateTestWallets(5),
  tokens: generateTestTokens(3),
  bundles: generateTestBundles(2),
  blockchain_state: createMockBlockchainState()
})
```

## PERFORMANCE MONITORING

### Agent-Specific Metrics
```typescript
// Frontend metrics
interface FrontendMetrics {
  page_load_time: number
  component_render_time: number
  api_call_duration: number
  user_interaction_lag: number
}

// Backend metrics  
interface BackendMetrics {
  request_duration: number
  database_query_time: number
  memory_usage: number
  concurrent_requests: number
}

// Blockchain metrics
interface BlockchainMetrics {
  transaction_build_time: number
  bundle_size_bytes: number
  confirmation_time: number
  success_rate: number
}
```

## DEPLOYMENT COORDINATION

### Release Process
1. **Feature Complete**: All agents complete their tasks
2. **Testing Phase**: Comprehensive testing across all layers
3. **Integration Verification**: Cross-agent functionality testing
4. **Performance Validation**: All metrics within acceptable ranges
5. **Security Review**: Security checklist completed
6. **Deployment**: DevOps agent coordinates release
7. **Post-deployment**: All agents monitor their components

### Rollback Procedures
```typescript
interface RollbackPlan {
  trigger_conditions: string[]
  responsible_agent: AgentRole
  rollback_steps: RollbackStep[]
  verification_steps: string[]
  communication_plan: string[]
}

const createRollbackPlan = (deployment: Deployment): RollbackPlan => ({
  trigger_conditions: [
    'Error rate > 5%',
    'Response time > 2s',
    'User reports of critical bugs'
  ],
  responsible_agent: 'devops',
  rollback_steps: [
    { step: 'Stop new deployments', agent: 'devops' },
    { step: 'Revert to previous version', agent: 'devops' },
    { step: 'Verify functionality', agent: 'frontend' },
    { step: 'Check blockchain operations', agent: 'blockchain' }
  ],
  verification_steps: [
    'Health checks passing',
    'Core functionality working',
    'No error spikes in logs'
  ],
  communication_plan: [
    'Notify all agents',
    'Update status page',
    'Inform stakeholders'
  ]
})
```

## KNOWLEDGE SHARING

### Documentation Responsibilities
- **Frontend Agent**: Component documentation, UI patterns, user flows
- **Backend Agent**: API documentation, business logic, data models
- **Blockchain Agent**: Blockchain integration, transaction patterns, security practices
- **DevOps Agent**: Deployment guides, environment setup, monitoring setup

### Code Review Focus Areas
```typescript
interface ReviewFocus {
  frontend: string[]
  backend: string[]
  blockchain: string[]
  devops: string[]
}

const reviewFocusAreas: ReviewFocus = {
  frontend: [
    'Component reusability',
    'Accessibility compliance',
    'Performance optimization',
    'Error handling UX'
  ],
  backend: [
    'API design consistency',
    'Data validation completeness',
    'Error response format',
    'Performance implications'
  ],
  blockchain: [
    'Transaction optimization',
    'Security best practices',
    'Error handling robustness',
    'Gas efficiency'
  ],
  devops: [
    'Configuration management',
    'Deployment safety',
    'Monitoring coverage',
    'Performance impact'
  ]
}
```

## SUCCESS METRICS

### Agent Performance Indicators
- **Frontend**: Component reuse rate, user experience scores, performance metrics
- **Backend**: API response times, error rates, test coverage
- **Blockchain**: Transaction success rates, cost optimization, security audit results
- **DevOps**: Deployment success rate, system uptime, monitoring effectiveness

### Collaboration Effectiveness
- Cross-agent code review participation
- Issue resolution time with multi-agent involvement
- Integration bug frequency
- Knowledge sharing documentation quality
