import { Wallet as StoreWallet } from './store'

// Backend wallet interface
export interface BackendWallet {
  id: string
  name: string
  public_key: string
  private_key: string
  balance: number
  token_accounts: Array<{
    mint: string
    amount: number
  }>
  created_at: string
  updated_at: string
  is_active: boolean
}

// Transform backend wallet to frontend wallet
export const transformWallet = (backendWallet: BackendWallet): StoreWallet => {
  return {
    id: backendWallet.id,
    name: backendWallet.name,
    public_key: backendWallet.public_key,
    private_key: backendWallet.private_key,
    balance: backendWallet.balance,
    token_accounts: backendWallet.token_accounts,
    created_at: backendWallet.created_at,
    updated_at: backendWallet.updated_at,
    is_active: backendWallet.is_active,
    type: 'generated' as const, // Default type, can be enhanced later
  }
}

// Transform multiple wallets
export const transformWallets = (backendWallets: BackendWallet[]): StoreWallet[] => {
  return backendWallets.map(transformWallet)
}

// Create wallet payload for backend
export interface CreateWalletPayload {
  name: string
  private_key?: string
}

export const createWalletPayload = (name: string, privateKey?: string): CreateWalletPayload => {
  const payload: CreateWalletPayload = { name }
  if (privateKey) {
    payload.private_key = privateKey
  }
  return payload
}