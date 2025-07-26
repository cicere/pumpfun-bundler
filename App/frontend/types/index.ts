// Re-export types from store
export type { Wallet, Token, Bundle } from '../lib/store'

// Additional type definitions
export interface ApiResponse<T> {
  data: T
  message?: string
  success: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  hasNext: boolean
  hasPrev: boolean
}

export interface TransactionStatus {
  signature: string
  status: 'pending' | 'confirmed' | 'failed'
  confirmations: number
  error?: string
}

export interface BundleExecution {
  bundleId: string
  status: 'preparing' | 'executing' | 'completed' | 'failed'
  transactions: TransactionStatus[]
  startedAt: Date
  completedAt?: Date
  error?: string
}

export interface WalletBalance {
  address: string
  balance: number
  tokenBalances: Array<{
    mint: string
    amount: number
    decimals: number
  }>
}

export interface MarketData {
  price: number
  priceChange24h: number
  volume24h: number
  marketCap: number
  liquidity: number
}