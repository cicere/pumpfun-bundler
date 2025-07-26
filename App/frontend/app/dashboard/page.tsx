"use client"

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Wallet, 
  Coins, 
  Package, 
  TrendingUp, 
  Activity,
  Plus,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'

// Mock data - will be replaced with real data later
const stats = [
  {
    title: 'Total Wallets',
    value: '24',
    change: '+2',
    changeType: 'positive',
    icon: Wallet,
  },
  {
    title: 'Active Bundles',
    value: '5',
    change: '+1',
    changeType: 'positive',
    icon: Package,
  },
  {
    title: 'Tokens Created',
    value: '12',
    change: '+3',
    changeType: 'positive',
    icon: Coins,
  },
  {
    title: 'Total Volume',
    value: '1,247 SOL',
    change: '+156 SOL',
    changeType: 'positive',
    icon: TrendingUp,
  },
]

const recentActivity = [
  {
    id: 1,
    type: 'bundle_created',
    title: 'New bundle created',
    description: 'MEMECOIN bundle with 10 wallets',
    time: '2 min ago',
    status: 'success',
  },
  {
    id: 2,
    type: 'wallet_funded',
    title: 'Wallets funded',
    description: '5 wallets funded with 0.5 SOL each',
    time: '5 min ago',
    status: 'success',
  },
  {
    id: 3,
    type: 'token_launched',
    title: 'Token launched',
    description: 'PUMP token successfully launched',
    time: '12 min ago',
    status: 'success',
  },
  {
    id: 4,
    type: 'sell_executed',
    title: 'Sell order executed',
    description: 'Sold 50% of MEME holdings',
    time: '18 min ago',
    status: 'warning',
  },
]

const activeBundles = [
  {
    id: 1,
    name: 'MEMECOIN Launch',
    token: 'MEME',
    wallets: 10,
    status: 'active',
    progress: 75,
  },
  {
    id: 2,
    name: 'PUMP Bundle',
    token: 'PUMP',
    wallets: 15,
    status: 'pending',
    progress: 25,
  },
  {
    id: 3,
    name: 'ROCKET Launch',
    token: 'ROCKET',
    wallets: 8,
    status: 'completed',
    progress: 100,
  },
]

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-gray-600 mt-1">
            Welcome back! Here&apos;s what&apos;s happening with your bundles.
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" size="sm">
            <Activity className="w-4 h-4 mr-2" />
            View Activity
          </Button>
          <Button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800">
            <Plus className="w-4 h-4 mr-2" />
            New Bundle
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="p-6 hover:shadow-lg transition-shadow border-purple-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <div className="flex items-center mt-1">
                  {stat.changeType === 'positive' ? (
                    <ArrowUpRight className="w-4 h-4 text-green-500" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 text-red-500" />
                  )}
                  <span className={`text-sm ml-1 ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                </div>
              </div>
              <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg">
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.status === 'success' ? 'bg-green-400' : 
                  activity.status === 'warning' ? 'bg-yellow-400' : 'bg-red-400'
                }`} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                  <p className="text-sm text-gray-600">{activity.description}</p>
                  <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Active Bundles */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Active Bundles</h2>
            <Button variant="ghost" size="sm">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <div className="space-y-4">
            {activeBundles.map((bundle) => (
              <div key={bundle.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{bundle.name}</p>
                    <p className="text-xs text-gray-600">{bundle.wallets} wallets</p>
                  </div>
                  <Badge variant={
                    bundle.status === 'active' ? 'default' :
                    bundle.status === 'pending' ? 'secondary' : 'outline'
                  } className={
                    bundle.status === 'active' ? 'bg-green-100 text-green-800' : ''
                  }>
                    {bundle.status}
                  </Badge>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full transition-all"
                    style={{ width: `${bundle.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button variant="outline" className="h-20 flex-col space-y-2">
            <Wallet className="w-6 h-6" />
            <span>Generate Wallets</span>
          </Button>
          <Button variant="outline" className="h-20 flex-col space-y-2">
            <Coins className="w-6 h-6" />
            <span>Create Token</span>
          </Button>
          <Button variant="outline" className="h-20 flex-col space-y-2">
            <Package className="w-6 h-6" />
            <span>Start Bundle</span>
          </Button>
        </div>
      </Card>
    </div>
  )
}