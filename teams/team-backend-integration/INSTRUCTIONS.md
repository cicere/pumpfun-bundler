# Team Backend Integration - Instructions

## Role and Responsibilities
You are the **Backend Integration Team** responsible for connecting the frontend application with the existing TypeScript backend, managing API communications, and handling real-time data synchronization.

## Primary Objectives
1. Create robust API client for backend communication
2. Implement real-time data synchronization (WebSockets)
3. Build state management for backend data
4. Develop error handling and retry mechanisms

## Development Guidelines

### Integration Architecture
- RESTful API integration with the CLI backend
- WebSocket connections for real-time updates
- Efficient state management for backend data
- Robust error handling and recovery
- Type-safe API client implementation

### Data Flow Management
- Centralized API client configuration
- Consistent error handling patterns
- Real-time data synchronization
- Efficient caching strategies
- State management integration

## Key Tasks

### API Client Development
- [ ] Create TypeScript API client matching backend interfaces
- [ ] Implement authentication header management
- [ ] Build request/response interceptors
- [ ] Add retry logic for failed requests
- [ ] Create API endpoint type definitions

### WebSocket Integration
- [ ] Implement WebSocket connection management
- [ ] Create real-time event handling system
- [ ] Build connection health monitoring
- [ ] Add automatic reconnection logic
- [ ] Implement event-driven state updates

### State Management
- [ ] Set up global state management (Zustand/Redux)
- [ ] Create backend data stores
- [ ] Implement optimistic updates
- [ ] Build data synchronization patterns
- [ ] Add state persistence strategies

### Error Handling
- [ ] Create comprehensive error handling system
- [ ] Implement user-friendly error messages
- [ ] Build retry mechanisms for critical operations
- [ ] Add error logging and monitoring
- [ ] Create fallback strategies for offline scenarios

### Data Transformation
- [ ] Create data mappers for API responses
- [ ] Implement data validation and sanitization
- [ ] Build type-safe data transformation utilities
- [ ] Add data normalization patterns
- [ ] Create caching invalidation strategies

## Component Specifications

### APIClient Class
```typescript
class APIClient {
  private baseURL: string;
  private authToken?: string;
  
  // Wallet operations
  generateKeypairs(): Promise<KeypairResponse>;
  fundWallets(amount: number): Promise<FundingResponse>;
  createLUT(): Promise<LUTResponse>;
  extendLUT(addresses: string[]): Promise<LUTExtensionResponse>;
  
  // Launch operations
  launchToken(config: LaunchConfig): Promise<LaunchResponse>;
  getBundleStatus(bundleId: string): Promise<BundleStatus>;
  cancelBundle(bundleId: string): Promise<CancelResponse>;
  
  // Analytics operations
  getAnalytics(timeRange: TimeRange): Promise<AnalyticsData>;
  getTransactionHistory(filters: Filters): Promise<TransactionHistory>;
}
```

### WebSocketManager Class
```typescript
class WebSocketManager {
  private ws?: WebSocket;
  private reconnectAttempts: number;
  private eventHandlers: Map<string, Function[]>;
  
  connect(): Promise<void>;
  disconnect(): void;
  subscribe(event: string, handler: Function): void;
  unsubscribe(event: string, handler: Function): void;
  send(message: WSMessage): void;
}
```

### State Management Store
```typescript
interface AppState {
  // Authentication state
  auth: {
    user: User | null;
    isAuthenticated: boolean;
    connectedWallet: ConnectedWallet | null;
  };
  
  // Wallet state
  wallets: {
    keypairs: Wallet[];
    balances: Record<string, number>;
    lutInfo: LUTInfo | null;
    isLoading: boolean;
  };
  
  // Bundle state
  bundles: {
    active: Bundle[];
    history: Bundle[];
    currentLaunch: LaunchConfig | null;
    isExecuting: boolean;
  };
  
  // Analytics state
  analytics: {
    metrics: AnalyticsMetrics;
    charts: ChartData[];
    insights: Insight[];
    isLoading: boolean;
  };
}
```

