# Team Wallet Management - Instructions

## Role and Responsibilities
You are the **Wallet Management Team** responsible for implementing wallet operations, keypair management, and LUT (Lookup Table) functionality for the Pump.Fun Bundler application.

## Primary Objectives
1. Create wallet generation and management interface
2. Implement SOL distribution and fund management
3. Build LUT creation and extension tools
4. Develop wallet profile generation system

## Development Guidelines

### Wallet Architecture
- Support for up to 24 sub-wallets
- Secure private key handling (never store in plain text)
- Real-time balance monitoring
- Batch operations for efficiency
- Profile management for anti-detection

### Security Considerations
- Private keys encrypted in browser storage
- Clear warnings before sensitive operations
- Backup and restore functionality
- Secure key display with authentication
- Audit trail for all wallet operations

## Key Tasks

### Wallet Generation
- [ ] Create wallet generation interface
- [ ] Implement keypair creation (up to 24 wallets)
- [ ] Build wallet import/export functionality
- [ ] Create backup and restore system
- [ ] Add wallet naming and organization

### Wallet Display and Management
- [ ] Create wallet grid/list display
- [ ] Build individual wallet detail view
- [ ] Implement wallet selection interface
- [ ] Add wallet status indicators
- [ ] Create wallet operation history

### SOL Distribution
- [ ] Build SOL funding interface
- [ ] Implement batch funding operations
- [ ] Create funding amount calculator
- [ ] Add refund functionality
- [ ] Build balance monitoring system

### LUT Management
- [ ] Create LUT creation interface
- [ ] Build LUT extension functionality
- [ ] Display LUT status and information
- [ ] Implement LUT optimization tools
- [ ] Add LUT analytics and monitoring

### Profile Generation
- [ ] Build wallet profile creation system
- [ ] Implement randomized profile generation
- [ ] Create profile management interface
- [ ] Add profile authenticity scoring
- [ ] Build profile history tracking

## Component Specifications

### WalletGrid Component
```typescript
interface WalletGridProps {
  wallets: Wallet[];
  onWalletSelect: (wallet: Wallet) => void;
  onWalletAction: (walletId: string, action: WalletAction) => void;
  selectedWallets?: string[];
  showBalance?: boolean;
}
```

### WalletDetail Component
```typescript
interface WalletDetailProps {
  wallet: Wallet;
  onUpdate: (updates: Partial<Wallet>) => void;
  onClose: () => void;
  showPrivateKey?: boolean;
}
```

### SOLDistribution Component
```typescript
interface SOLDistributionProps {
  wallets: Wallet[];
  totalSOL: number;
  onDistribute: (distribution: DistributionPlan) => void;
  strategy: 'equal' | 'weighted' | 'custom';
}
```

### LUTManager Component
```typescript
interface LUTManagerProps {
  currentLUT?: LookupTable;
  wallets: Wallet[];
  onCreateLUT: () => void;
  onExtendLUT: (addresses: string[]) => void;
  onAnalyzeLUT: () => void;
}
```

## Wallet Operations

### Generation Operations
- Generate new keypairs (1-24 wallets)
- Import existing wallets
- Export wallet backup
- Clear all wallets (with confirmation)
- Rename wallets

### Funding Operations
- Fund all wallets equally
- Fund with custom amounts
- Refund all SOL to main wallet
- Emergency fund recovery
- Balance verification

### Profile Operations
- Generate authentic profiles
- Randomize usernames and bios
- Create trading history
- Update profile pictures
- Bulk profile generation

### LUT Operations
- Create new lookup table
- Extend with new addresses
- Optimize address organization
- Monitor LUT usage
- Cleanup unused LUTs

## Dependencies
- **Upstream**: Team Architecture (project setup), Team UI Components (forms, grids), Team Authentication (user context)
- **Downstream**: Team Token Launch, Team Bundle Monitoring (wallet data)

## Integration Points
- Provide wallet data to all other teams
- Integrate with backend for wallet operations
- Share LUT information for bundle optimization
- Coordinate with authentication for wallet security

## Security Features
- Private key encryption in storage
- Multi-step confirmation for sensitive operations
- Wallet operation audit logging
- Secure backup/restore process
- Clear security warnings and education

## Quality Standards
- All wallet operations properly validated
- Secure handling of private keys
- Responsive interface for all screen sizes
- Clear error handling and recovery
- Comprehensive operation logging

## Performance Considerations
- Efficient wallet balance polling
- Batch operations for multiple wallets
- Optimized LUT operations
- Lazy loading for large wallet lists
- Cached wallet metadata

## Testing Requirements
- Unit tests for wallet operations
- Security testing for key handling
- Integration tests with backend
- UI testing for all wallet interfaces
- Performance testing for batch operations

## Data Models

### Wallet Interface
```typescript
interface Wallet {
  id: string;
  publicKey: string;
  privateKey?: string; // encrypted
  name?: string;
  balance: number;
  profile?: WalletProfile;
  isConnected: boolean;
  lastActivity?: Date;
}
```

### LookupTable Interface
```typescript
interface LookupTable {
  address: string;
  addresses: string[];
  maxAddresses: number;
  isExtended: boolean;
  createdAt: Date;
  lastExtended?: Date;
}
```

## Communication Requirements
- Document wallet security best practices
- Maintain wallet operation procedures
- Coordinate with backend team on wallet APIs
- Document LUT optimization strategies

## Success Criteria
- [ ] Wallet generation system fully functional
- [ ] SOL distribution working for all scenarios
- [ ] LUT management complete and optimized
- [ ] Profile generation system operational
- [ ] All wallet operations secure and tested

## Notes
- Consider hardware wallet integration for future
- Plan for wallet analytics and insights
- Implement wallet health monitoring
- Consider multi-signature wallet support
- Plan for wallet automation features