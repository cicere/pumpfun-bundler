# Frontend Specification - PumpFun Bundler

## OVERVIEW
Modern React-based web application built with Next.js 14 that provides an intuitive interface for managing Solana token bundles on Pump.Fun.

## TECHNOLOGY STACK
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5.0+
- **Styling**: Tailwind CSS 3.4+
- **UI Components**: Shadcn UI
- **State Management**: Zustand
- **API Client**: Axios
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Charts**: Recharts (for analytics)

## PROJECT STRUCTURE
```
App/frontend/
├── app/                    # Next.js App Router
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx           # Landing page
│   ├── dashboard/         # Main dashboard
│   ├── wallets/           # Wallet management
│   ├── tokens/            # Token operations
│   └── bundles/           # Bundle creation/management
├── components/            # Reusable UI components
│   ├── ui/               # Shadcn UI components
│   ├── forms/            # Form components
│   ├── tables/           # Data table components
│   └── charts/           # Chart components
├── lib/                  # Utilities and configurations
│   ├── api.ts           # API client configuration
│   ├── utils.ts         # Utility functions
│   ├── validations.ts   # Zod schemas
│   └── store.ts         # Zustand store
├── hooks/               # Custom React hooks
├── types/               # TypeScript type definitions
└── public/              # Static assets
```

## PAGES & ROUTING

### Main Routes
```
/                         # Landing page
/dashboard               # Main dashboard overview
/wallets                 # Wallet management
/wallets/create          # Create new wallet
/wallets/[id]           # Wallet details
/tokens                 # Token management
/tokens/create          # Create new token
/tokens/[id]            # Token details
/bundles                # Bundle management
/bundles/create         # Create new bundle
/bundles/[id]           # Bundle details
/settings               # Application settings
```

## COMPONENT ARCHITECTURE

### Layout Components
```tsx
// Main layout with navigation
const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <Header />
        {children}
      </main>
    </div>
  )
}
```

### Feature Components
```tsx
// Wallet creation form
const WalletCreateForm = () => {
  const form = useForm<WalletFormData>({
    resolver: zodResolver(walletSchema)
  })
  
  return (
    <Form {...form}>
      <WalletNameField />
      <WalletTypeSelect />
      <SubmitButton />
    </Form>
  )
}
```

## STATE MANAGEMENT

### Zustand Store Structure
```typescript
interface AppStore {
  // Wallet state
  wallets: Wallet[]
  selectedWallet: Wallet | null
  setWallets: (wallets: Wallet[]) => void
  
  // Token state
  tokens: Token[]
  selectedToken: Token | null
  setTokens: (tokens: Token[]) => void
  
  // Bundle state
  bundles: Bundle[]
  activeBundles: Bundle[]
  setBundles: (bundles: Bundle[]) => void
  
  // UI state
  isLoading: boolean
  error: string | null
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
}
```

## UI/UX SPECIFICATIONS

### Design System
- **Primary Colors**: Purple gradient (#8B5CF6 to #A855F7)
- **Secondary Colors**: Slate/Gray scale
- **Typography**: Inter font family
- **Spacing**: 4px base unit (Tailwind spacing scale)
- **Border Radius**: 8px default, 12px for cards
- **Shadows**: Subtle drop shadows with purple tint

### Component Patterns
```tsx
// Card component pattern
const Card = ({ title, children, className }: CardProps) => (
  <div className={cn("rounded-xl border bg-card p-6 shadow-sm", className)}>
    {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
    {children}
  </div>
)

// Button variants
<Button variant="default">Primary Action</Button>
<Button variant="secondary">Secondary Action</Button>
<Button variant="outline">Outline Action</Button>
<Button variant="ghost">Ghost Action</Button>
```

### Responsive Design
- **Mobile First**: Base styles for mobile (375px+)
- **Tablet**: md: breakpoint (768px+)
- **Desktop**: lg: breakpoint (1024px+)
- **Large Desktop**: xl: breakpoint (1280px+)

## KEY FEATURES & COMPONENTS

### Dashboard
```tsx
const Dashboard = () => (
  <div className="space-y-6">
    <StatsOverview />
    <RecentActivity />
    <ActiveBundles />
    <QuickActions />
  </div>
)
```

### Wallet Management
```tsx
const WalletPage = () => (
  <div>
    <WalletHeader />
    <WalletFilters />
    <WalletTable />
    <WalletActions />
  </div>
)
```

### Bundle Creator
```tsx
const BundleCreator = () => {
  const [step, setStep] = useState(1)
  
  return (
    <div>
      <BundleSteps currentStep={step} />
      {step === 1 && <TokenSelection />}
      {step === 2 && <WalletSelection />}
      {step === 3 && <BundleConfiguration />}
      {step === 4 && <BundleReview />}
    </div>
  )
}
```

## FORMS & VALIDATION

### Zod Schemas
```typescript
const walletSchema = z.object({
  name: z.string().min(1, "Name is required").max(50),
  type: z.enum(["generated", "imported"]),
  privateKey: z.string().optional(),
})

const tokenSchema = z.object({
  name: z.string().min(1).max(32),
  symbol: z.string().min(1).max(10),
  description: z.string().max(200),
  image: z.instanceof(File).optional(),
  website: z.string().url().optional(),
  twitter: z.string().optional(),
  telegram: z.string().optional(),
})
```

## API INTEGRATION

### API Client Setup
```typescript
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// API hooks
const useWallets = () => {
  return useQuery({
    queryKey: ['wallets'],
    queryFn: () => apiClient.get('/api/wallets'),
  })
}
```

### Error Handling
```tsx
const ErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  return (
    <ErrorBoundaryComponent
      fallback={<ErrorFallback />}
      onError={(error) => console.error('App Error:', error)}
    >
      {children}
    </ErrorBoundaryComponent>
  )
}
```

## PERFORMANCE OPTIMIZATION

### Code Splitting
```typescript
// Lazy load heavy components
const BundleCreator = lazy(() => import('./components/BundleCreator'))
const Analytics = lazy(() => import('./components/Analytics'))
```

### Memoization
```tsx
const ExpensiveComponent = memo(({ data }: Props) => {
  const processedData = useMemo(() => 
    processLargeDataset(data), [data]
  )
  
  return <div>{processedData}</div>
})
```

## ACCESSIBILITY
- **WCAG 2.1 AA Compliance**
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader**: Proper ARIA labels and roles
- **Focus Management**: Visible focus indicators
- **Color Contrast**: Minimum 4.5:1 ratio

## TESTING STRATEGY
```typescript
// Component testing with React Testing Library
test('wallet creation form submits correctly', async () => {
  render(<WalletCreateForm />)
  
  await userEvent.type(screen.getByLabelText('Wallet Name'), 'Test Wallet')
  await userEvent.click(screen.getByRole('button', { name: 'Create Wallet' }))
  
  expect(screen.getByText('Wallet created successfully')).toBeInTheDocument()
})
```

## BUILD & DEPLOYMENT
```bash
# Development
npm run dev

# Build
npm run build

# Production
npm start

# Type checking
npm run type-check

# Linting
npm run lint
```

## ENVIRONMENT VARIABLES
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_APP_NAME=PumpFun Bundler
NEXT_PUBLIC_VERSION=1.0.0
```
