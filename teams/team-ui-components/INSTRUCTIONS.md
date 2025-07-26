# Team UI Components - Instructions

## Role and Responsibilities
You are the **UI Components Team** responsible for creating the reusable component library and design system for the Pump.Fun Bundler application.
use ../App/docs/ui-reference/shadcn-component-mapping.md as reference


## Primary Objectives
1. Integrate and customize shadcn/ui components
2. Create custom components specific to token launch operations
3. Establish consistent design patterns
4. Build responsive and accessible components

## Development Guidelines

### Component Standards
- Use shadcn/ui as base component library
- Follow compound component patterns
- Implement proper TypeScript interfaces
- Ensure accessibility (WCAG 2.1 AA)
- Mobile-first responsive design

### Component Categories

#### Core UI Components (shadcn/ui based)
- Button variants for different actions
- Form components with validation
- Modal and dialog components
- Navigation components
- Data display components (tables, cards)

#### Custom Domain Components
- WalletCard component
- TokenLaunchForm component
- BundleStatusIndicator component
- TransactionHistory component
- AnalyticsChart component

## Key Tasks

### shadcn/ui Integration
- [ ] Install and configure shadcn/ui CLI
- [ ] Add core components: Button, Input, Card, Dialog, Table
- [ ] Add form components: Form, Select, Checkbox, Switch
- [ ] Add navigation: Tabs, Breadcrumb, DropdownMenu
- [ ] Add feedback: Alert, Toast, Progress, Badge

### Custom Component Development
- [ ] Create WalletCard component with balance display
- [ ] Build TokenMetadataForm with image upload
- [ ] Develop BundleStatusTracker with real-time updates
- [ ] Create LaunchStrategySelector component
- [ ] Build TransactionTable with filtering
- [ ] Design AnalyticsWidget components

### Design System
- [ ] Define color palette for token launch themes
- [ ] Create typography scale
- [ ] Establish spacing and sizing conventions
- [ ] Define animation and transition patterns
- [ ] Create icon library for blockchain operations

### Component Documentation
- [ ] Create Storybook setup (optional)
- [ ] Document component APIs
- [ ] Provide usage examples
- [ ] Create component guidelines

## Component Specifications

### WalletCard Component
```typescript
interface WalletCardProps {
  address: string;
  balance: number;
  isConnected: boolean;
  profile?: WalletProfile;
  onConnect?: () => void;
  onDisconnect?: () => void;
}
```

### TokenLaunchForm Component
```typescript
interface TokenLaunchFormProps {
  onSubmit: (data: TokenMetadata) => void;
  initialData?: Partial<TokenMetadata>;
  isLoading?: boolean;
  strategies: LaunchStrategy[];
}
```

### BundleStatusIndicator Component
```typescript
interface BundleStatusProps {
  bundleId: string;
  status: 'pending' | 'executing' | 'success' | 'failed';
  transactions: Transaction[];
  onRetry?: () => void;
}
```

## Dependencies
- **Upstream**: Team Architecture (project setup)
- **Downstream**: All feature teams (component usage)

## Integration Points
- Provide component library for all feature teams
- Establish design tokens and themes
- Create reusable form patterns
- Implement consistent loading and error states

## Quality Standards
- Components are fully typed with TypeScript
- All components are responsive (mobile-first)
- Accessibility compliance (keyboard navigation, screen readers)
- Consistent error handling and loading states
- Proper component composition patterns

## Testing Requirements
- Unit tests for all custom components
- Visual regression testing setup
- Accessibility testing
- Cross-browser compatibility testing

## Performance Considerations
- Optimize component bundle size
- Implement proper memoization
- Lazy load heavy components
- Optimize re-renders with React.memo

## Communication Requirements
- Document component APIs and usage
- Maintain component changelog
- Coordinate with design decisions
- Provide migration guides for component updates

## Success Criteria
- [ ] Complete shadcn/ui integration
- [ ] All custom components implemented
- [ ] Design system documentation complete
- [ ] Components are accessible and responsive
- [ ] Other teams can use components effectively

## Notes
- Focus on reusability and composition
- Consider dark/light theme support
- Plan for internationalization
- Ensure components work well with form libraries
- Consider animation and micro-interactions for better UX