import { create } from 'zustand'

// Types
interface Wallet {
  id: string
  name: string
  public_key: string
  private_key?: string
  balance: number
  token_accounts: Array<{
    mint: string
    amount: number
  }>
  created_at: string
  updated_at: string
  is_active: boolean
  type?: 'generated' | 'imported'
}

interface Token {
  id: string
  name: string
  symbol: string
  address: string
  description?: string
  image?: string
  website?: string
  twitter?: string
  telegram?: string
}

interface Bundle {
  id: string
  name: string
  tokenId: string
  walletIds: string[]
  status: 'pending' | 'active' | 'completed' | 'failed'
  createdAt: Date
  updatedAt: Date
}

// Store interface
interface AppStore {
  // Wallet state
  wallets: Wallet[]
  selectedWallet: Wallet | null
  setWallets: (wallets: Wallet[]) => void
  setSelectedWallet: (wallet: Wallet | null) => void
  
  // Token state
  tokens: Token[]
  selectedToken: Token | null
  setTokens: (tokens: Token[]) => void
  setSelectedToken: (token: Token | null) => void
  
  // Bundle state
  bundles: Bundle[]
  activeBundles: Bundle[]
  setBundles: (bundles: Bundle[]) => void
  setActiveBundles: (bundles: Bundle[]) => void
  
  // UI state
  isLoading: boolean
  error: string | null
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
}

// Create store
export const useAppStore = create<AppStore>((set) => ({
  // Wallet state
  wallets: [],
  selectedWallet: null,
  setWallets: (wallets) => set({ wallets }),
  setSelectedWallet: (selectedWallet) => set({ selectedWallet }),
  
  // Token state
  tokens: [],
  selectedToken: null,
  setTokens: (tokens) => set({ tokens }),
  setSelectedToken: (selectedToken) => set({ selectedToken }),
  
  // Bundle state
  bundles: [],
  activeBundles: [],
  setBundles: (bundles) => set({ bundles }),
  setActiveBundles: (activeBundles) => set({ activeBundles }),
  
  // UI state
  isLoading: false,
  error: null,
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}))

// Export types
export type { Wallet, Token, Bundle }