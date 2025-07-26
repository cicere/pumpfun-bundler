# Team Authentication - Instructions

## Role and Responsibilities
You are the **Authentication Team** responsible for implementing secure user authentication, session management, and wallet integration for the Pump.Fun Bundler application.

## Primary Objectives
1. Implement email/password authentication system
2. Integrate Web3 wallet connection (Phantom, Solflare, etc.)
3. Create secure session management
4. Build user onboarding flow

## Development Guidelines

### Security Standards
- Implement secure password requirements
- Use JWT tokens for session management
- Encrypt sensitive data in local storage
- Implement CSRF protection
- Rate limiting for authentication attempts

### Authentication Methods
- Email/password authentication
- Web3 wallet connection (Solana wallets)
- Two-factor authentication (optional)
- Social login (future enhancement)

## Key Tasks

### Authentication Infrastructure
- [ ] Set up authentication context/store
- [ ] Implement JWT token management
- [ ] Create protected route wrapper
- [ ] Set up authentication middleware
- [ ] Implement logout and session cleanup

### Login/Register Pages
- [ ] Create login form with validation
- [ ] Build registration form with email verification
- [ ] Implement password reset flow
- [ ] Add "forgot password" functionality
- [ ] Create email verification page

### Web3 Wallet Integration
- [ ] Install wallet adapter libraries
- [ ] Implement wallet connection modal
- [ ] Handle multiple wallet types (Phantom, Solflare, etc.)
- [ ] Manage wallet connection state
- [ ] Handle wallet disconnect scenarios

### User Onboarding
- [ ] Create welcome flow for new users
- [ ] Build guided tour component
- [ ] Implement initial setup wizard
- [ ] Create profile completion flow
- [ ] Add wallet linking during onboarding

### Session Management
- [ ] Implement token refresh logic
- [ ] Handle expired sessions gracefully
- [ ] Create persistent login option
- [ ] Implement multi-tab synchronization
- [ ] Add session timeout warnings

## Component Specifications

### AuthProvider Component
```typescript
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  connectWallet: (walletType: WalletType) => Promise<void>;
  disconnectWallet: () => void;
  connectedWallet: ConnectedWallet | null;
}
```

### ProtectedRoute Component
```typescript
interface ProtectedRouteProps {
  children: React.ReactNode;
  requireWallet?: boolean;
  redirectTo?: string;
}
```

### WalletConnectionModal Component
```typescript
interface WalletConnectionProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (wallet: WalletType) => void;
  supportedWallets: WalletType[];
}
```

## Authentication Flow

### Registration Flow
1. User fills registration form
2. Email verification sent
3. User verifies email
4. Optional wallet connection
5. Profile setup completion
6. Redirect to dashboard

### Login Flow
1. User enters credentials
2. Server validation
3. JWT token generation
4. Store user session
5. Redirect to intended page

### Wallet Connection Flow
1. User clicks connect wallet
2. Wallet selection modal
3. Wallet approval request
4. Store wallet connection
5. Link to user account

## Dependencies
- **Upstream**: Team Architecture (project setup), Team UI Components (forms, modals)
- **Downstream**: Team Dashboard, Team Wallet Management (auth state)

## Integration Points
- Provide authentication context to all components
- Handle authentication state in navigation
- Integrate with backend authentication API
- Manage wallet connection across components

## Security Considerations
- Validate all inputs on client and server
- Implement proper password hashing
- Use secure HTTP-only cookies for tokens
- Implement rate limiting for login attempts
- Handle authentication errors securely

## Quality Standards
- Secure token storage and management
- Graceful error handling for all auth flows
- Mobile-responsive authentication forms
- Accessibility compliance for forms
- Proper loading states and feedback

## Testing Requirements
- Unit tests for authentication functions
- Integration tests for login/register flows
- Security testing for token management
- E2E tests for complete auth flows
- Wallet connection testing

## Performance Considerations
- Optimize wallet adapter bundle size
- Implement lazy loading for wallet components
- Cache authentication state efficiently
- Minimize re-authentication requests

## Communication Requirements
- Document authentication API integration
- Maintain security best practices guide
- Coordinate with backend team on token format
- Document wallet integration patterns

## Success Criteria
- [ ] Complete authentication system implemented
- [ ] Wallet connection working for major wallets
- [ ] Secure session management
- [ ] Smooth onboarding experience
- [ ] All authentication flows tested

## Notes
- Consider implementing social login in future
- Plan for multi-factor authentication
- Ensure compatibility with mobile wallets
- Consider biometric authentication for mobile
- Plan for account recovery mechanisms