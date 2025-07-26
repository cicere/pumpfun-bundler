"use client"

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
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
  Coins,
  Copy,
  ExternalLink,
  MoreHorizontal,
  Upload,
  Rocket,
  Eye,
  TrendingUp
} from 'lucide-react'

// Mock token data
const mockTokens = [
  {
    id: '1',
    name: 'MemeCoin',
    symbol: 'MEME',
    mint: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
    totalSupply: 1000000000,
    decimals: 6,
    status: 'launched',
    bundleCount: 3,
    marketCap: 125000,
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    name: 'PumpToken',
    symbol: 'PUMP',
    mint: '8yKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
    totalSupply: 500000000,
    decimals: 9,
    status: 'pending',
    bundleCount: 1,
    marketCap: 0,
    createdAt: '2024-01-16',
  },
  {
    id: '3',
    name: 'RocketCoin',
    symbol: 'ROCKET',
    mint: '9zKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
    totalSupply: 2000000000,
    decimals: 6,
    status: 'failed',
    bundleCount: 0,
    marketCap: 0,
    createdAt: '2024-01-14',
  },
]

export default function TokensPage() {
  const [tokens, setTokens] = useState(mockTokens)
  const [searchTerm, setSearchTerm] = useState('')
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const filteredTokens = tokens.filter(token =>
    token.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    token.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    token.mint.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // TODO: Add toast notification
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'launched':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
            Token Management
          </h1>
          <p className="text-gray-600 mt-1">
            Create and manage your Solana tokens for bundle operations.
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" size="sm">
            <Upload className="w-4 h-4 mr-2" />
            Import Token
          </Button>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800">
                <Plus className="w-4 h-4 mr-2" />
                Create Token
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Token</DialogTitle>
              </DialogHeader>
              <CreateTokenForm onClose={() => setIsCreateDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Tokens</p>
              <p className="text-2xl font-bold text-gray-900">{tokens.length}</p>
            </div>
            <Coins className="w-8 h-8 text-purple-600" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Launched</p>
              <p className="text-2xl font-bold text-gray-900">
                {tokens.filter(t => t.status === 'launched').length}
              </p>
            </div>
            <Rocket className="w-8 h-8 text-green-600" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900">
                {tokens.filter(t => t.status === 'pending').length}
              </p>
            </div>
            <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
              <div className="w-4 h-4 bg-yellow-500 rounded-full" />
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Market Cap</p>
              <p className="text-2xl font-bold text-gray-900">
                ${tokens.reduce((sum, t) => sum + t.marketCap, 0).toLocaleString()}
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-600" />
          </div>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="p-6">
        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search tokens by name, symbol, or mint address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </Card>

      {/* Tokens Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Token</TableHead>
              <TableHead>Mint Address</TableHead>
              <TableHead>Supply</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Bundles</TableHead>
              <TableHead>Market Cap</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTokens.map((token) => (
              <TableRow key={token.id}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {token.symbol.slice(0, 2)}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{token.name}</div>
                      <div className="text-sm text-gray-500">{token.symbol}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                      {token.mint.slice(0, 8)}...{token.mint.slice(-8)}
                    </code>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(token.mint)}
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-semibold">
                      {(token.totalSupply / 1000000).toFixed(1)}M
                    </div>
                    <div className="text-sm text-gray-500">
                      {token.decimals} decimals
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(token.status)}>
                    {token.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className="font-medium">{token.bundleCount}</span>
                </TableCell>
                <TableCell>
                  <span className="font-semibold">
                    ${token.marketCap.toLocaleString()}
                  </span>
                </TableCell>
                <TableCell className="text-gray-500">
                  {token.createdAt}
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="w-3 h-3" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="w-3 h-3" />
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

function CreateTokenForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: '',
    symbol: '',
    description: '',
    image: '',
    totalSupply: '',
    decimals: '6',
    twitter: '',
    telegram: '',
    website: '',
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement token creation logic
    console.log('Creating token:', formData)
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Token Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="e.g., My Awesome Token"
              required
            />
          </div>
          <div>
            <Label htmlFor="symbol">Symbol *</Label>
            <Input
              id="symbol"
              value={formData.symbol}
              onChange={(e) => handleInputChange('symbol', e.target.value.toUpperCase())}
              placeholder="e.g., MAT"
              maxLength={10}
              required
            />
          </div>
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Describe your token..."
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="image">Image URL</Label>
          <Input
            id="image"
            type="url"
            value={formData.image}
            onChange={(e) => handleInputChange('image', e.target.value)}
            placeholder="https://example.com/token-image.png"
          />
        </div>
      </div>

      {/* Token Configuration */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Token Configuration</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="totalSupply">Total Supply *</Label>
            <Input
              id="totalSupply"
              type="number"
              value={formData.totalSupply}
              onChange={(e) => handleInputChange('totalSupply', e.target.value)}
              placeholder="1000000000"
              required
            />
          </div>
          <div>
            <Label htmlFor="decimals">Decimals *</Label>
            <select
              id="decimals"
              value={formData.decimals}
              onChange={(e) => handleInputChange('decimals', e.target.value)}
              className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              required
            >
              <option value="6">6 (Standard)</option>
              <option value="9">9 (High Precision)</option>
              <option value="3">3 (Low Precision)</option>
              <option value="0">0 (No Decimals)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Social Links</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="twitter">Twitter</Label>
            <Input
              id="twitter"
              value={formData.twitter}
              onChange={(e) => handleInputChange('twitter', e.target.value)}
              placeholder="@mytoken"
            />
          </div>
          <div>
            <Label htmlFor="telegram">Telegram</Label>
            <Input
              id="telegram"
              value={formData.telegram}
              onChange={(e) => handleInputChange('telegram', e.target.value)}
              placeholder="t.me/mytoken"
            />
          </div>
          <div>
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              type="url"
              value={formData.website}
              onChange={(e) => handleInputChange('website', e.target.value)}
              placeholder="https://mytoken.com"
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end space-x-3 pt-6 border-t">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
          Create Token
        </Button>
      </div>
    </form>
  )
}