# Team Dashboard - Instructions

## Role and Responsibilities
You are the **Dashboard Team** responsible for creating the main application interface, navigation system, and overview components for the Pump.Fun Bundler application.

## Primary Objectives
1. Build the main dashboard layout and navigation
2. Create portfolio overview and status cards
3. Implement real-time status monitoring
4. Design quick action interfaces

## Development Guidelines

### Dashboard Architecture
- Responsive layout with sidebar navigation
- Real-time data updates via WebSocket/polling
- Modular card-based interface
- Mobile-first responsive design
- Efficient state management for live data

### Key Features
- Portfolio overview cards
- Active bundle monitoring
- Recent activity feed
- Quick action buttons
- System status indicators

## Key Tasks

### Layout and Navigation
- [ ] Create main dashboard layout component
- [ ] Build responsive sidebar navigation
- [ ] Implement tab-based navigation system
- [ ] Create breadcrumb navigation
- [ ] Add mobile navigation drawer

### Overview Cards
- [ ] Portfolio summary card (total tokens, value)
- [ ] Active bundles card with live status
- [ ] Wallet health overview card
- [ ] Recent transactions card
- [ ] System status card (RPC, Jito)

### Real-time Monitoring
- [ ] Implement WebSocket connection for live updates
- [ ] Create bundle status tracking
- [ ] Build transaction monitoring
- [ ] Add network status monitoring
- [ ] Implement alert/notification system

### Quick Actions
- [ ] Create "Launch Token" quick action
- [ ] Build "Create Bundle" shortcut
- [ ] Add "Fund Wallets" quick action
- [ ] Implement "Check Balances" button
- [ ] Create emergency stop functionality

### Data Visualization
- [ ] Portfolio performance charts
- [ ] Bundle success rate visualization
- [ ] Transaction volume charts
- [ ] Network performance metrics
- [ ] Profit/loss tracking

## Component Specifications

### DashboardLayout Component
```typescript
interface DashboardLayoutProps {
  children: React.ReactNode;
  user: User;
  navigation: NavigationItem[];
  notifications: Notification[];
}
```

### PortfolioOverview Component
```typescript
interface PortfolioOverviewProps {
  totalValue: number;
  activeTokens: number;
  activeBundles: number;
  todayPnL: number;
  isLoading?: boolean;
}
```

### BundleMonitor Component
```typescript
interface BundleMonitorProps {
  bundles: Bundle[];
  onBundleClick: (bundleId: string) => void;
  onRetry: (bundleId: string) => void;
  refreshInterval?: number;
}
```

### QuickActions Component
```typescript
interface QuickActionsProps {
  onLaunchToken: () => void;
  onCreateBundle: () => void;
  onFundWallets: () => void;
  onCheckBalances: () => void;
  isDisabled?: boolean;
}
```

## Dashboard Sections

### Header Section
- Application logo and title
- User profile dropdown
- Notification bell with count
- Network status indicator
- Wallet connection status

### Sidebar Navigation
- Dashboard (home)
- Wallets
- Token Launch
- Active Bundles
- Analytics
- Settings
- Help & Support

### Main Content Area
- Overview cards grid
- Recent activity section
- Quick actions panel
- System alerts area

### Footer Section
- System status indicators
- Last update timestamp
- Support contact info

## Dependencies
- **Upstream**: Team Architecture (routing), Team UI Components (cards, charts), Team Authentication (user state)
- **Downstream**: Provides navigation to all feature teams

## Integration Points
- Navigate to other application sections
- Display data from all other teams
- Provide centralized notification system
- Manage global application state

## Real-time Data Requirements
- Bundle execution status
- Transaction confirmations
- Wallet balance updates
- Network status changes
- Market data updates (optional)

## Quality Standards
- Sub-second update times for critical data
- Graceful degradation when offline
- Efficient data polling/WebSocket usage
- Smooth animations and transitions
- Consistent loading states across cards

## Performance Considerations
- Optimize chart rendering for large datasets
- Implement virtual scrolling for large lists
- Cache frequently accessed data
- Debounce real-time updates
- Lazy load non-critical dashboard sections

## Mobile Responsiveness
- Collapsible sidebar for mobile
- Touch-friendly navigation
- Optimized card layouts for small screens
- Swipe gestures for navigation
- Bottom tab bar for mobile

## Testing Requirements
- Unit tests for all dashboard components
- Integration tests for navigation flows
- Real-time update testing
- Responsive design testing
- Performance testing for data updates

## Communication Requirements
- Document real-time data integration patterns
- Maintain dashboard state management guide
- Coordinate with teams for data requirements
- Document navigation and routing patterns

## Success Criteria
- [ ] Responsive dashboard layout complete
- [ ] Real-time monitoring functional
- [ ] Navigation system working across all tabs
- [ ] Overview cards displaying live data
- [ ] Quick actions properly integrated

## Notes
- Consider dashboard customization options
- Plan for different user roles/permissions
- Implement keyboard shortcuts for power users
- Consider dashboard themes (dark/light mode)
- Plan for dashboard analytics and user behavior tracking