## Backend Integration Points

### CLI Backend Integration
- **Configuration Management**: Access to .env and config files
- **Keypair Operations**: Integration with createKeys.ts
- **LUT Management**: Connection to createLUT.ts functionality
- **Bundle Operations**: Integration with jitoPool.ts
- **Selling Functions**: Connection to sellFunc.ts and sellRay.ts

### Real-time Features
- **Bundle Status Updates**: Live bundle execution monitoring
- **Transaction Confirmations**: Real-time transaction status
- **Wallet Balance Updates**: Live SOL and token balance tracking
- **Network Status**: RPC and Jito engine health monitoring

## Dependencies
- **Upstream**: Team Architecture (project setup), existing TypeScript backend
- **Downstream**: All frontend teams (data provider)

## Integration Patterns

### API Communication Patterns
```typescript
// Standard API call pattern
const handleAPICall = async <T>(
  apiCall: () => Promise<T>,
  onSuccess?: (data: T) => void,
  onError?: (error: Error) => void
) => {
  try {
    setLoading(true);
    const result = await apiCall();
    onSuccess?.(result);
    return result;
  } catch (error) {
    console.error('API call failed:', error);
    onError?.(error as Error);
    throw error;
  } finally {
    setLoading(false);
  }
};
```

### WebSocket Event Handling
```typescript
// WebSocket event subscription pattern
useEffect(() => {
  const handleBundleUpdate = (data: BundleUpdateEvent) => {
    updateBundleStatus(data.bundleId, data.status);
  };
  
  wsManager.subscribe('bundle-update', handleBundleUpdate);
  
  return () => {
    wsManager.unsubscribe('bundle-update', handleBundleUpdate);
  };
}, []);
```

## Error Handling Strategies

### API Error Categories
- **Network Errors**: Connection timeouts, DNS issues
- **Authentication Errors**: Invalid tokens, expired sessions
- **Validation Errors**: Invalid input parameters
- **Business Logic Errors**: Insufficient funds, invalid operations
- **Server Errors**: Internal server errors, service unavailable

### Error Recovery Patterns
- **Retry Logic**: Exponential backoff for transient errors
- **Fallback Strategies**: Alternative endpoints or cached data
- **User Notification**: Clear error messages and recovery actions
- **Error Logging**: Comprehensive error tracking and reporting

## Performance Considerations
- **Request Batching**: Combine multiple API calls when possible
- **Caching Strategies**: Cache frequently accessed data
- **Debouncing**: Reduce API call frequency for user inputs
- **Pagination**: Efficient handling of large datasets
- **Connection Pooling**: Optimize WebSocket connections

## Testing Requirements
- Unit tests for API client methods
- Integration tests with mock backend
- WebSocket connection testing
- Error handling scenario testing
- Performance testing under load

## Data Models Integration

### Backend Type Mapping
```typescript
// Map backend interfaces to frontend types
interface FrontendWallet extends BackendKeypair {
  uiState: {
    isSelected: boolean;
    displayName: string;
    lastActivity: Date;
  };
}

interface FrontendBundle extends BackendBundleInfo {
  uiState: {
    isExpanded: boolean;
    displayStatus: string;
    progress: number;
  };
}
```

## Security Considerations
- **API Key Management**: Secure storage and rotation
- **Request Signing**: Verify request authenticity
- **Rate Limiting**: Implement client-side rate limiting
- **Data Validation**: Validate all API responses
- **Error Information**: Avoid exposing sensitive error details

## Communication Requirements
- Document API integration patterns
- Maintain backend API compatibility
- Coordinate with backend team on API changes
- Document WebSocket event specifications

## Success Criteria
- [ ] Complete API client implementation
- [ ] Real-time WebSocket communication functional
- [ ] State management integrated with backend data
- [ ] Comprehensive error handling system
- [ ] All backend operations accessible from frontend

## Notes
- Consider API versioning strategy
- Plan for backend API evolution
- Implement API mocking for development
- Consider GraphQL migration in future
- Plan for offline functionality and caching