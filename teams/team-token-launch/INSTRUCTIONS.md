# Team Token Launch - Instructions

## Role and Responsibilities
You are the **Token Launch Team** responsible for implementing the token creation interface, launch strategy selection, and execution workflows for the Pump.Fun Bundler application.

## Primary Objectives
1. Create token metadata configuration interface
2. Build launch strategy selection and configuration
3. Implement launch execution and monitoring
4. Develop pre-launch validation and simulation tools

## Development Guidelines

### Launch Strategy Architecture
- Support for multiple launch modes (Bundle, Stagger, Magic, etc.)
- Real-time launch execution monitoring
- Comprehensive pre-launch validation
- Strategy-specific configuration options
- Launch simulation and preview tools

### Token Metadata Management
- IPFS image upload integration
- Metadata validation and preview
- Social media link validation
- Token symbol and name validation
- Character limits and format enforcement

## Key Tasks

### Token Configuration Interface
- [ ] Create token metadata form with validation
- [ ] Build image upload component with IPFS integration
- [ ] Implement social links configuration
- [ ] Add metadata preview component
- [ ] Create token configuration wizard

### Launch Strategy Selection
- [ ] Build strategy selection interface with descriptions
- [ ] Create strategy-specific configuration panels
- [ ] Implement buy amount configuration
- [ ] Add wallet selection for launch
- [ ] Build launch timing configuration

### Execution Interface
- [ ] Create launch button with confirmation dialog
- [ ] Build real-time launch progress tracker
- [ ] Implement launch status monitoring
- [ ] Add post-launch action suggestions
- [ ] Create launch result summary

### Validation and Simulation
- [ ] Build pre-launch checklist component
- [ ] Implement buy simulation calculator
- [ ] Create strategy impact analysis
- [ ] Add wallet readiness validation
- [ ] Build launch cost estimator

### Advanced Features
- [ ] Implement clone metadata functionality
- [ ] Build launch scheduling system
- [ ] Create launch templates and presets
- [ ] Add bulk launch management
- [ ] Implement launch analytics tracking

## Component Specifications

### TokenConfigurationForm Component
```typescript
interface TokenConfigurationProps {
  onSubmit: (metadata: TokenMetadata) => void;
  initialData?: Partial<TokenMetadata>;
  isLoading?: boolean;
  onImageUpload: (file: File) => Promise<string>;
}
```

### LaunchStrategySelector Component
```typescript
interface LaunchStrategySelectorProps {
  strategies: LaunchStrategy[];
  selectedStrategy: string;
  onStrategySelect: (strategyId: string) => void;
  wallets: Wallet[];
  onConfigurationChange: (config: StrategyConfig) => void;
}
```

### LaunchExecutor Component
```typescript
interface LaunchExecutorProps {
  tokenConfig: TokenMetadata;
  strategyConfig: StrategyConfig;
  wallets: Wallet[];
  onLaunch: () => Promise<LaunchResult>;
  onCancel: () => void;
}
```

### BuySimulator Component
```typescript
interface BuySimulatorProps {
  wallets: Wallet[];
  buyAmounts: Record<string, number>;
  strategy: LaunchStrategy;
  onSimulate: () => SimulationResult;
  tokenSupply: number;
}
```

## Launch Strategy Implementations

### Bundle Launch Strategy
- Creates token and executes all buys in single bundle
- Maximum protection against front-running
- Simultaneous execution across all wallets
- Configurable buy amounts per wallet

### Stagger Launch Strategy
- Sequential buying with configurable delays
- Natural-looking trading patterns
- Randomized timing variations
- Volume-based execution triggers

### Magic Mode Strategy
- Advanced launch with immediate sniping
- High-risk, high-reward approach
- Sophisticated timing coordination
- Enhanced front-running protection

### Sniper Dump Strategy
- Anti-sniper defensive mechanism
- Volume threshold triggers
- Automated dump execution
- Counter-sniper coordination

## Pre-Launch Validation

### Wallet Validation
- Sufficient SOL balance checks
- Wallet connectivity verification
- LUT readiness confirmation
- Profile completeness assessment

### Configuration Validation
- Token metadata completeness
- Image format and size validation
- Social link verification
- Strategy parameter validation

### Network Validation
- RPC connection health
- Jito engine availability
- Network congestion assessment
- Gas price optimization

## Dependencies
- **Upstream**: Team Architecture (routing), Team UI Components (forms, modals), Team Wallet Management (wallet data)
- **Downstream**: Team Bundle Monitoring (launch tracking), Team Analytics (launch metrics)

## Integration Points
- Coordinate with wallet management for launch wallets
- Integrate with bundle monitoring for real-time tracking
- Connect with backend for launch execution
- Share launch data with analytics team

## Launch Execution Flow
1. **Configuration**: Token metadata and strategy setup
2. **Validation**: Pre-launch checks and confirmations
3. **Preparation**: Wallet preparation and LUT optimization
4. **Execution**: Bundle submission and transaction monitoring
5. **Monitoring**: Real-time status tracking and updates
6. **Completion**: Results summary and next actions

## Quality Standards
- Comprehensive input validation
- Real-time execution feedback
- Error recovery mechanisms
- Mobile-responsive interfaces
- Accessibility compliance

## Performance Considerations
- Optimized image upload and processing
- Efficient bundle preparation
- Real-time status updates
- Minimal execution latency
- Robust error handling

## Testing Requirements
- Unit tests for all launch components
- Integration tests for launch flows
- Simulation accuracy testing
- Error scenario testing
- Performance testing under load

## Data Models

### TokenMetadata Interface
```typescript
interface TokenMetadata {
  name: string;
  symbol: string;
  description: string;
  image: string;
  imageFile?: File;
  twitter?: string;
  telegram?: string;
  website?: string;
  showName: boolean;
}
```

### LaunchStrategy Interface
```typescript
interface LaunchStrategy {
  id: string;
  name: string;
  description: string;
  riskLevel: 'low' | 'medium' | 'high';
  features: string[];
  configOptions: ConfigOption[];
}
```

### StrategyConfig Interface
```typescript
interface StrategyConfig {
  strategyId: string;
  buyAmounts: Record<string, number>;
  selectedWallets: string[];
  timing?: TimingConfig;
  advanced?: AdvancedConfig;
}
```

## Communication Requirements
- Document launch strategy best practices
- Maintain launch execution procedures
- Coordinate with backend team on launch APIs
- Document troubleshooting guides

## Success Criteria
- [ ] Token configuration interface complete
- [ ] All launch strategies implemented
- [ ] Launch execution system functional
- [ ] Validation and simulation tools working
- [ ] Launch monitoring integrated

## Notes
- Consider launch scheduling features
- Plan for launch template system
- Implement launch history tracking
- Consider batch launch capabilities
- Plan for launch performance optimization