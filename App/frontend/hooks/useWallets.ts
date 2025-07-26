import { useState, useEffect } from 'react'
import { api } from '@/lib/api'
import { useAppStore } from '@/lib/store'
import type { Wallet } from '@/lib/store'

interface CreateWalletData {
  name: string
  type: 'generated' | 'imported'
  private_key?: string
}

export const useWallets = () => {
  const { wallets, setWallets, setLoading, setError, isLoading, error } = useAppStore()
  
  // Fetch all wallets
  const fetchWallets = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await api.wallets.getAll()
      const walletsData = response.data.map((wallet: any) => ({
        ...wallet,
        address: wallet.public_key || 'Generating...', // Map public_key to address for UI compatibility
        type: wallet.type || 'generated',
        status: wallet.is_active ? 'active' : 'inactive',
        lastUsed: new Date(wallet.updated_at).toLocaleString()
      }))
      setWallets(walletsData)
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch wallets')
      console.error('Error fetching wallets:', err)
    } finally {
      setLoading(false)
    }
  }

  // Create new wallet
  const createWallet = async (data: CreateWalletData) => {
    try {
      setLoading(true)
      setError(null)
      
      const payload = {
        name: data.name,
        type: data.type,
        ...(data.private_key && { private_key: data.private_key })
      }
      
      const response = await api.wallets.create(payload)
      const newWallet = {
        ...response.data,
        address: response.data.public_key,
        type: response.data.type || data.type,
        status: response.data.is_active ? 'active' : 'inactive',
        lastUsed: new Date(response.data.updated_at).toLocaleString()
      }
      
      setWallets([...wallets, newWallet])
      return newWallet
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create wallet')
      console.error('Error creating wallet:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Update wallet
  const updateWallet = async (id: string, data: Partial<CreateWalletData>) => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await api.wallets.update(id, data)
      const updatedWallet = {
        ...response.data,
        address: response.data.public_key,
        type: response.data.type || 'generated',
        status: response.data.is_active ? 'active' : 'inactive',
        lastUsed: new Date(response.data.updated_at).toLocaleString()
      }
      
      setWallets(wallets.map(w => w.id === id ? updatedWallet : w))
      return updatedWallet
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update wallet')
      console.error('Error updating wallet:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Delete wallet
  const deleteWallet = async (id: string) => {
    try {
      setLoading(true)
      setError(null)
      
      await api.wallets.delete(id)
      setWallets(wallets.filter(w => w.id !== id))
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to delete wallet')
      console.error('Error deleting wallet:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Auto-fetch on mount
  useEffect(() => {
    if (wallets.length === 0) {
      fetchWallets()
    }
  }, [])

  return {
    wallets,
    isLoading,
    error,
    fetchWallets,
    createWallet,
    updateWallet,
    deleteWallet,
    refresh: fetchWallets
  }
}