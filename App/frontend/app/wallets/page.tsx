"use client"

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { 
  Plus,
  Search,
  Wallet,
  Copy,
  Eye,
  EyeOff,
  MoreHorizontal,
  Download,
  Upload,
  Loader2,
  RefreshCw
} from 'lucide-react'
import { useWallets } from '@/hooks/useWallets'

export default function WalletsPage() {
  const { wallets, isLoading, error, createWallet, deleteWallet, refresh } = useWallets()
  const [searchTerm, setSearchTerm] = useState('')
  const [showPrivateKey, setShowPrivateKey] = useState<Record<string, boolean>>({})
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const filteredWallets = wallets.filter(wallet =>
    wallet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    wallet.address.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const togglePrivateKey = (walletId: string) => {
    setShowPrivateKey(prev => ({
      ...prev,
      [walletId]: !prev[walletId]
    }))
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // TODO: Add toast notification
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
            Wallet Management
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your Solana wallets for token bundling operations.
          </p>
          {error && (
            <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" size="sm" onClick={refresh} disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4 mr-2" />
            )}
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export All
          </Button>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
                disabled={isLoading}
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Wallet
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Wallet</DialogTitle>
              </DialogHeader>
              <CreateWalletForm onClose={() => setIsCreateDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Wallets</p>
              <p className="text-2xl font-bold text-gray-900">{wallets.length}</p>
            </div>
            <Wallet className="w-8 h-8 text-purple-600" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Wallets</p>
              <p className="text-2xl font-bold text-gray-900">
                {wallets.filter(w => w.status === 'active').length}
              </p>
            </div>
            <div className="w-3 h-3 bg-green-400 rounded-full" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Balance</p>
              <p className="text-2xl font-bold text-gray-900">
                {wallets.reduce((sum, w) => sum + w.balance, 0).toFixed(2)} SOL
              </p>
            </div>
            <div className="text-green-600 font-semibold">SOL</div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Generated</p>
              <p className="text-2xl font-bold text-gray-900">
                {wallets.filter(w => w.type === 'generated').length}
              </p>
            </div>
            <div className="text-purple-600 font-semibold">GEN</div>
          </div>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="p-6">
        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search wallets by name or address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Import
          </Button>
        </div>
      </Card>

      {/* Wallets Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Balance</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Used</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredWallets.map((wallet) => (
              <TableRow key={wallet.id}>
                <TableCell className="font-medium">{wallet.name}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                      {wallet.address.slice(0, 4)}...{wallet.address.slice(-4)}
                    </code>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(wallet.address)}
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="font-semibold">{wallet.balance.toFixed(2)} SOL</span>
                </TableCell>
                <TableCell>
                  <Badge variant={wallet.type === 'generated' ? 'default' : 'secondary'}>
                    {wallet.type}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant={wallet.status === 'active' ? 'default' : 'secondary'}
                    className={wallet.status === 'active' ? 'bg-green-100 text-green-800' : ''}
                  >
                    {wallet.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-gray-500">{wallet.lastUsed}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => togglePrivateKey(wallet.id)}
                    >
                      {showPrivateKey[wallet.id] ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-3 h-3" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}

function CreateWalletForm({ onClose }: { onClose: () => void }) {
  const { createWallet } = useWallets()
  const [walletName, setWalletName] = useState('')
  const [walletType, setWalletType] = useState<'generated' | 'imported'>('generated')
  const [privateKey, setPrivateKey] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormError(null)
    
    try {
      await createWallet({
        name: walletName,
        type: walletType,
        ...(walletType === 'imported' && privateKey && { private_key: privateKey })
      })
      onClose()
    } catch (error: any) {
      setFormError(error.response?.data?.message || 'Failed to create wallet')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {formError && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-700">{formError}</p>
        </div>
      )}
      
      <div>
        <Label htmlFor="walletName">Wallet Name</Label>
        <Input
          id="walletName"
          value={walletName}
          onChange={(e) => setWalletName(e.target.value)}
          placeholder="Enter wallet name"
          required
          disabled={isSubmitting}
        />
      </div>
      
      <div>
        <Label>Wallet Type</Label>
        <div className="flex space-x-4 mt-2">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="generated"
              checked={walletType === 'generated'}
              onChange={(e) => setWalletType(e.target.value as 'generated')}
            />
            <span>Generate New</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="imported"
              checked={walletType === 'imported'}
              onChange={(e) => setWalletType(e.target.value as 'imported')}
            />
            <span>Import Existing</span>
          </label>
        </div>
      </div>

      {walletType === 'imported' && (
        <div>
          <Label htmlFor="privateKey">Private Key</Label>
          <Input
            id="privateKey"
            type="password"
            value={privateKey}
            onChange={(e) => setPrivateKey(e.target.value)}
            placeholder="Enter private key"
            required
          />
        </div>
      )}

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button 
          type="submit" 
          className="bg-purple-600 hover:bg-purple-700"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Creating...
            </>
          ) : (
            'Create Wallet'
          )}
        </Button>
      </div>
    </form>
  )
}